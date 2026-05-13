import { useEffect, useState, FormEvent } from 'react'
import { Plus, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { Demande } from '../../types/database'

const TYPES = ['Partenariat technique', 'Fourniture d\'intrants', 'Financement', 'Formation', 'Autre']

const statutColor: Record<string, string> = {
  'En cours': 'bg-green-100 text-green-700',
  'En attente': 'bg-orange-100 text-orange-600',
  'Approuvé': 'bg-blue-100 text-blue-700',
  'Rejeté': 'bg-red-100 text-red-600',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Demandes() {
  const { user } = useAuth()
  const [demandes, setDemandes] = useState<Demande[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [titre, setTitre] = useState('')
  const [type, setType] = useState(TYPES[0])
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    if (!user) return
    const { data } = await supabase
      .from('demandes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setDemandes((data ?? []) as Demande[])
    setLoading(false)
  }

  useEffect(() => { load() }, [user])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return
    setError('')
    setSubmitting(true)
    const { error } = await supabase.from('demandes').insert({
      user_id: user.id,
      titre,
      type,
      description,
      statut: 'En attente',
    })
    if (error) {
      setError(error.message)
    } else {
      setShowModal(false)
      setTitre('')
      setDescription('')
      setType(TYPES[0])
      load()
    }
    setSubmitting(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Mes demandes</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Nouvelle demande
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : demandes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
          <p className="text-gray-400 text-sm">Aucune demande pour l'instant.</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-3 text-green-700 text-sm font-medium hover:underline"
          >
            Créer votre première demande
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Titre</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Statut</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {demandes.map(d => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-800 font-medium">{d.titre}</td>
                  <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{d.type ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statutColor[d.statut] ?? 'bg-gray-100 text-gray-600'}`}>
                      {d.statut}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 hidden md:table-cell">{formatDate(d.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal nouvelle demande */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Nouvelle demande</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la demande</label>
                <input
                  type="text"
                  required
                  value={titre}
                  onChange={e => setTitre(e.target.value)}
                  placeholder="Ex: Demande de partenariat technique"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white"
                >
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Décrivez votre demande..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-green-700 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                >
                  {submitting ? 'Envoi...' : 'Soumettre'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
