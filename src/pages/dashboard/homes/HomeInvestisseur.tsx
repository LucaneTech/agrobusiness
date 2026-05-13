import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { TrendingUp, DollarSign, BarChart2, Users, ArrowUpRight, Download, Mail } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../contexts/AuthContext'

const performanceData = [
  { mois: 'Juin', revenus: 250, depenses: 180 },
  { mois: 'Juil', revenus: 320, depenses: 210 },
  { mois: 'Août', revenus: 380, depenses: 240 },
  { mois: 'Sept', revenus: 420, depenses: 260 },
  { mois: 'Oct', revenus: 480, depenses: 290 },
  { mois: 'Nov', revenus: 530, depenses: 310 },
  { mois: 'Déc', revenus: 590, depenses: 330 },
  { mois: 'Jan', revenus: 650, depenses: 360 },
  { mois: 'Fév', revenus: 720, depenses: 390 },
  { mois: 'Mar', revenus: 850, depenses: 430 },
  { mois: 'Avr', revenus: 980, depenses: 470 },
  { mois: 'Mai', revenus: 1250, depenses: 520 },
]

const repartitionData = [
  { name: 'Élevage', value: 45, color: '#2E7D32' },
  { name: 'Agriculture', value: 35, color: '#F59E0B' },
  { name: 'Transformation', value: 10, color: '#3B82F6' },
  { name: 'Autres', value: 10, color: '#9CA3AF' },
]

const evolutionData = [
  { mois: 'Jan 24', valeur: 650 },
  { mois: 'Mar 24', valeur: 720 },
  { mois: 'Mai 24', valeur: 800 },
  { mois: 'Jul 24', valeur: 880 },
  { mois: 'Sep 24', valeur: 950 },
  { mois: 'Nov 24', valeur: 1020 },
  { mois: 'Jan 25', valeur: 1100 },
  { mois: 'Mar 25', valeur: 1180 },
  { mois: 'Mai 25', valeur: 1250 },
]

const fondsData = [
  { name: 'Élevage', value: 45, color: '#2E7D32' },
  { name: 'Agriculture', value: 35, color: '#F59E0B' },
  { name: 'Infrastructure', value: 10, color: '#3B82F6' },
  { name: 'Autres', value: 10, color: '#9CA3AF' },
]

const activites = [
  { label: 'Récolte de maïs effectuée', date: '10 Mai 2025', color: 'bg-green-100 text-green-700' },
  { label: 'Vaccination préventive', date: '08 Mai 2025', color: 'bg-orange-100 text-orange-600' },
  { label: 'Livraison d\'aliments', date: '05 Mai 2025', color: 'bg-blue-100 text-blue-600' },
  { label: 'Nouveau lot de poules pondeuses', date: '02 Mai 2025', color: 'bg-green-100 text-green-700' },
]

const rapports = [
  { nom: "Rapport d'activités - Avril 2025", taille: 'PDF · 1.2 Mo' },
  { nom: 'Rapport financier - Avril 2025', taille: 'PDF · 970 Ko' },
  { nom: "Rapport d'impact social - Avril 2025", taille: 'PDF · 1.5 Mo' },
]

const indicateurs = [
  { label: 'Poules actives', valeur: '1 245', icon: '🐔' },
  { label: "Production d'œufs (mois)", valeur: '850', icon: '🥚' },
  { label: 'Hectares exploités', valeur: '40 ha', icon: '🌿' },
  { label: 'Emplois créés', valeur: '35', icon: '👥' },
  { label: 'Communautés impactées', valeur: '5', icon: '🏘️' },
]

const impactStats = [
  { label: 'Emplois créés', valeur: '35', icon: '👥' },
  { label: 'Jeunes formés', valeur: '120', icon: '🎓' },
  { label: 'Femmes impliquées', valeur: '45%', icon: '👩' },
  { label: 'Communautés', valeur: '5', icon: '🏘️' },
]

const galerie = [
  'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=120&h=80&fit=crop',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=120&h=80&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=80&fit=crop',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=120&h=80&fit=crop',
]

function StatCard({ label, value, sub, icon: Icon, iconBg, iconColor, trend }: {
  label: string; value: string; sub?: string; icon: React.ElementType
  iconBg: string; iconColor: string; trend?: string
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className={`${iconBg} p-2.5 rounded-xl`}>
          <Icon size={22} className={iconColor} />
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {sub && <p className="text-xs text-green-600 font-medium mt-0.5">{sub}</p>}
        {trend && <p className="text-xs text-gray-400 mt-0.5">{trend}</p>}
      </div>
    </div>
  )
}

export default function HomeInvestisseur() {
  const { user, profile } = useAuth()
  const [msgCount, setMsgCount] = useState(0)
  const [docList, setDocList] = useState<{ nom: string; taille: string | null }[]>([])

  useEffect(() => {
    if (!user) return
    supabase.from('messages').select('id', { count: 'exact' }).eq('recipient_id', user.id).eq('lu', false)
      .then(({ count }) => setMsgCount(count ?? 0))
    supabase.from('documents').select('nom, taille').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3)
      .then(({ data }) => setDocList(data ?? []))
  }, [user])

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <p className="text-xl font-bold text-gray-800">Bienvenue,</p>
          <p className="text-green-700 font-semibold text-base">{profile?.full_name ?? 'Investisseur'} — Espace Investisseur</p>
          <p className="text-gray-500 text-sm mt-0.5">Suivez la performance et la croissance de KFK Agro Business.</p>
        </div>
        {msgCount > 0 && (
          <Link to="/dashboard/messages" className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors shrink-0">
            <Mail size={14} />
            {msgCount} message{msgCount > 1 ? 's' : ''} non lu{msgCount > 1 ? 's' : ''}
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Valeur actuelle du projet" value="1,250,000 $" sub="+32% vs mois dernier" icon={BarChart2} iconBg="bg-green-50" iconColor="text-green-700" />
        <StatCard label="Performance globale" value="+32%" sub="Croissance annuelle" icon={TrendingUp} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard label="Retour sur investissement" value="+32%" trend="Depuis votre investissement" icon={DollarSign} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard label="Bénéficiaires impactés" value="1 250" trend="Personnes" icon={Users} iconBg="bg-green-50" iconColor="text-green-600" />
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Line chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">Performance financière</h3>
              <p className="text-xs text-gray-400">12 derniers mois (en milliers USD)</p>
            </div>
            <Link to="/dashboard/performance" className="text-xs text-green-700 font-medium hover:underline flex items-center gap-1">
              Voir le rapport complet <ArrowUpRight size={12} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="mois" tick={{ fontSize: 10 }} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => [`${v}K $`]} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="revenus" name="Revenus (USD)" stroke="#2E7D32" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="depenses" name="Dépenses (USD)" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut + Indicators */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">Répartition des activités</h3>
              <Link to="/dashboard/activites" className="text-xs text-green-700 hover:underline">Voir les détails →</Link>
            </div>
            <div className="flex items-center gap-3">
              <ResponsiveContainer width={100} height={100}>
                <PieChart>
                  <Pie data={repartitionData} cx="50%" cy="50%" innerRadius={28} outerRadius={44} dataKey="value" strokeWidth={0}>
                    {repartitionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <ul className="space-y-1">
                {repartitionData.map(e => (
                  <li key={e.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: e.color }} />
                    {e.name} <span className="font-medium ml-auto pl-2">{e.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">Indicateurs clés</h3>
              <Link to="/dashboard/activites" className="text-xs text-green-700 hover:underline">Voir tous →</Link>
            </div>
            <ul className="space-y-2">
              {indicateurs.map(i => (
                <li key={i.label} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 flex items-center gap-1.5"><span>{i.icon}</span>{i.label}</span>
                  <span className="font-semibold text-gray-800">{i.valeur}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Impact social + Evolution + Fonds */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Impact social */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Impact social</h3>
            <Link to="/dashboard/impact" className="text-xs text-green-700 hover:underline">Voir le rapport →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {impactStats.map(i => (
              <div key={i.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{i.icon}</div>
                <p className="text-xl font-bold text-gray-800">{i.valeur}</p>
                <p className="text-xs text-gray-500 leading-tight">{i.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart évolution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-sm">Évolution de la valeur</h3>
            <Link to="/dashboard/performance" className="text-xs text-green-700 hover:underline">Voir →</Link>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="mois" tick={{ fontSize: 9 }} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(v) => [`${v}K $`]} />
              <Bar dataKey="valeur" fill="#2E7D32" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut utilisation fonds */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-sm">Utilisation des fonds</h3>
            <Link to="/dashboard/investissement" className="text-xs text-green-700 hover:underline">Voir →</Link>
          </div>
          <div className="flex items-center gap-3">
            <ResponsiveContainer width={110} height={110}>
              <PieChart>
                <Pie data={fondsData} cx="50%" cy="50%" innerRadius={30} outerRadius={48} dataKey="value" strokeWidth={0}>
                  {fondsData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul className="space-y-1.5">
              {fondsData.map(e => (
                <li key={e.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: e.color }} />
                  {e.name} <span className="font-medium ml-auto pl-2">{e.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Activités + Rapports + Galerie */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Activités récentes</h3>
            <Link to="/dashboard/activites" className="text-xs text-green-700 hover:underline">Voir toutes →</Link>
          </div>
          <ul className="space-y-3">
            {activites.map((a, i) => (
              <li key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${a.color.split(' ')[0]}`} />
                  <span className="text-sm text-gray-700">{a.label}</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{a.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Documents & Rapports récents</h3>
            <Link to="/dashboard/rapports" className="text-xs text-green-700 hover:underline">Voir tous →</Link>
          </div>
          <ul className="space-y-3">
            {(docList.length > 0 ? docList.map(d => ({ nom: d.nom, taille: d.taille ?? 'Fichier' })) : rapports).map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📄</span>
                  <div>
                    <p className="text-xs font-medium text-gray-700 truncate max-w-[160px]">{r.nom}</p>
                    <p className="text-xs text-gray-400">{r.taille}</p>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-green-700 transition-colors"><Download size={14} /></button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Galerie récente</h3>
            <Link to="/dashboard/galerie" className="text-xs text-green-700 hover:underline">Voir toute →</Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {galerie.map((src, i) => (
              <div key={i} className="rounded-lg overflow-hidden h-16 bg-gray-100">
                <img src={src} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = '' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-green-900 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl">🤝</span>
          <div>
            <p className="text-white font-bold">Merci pour votre confiance !</p>
            <p className="text-green-300 text-sm">Votre investissement contribue au développement durable des communautés et à la sécurité alimentaire en RDC.</p>
          </div>
        </div>
        <Link to="/dashboard/messages" className="shrink-0 flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors">
          <Mail size={15} />
          Contacter l'équipe KFK
        </Link>
      </div>
    </div>
  )
}
