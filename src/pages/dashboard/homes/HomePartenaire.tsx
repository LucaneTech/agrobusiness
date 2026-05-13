import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Mail, MapPin, ArrowRight } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../contexts/AuthContext'

function CircularProgress({ value, size = 140 }: { value: number; size?: number }) {
  const stroke = 10
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E5E7EB" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#2E7D32" strokeWidth={stroke} fill="none"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{value}%</span>
      </div>
    </div>
  )
}

const rapports = [
  { nom: "Rapport d'activités - Avril 2025", taille: 'PDF · 1.2 Mo' },
  { nom: "Rapport d'impact social - Avril 2025", taille: 'PDF · 1.5 Mo' },
  { nom: 'États financiers - Avril 2025', taille: 'PDF · 970 Ko' },
]

const actualites = [
  { label: 'Récolte de maïs effectuée', date: '10 Mai 2025' },
  { label: 'Vaccination préventive', date: '08 Mai 2025' },
  { label: 'Livraison d\'aliments', date: '05 Mai 2025' },
]

const impactItems = [
  { label: 'Emplois créés', valeur: '35', icon: '👥' },
  { label: 'Jeunes formés', valeur: '120', icon: '🎓' },
  { label: 'Femmes impliquées', valeur: '45%', icon: '👩' },
  { label: 'Communautés impactées', valeur: '5', icon: '🏘️' },
]

export default function HomePartenaire() {
  const { user, profile } = useAuth()
  const [docList, setDocList] = useState<{ nom: string; taille: string | null }[]>([])

  useEffect(() => {
    if (!user) return
    supabase.from('documents').select('nom, taille').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3)
      .then(({ data }) => setDocList(data ?? []))
  }, [user])

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div>
        <p className="text-xl font-bold text-gray-800">Bienvenue,</p>
        <p className="text-base text-gray-600 font-medium">{profile?.full_name ?? 'Partenaire'}</p>
        <p className="text-gray-500 text-sm">Merci pour votre soutien à KFK Agro Business.</p>
      </div>

      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Tableau de bord partenaire</h2>
          <p className="text-sm text-gray-500">Vue d'ensemble du projet KFK Agro Business</p>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Poules actives', value: '1 245', unit: 'Élevage', icon: '🐔', bg: 'bg-green-50' },
          { label: 'Surfaces exploitées', value: '40 ha', unit: 'Agriculture', icon: '🌿', bg: 'bg-green-50' },
          { label: "œufs / jour", value: '850', unit: "Production d'œufs", icon: '🥚', bg: 'bg-orange-50' },
          { label: 'Personnes impactées', value: '1 250', unit: 'Bénéficiaires', icon: '👥', bg: 'bg-blue-50' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`${k.bg} w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3`}>{k.icon}</div>
            <p className="text-2xl font-bold text-gray-800">{k.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
            <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.unit}</p>
          </div>
        ))}
      </div>

      {/* About + Progress + Impact */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* À propos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-3">À propos du projet</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            KFK Agro Business est une entreprise agro-pastorale basée à Kinshasa, spécialisée dans l'élevage de poules pondeuses et la culture du maïs.
          </p>
          <div className="rounded-lg overflow-hidden h-32 bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=200&fit=crop"
              alt="Élevage KFK"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Avancement global */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Avancement global du projet</h3>
            <Link to="/dashboard/avancement" className="text-xs text-green-700 hover:underline flex items-center gap-1">
              Voir les détails <ArrowRight size={11} />
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <CircularProgress value={75} size={120} />
            <p className="text-sm text-gray-600 leading-relaxed">
              Le projet est en bonne progression conformément au plan 2025, avec atteinte de nos objectifs 2025.
            </p>
          </div>
        </div>

        {/* Impact social */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Impact social</h3>
            <Link to="/dashboard/impact" className="text-xs text-green-700 hover:underline flex items-center gap-1">
              Voir tous les impacts <ArrowRight size={11} />
            </Link>
          </div>
          <ul className="space-y-3">
            {impactItems.map(i => (
              <li key={i.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-base">{i.icon}</span>
                  {i.label}
                </div>
                <span className="font-bold text-gray-800">{i.valeur}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Localisation + Actualités + Documents */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Localisation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Localisation du projet</h3>
          <p className="text-gray-700 text-sm font-medium mb-3">Kinshasa, République Démocratique du Congo</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={15} className="text-green-700" />
              Kinshasa
            </div>
          </div>
          <div className="mt-4 bg-gray-100 rounded-lg h-24 flex items-center justify-center">
            <span className="text-gray-400 text-xs">📍 Kinshasa, RDC</span>
          </div>
        </div>

        {/* Actualités */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Actualités du projet</h3>
            <Link to="/dashboard/activites" className="text-xs text-green-700 hover:underline flex items-center gap-1">
              Voir toutes les actualités <ArrowRight size={11} />
            </Link>
          </div>
          <ul className="space-y-4">
            {actualites.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-700 text-xs font-bold">📅</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{a.label}</p>
                  <p className="text-xs text-gray-400">{a.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Documents et rapports</h3>
            <Link to="/dashboard/rapports" className="text-xs text-green-700 hover:underline flex items-center gap-1">
              Voir tous les documents <ArrowRight size={11} />
            </Link>
          </div>
          <ul className="space-y-3">
            {(docList.length > 0
              ? docList.map(d => ({ nom: d.nom, taille: d.taille ?? 'Fichier' }))
              : rapports
            ).map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📄</span>
                  <div>
                    <p className="text-xs font-medium text-gray-700 truncate max-w-[150px]">{r.nom}</p>
                    <p className="text-xs text-gray-400">{r.taille}</p>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-green-700"><Download size={14} /></button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤝</span>
          <div>
            <p className="font-bold text-gray-800">Merci pour votre partenariat !</p>
            <p className="text-gray-500 text-sm">Votre soutien contribue au développement durable des communautés et à la sécurité alimentaire en RDC.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <Link to="/dashboard/messages" className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors">
            <Mail size={14} />
            Envoyer un message
          </Link>
          <Link to="/contact" className="flex items-center gap-2 border border-green-700 text-green-700 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-green-50 transition-colors">
            Contacter KFK
          </Link>
        </div>
      </div>
    </div>
  )
}
