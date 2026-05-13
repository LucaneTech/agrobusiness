import { useEffect, useState } from 'react'
import { Sprout, Plus, Check } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { Projet, ProjetSuivi } from '../../types/database'

export default function Projets() {
  const { user } = useAuth()
  const [allProjets, setAllProjets] = useState<Projet[]>([])
  const [suivis, setSuivis] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)

  const load = async () => {
    if (!user) return
    const [{ data: projets }, { data: suiviData }] = await Promise.all([
      supabase.from('projets').select('*').order('created_at', { ascending: false }),
      supabase.from('projet_suivis').select('projet_id').eq('user_id', user.id),
    ])
    setAllProjets((projets ?? []) as Projet[])
    setSuivis(new Set((suiviData ?? []).map((s: Pick<ProjetSuivi, 'projet_id'>) => s.projet_id)))
    setLoading(false)
  }

  useEffect(() => { load() }, [user])

  const toggleSuivi = async (projetId: string) => {
    if (!user) return
    setToggling(projetId)
    if (suivis.has(projetId)) {
      await supabase.from('projet_suivis').delete().eq('user_id', user.id).eq('projet_id', projetId)
      setSuivis(prev => { const s = new Set(prev); s.delete(projetId); return s })
    } else {
      await supabase.from('projet_suivis').insert({ user_id: user.id, projet_id: projetId })
      setSuivis(prev => new Set([...prev, projetId]))
    }
    setToggling(null)
  }

  const progressColor = (p: number) =>
    p >= 70 ? 'bg-green-600' : p >= 40 ? 'bg-amber-400' : 'bg-red-400'

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Suivi des projets</h2>
        <span className="text-sm text-gray-500">{suivis.size} projet{suivis.size !== 1 ? 's' : ''} suivi{suivis.size !== 1 ? 's' : ''}</span>
      </div>

      {allProjets.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
          <Sprout size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Aucun projet disponible pour l'instant.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProjets.map(p => {
            const isSuivi = suivis.has(p.id)
            return (
              <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-36 bg-gray-100 overflow-hidden">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.titre} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-green-100">
                      <Sprout size={36} className="text-green-400" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{p.titre}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${p.statut === 'En cours' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {p.statut}
                    </span>
                  </div>

                  {p.description && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.description}</p>
                  )}

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Progression</span>
                      <span className="text-xs font-semibold text-gray-700">{p.progression}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${progressColor(p.progression)}`} style={{ width: `${p.progression}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSuivi(p.id)}
                    disabled={toggling === p.id}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isSuivi
                        ? 'bg-green-100 text-green-800 hover:bg-red-50 hover:text-red-600'
                        : 'bg-green-700 text-white hover:bg-green-600'
                    } disabled:opacity-60`}
                  >
                    {toggling === p.id ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : isSuivi ? (
                      <><Check size={14} /> Suivi</>
                    ) : (
                      <><Plus size={14} /> Suivre ce projet</>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
