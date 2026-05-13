import { Link } from 'react-router-dom'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { AlertTriangle, CheckCircle, ArrowUpRight, ChevronDown } from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'

const oeufsData = [
  { date: '13 Avr', oeufs: 720 }, { date: '15 Avr', oeufs: 740 }, { date: '17 Avr', oeufs: 760 },
  { date: '20 Avr', oeufs: 790 }, { date: '23 Avr', oeufs: 810 }, { date: '27 Avr', oeufs: 830 },
  { date: '30 Avr', oeufs: 820 }, { date: '04 Mai', oeufs: 840 }, { date: '07 Mai', oeufs: 855 },
  { date: '11 Mai', oeufs: 850 },
]

const repartition = [
  { name: 'Élevage', value: 60, color: '#2E7D32' },
  { name: 'Agriculture', value: 25, color: '#3B82F6' },
  { name: 'Ventes', value: 10, color: '#F59E0B' },
  { name: 'Autres', value: 5, color: '#EF4444' },
]

const mensuelData = [
  { mois: 'Jan', revenus: 980, depenses: 620 },
  { mois: 'Fév', revenus: 1050, depenses: 680 },
  { mois: 'Mar', revenus: 1100, depenses: 700 },
  { mois: 'Avr', revenus: 1150, depenses: 720 },
  { mois: 'Mai', revenus: 1250, depenses: 820 },
  { mois: 'Juin', revenus: 1350, depenses: 880 },
]

const activites = [
  { label: 'Vente de 2 plateaux d\'œufs', time: '13 Mai 2025 · 10:45', icon: '🛒', color: 'bg-green-100 text-green-700' },
  { label: 'Achat aliment poules (200 kg)', time: '12 Mai 2025 · 15:30', icon: '🛍️', color: 'bg-orange-100 text-orange-600' },
  { label: 'Vaccination préventive effectuée', time: '11 Mai 2025 · 09:15', icon: '💉', color: 'bg-blue-100 text-blue-600' },
  { label: 'Récolte maïs (5 hectares)', time: '10 Mai 2025 · 14:20', icon: '🌽', color: 'bg-green-100 text-green-700' },
  { label: 'Paiement facture fournisseur', time: '09 Mai 2025 · 11:00', icon: '💳', color: 'bg-gray-100 text-gray-600' },
]

const elevageStats = [
  { label: 'Poules totales', value: '1 300', icon: '🐔' },
  { label: 'Poules actives', value: '1 245', icon: '🐔', highlight: true },
  { label: 'Poussins', value: '120', icon: '🐣' },
  { label: 'Mortalité (ce mois)', value: '15', icon: '⚠️', alert: true },
  { label: 'Taux de ponte', value: '85%', icon: '🥚', highlight: true },
]

const agriStats = [
  { label: 'Hectares totaux', value: '40 ha', icon: '🗺️' },
  { label: 'En culture', value: '25 ha', icon: '🌱', highlight: true },
  { label: 'Récoltés', value: '10 ha', icon: '🌾' },
  { label: 'En préparation', value: '5 ha', icon: '🚜' },
]

const finStats = [
  { label: 'Revenus', value: '1 250 $', icon: '📈', color: 'text-green-700' },
  { label: 'Dépenses', value: '820 $', icon: '📉', color: 'text-red-600' },
  { label: 'Bénéfice net', value: '430 $', icon: '💰', color: 'text-green-700' },
  { label: 'Solde disponible', value: '2 350 $', icon: '🏦', color: 'text-blue-700' },
]

const alertes = [
  { label: 'Stock aliment faible', sub: 'Il reste seulement 2 sacs.', icon: <AlertTriangle size={16} />, color: 'text-red-600 bg-red-50 border-red-200' },
  { label: 'Vaccination prévue', sub: 'Date prévue : 15 Mai 2025', icon: <AlertTriangle size={16} />, color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { label: 'Paiement en attente', sub: 'Facture fournisseur à payer.', icon: <AlertTriangle size={16} />, color: 'text-gray-600 bg-gray-50 border-gray-200' },
]

const objectifs = [
  '1 000 poules actives', '30 hectares en culture',
  "Production de 1 000 œufs/jour", 'Augmenter les ventes de 20%',
]

const meteo = [
  { jour: 'Jeu 14', temp: '29°C', icon: '☀️' },
  { jour: 'Ven 15', temp: '28°C', icon: '⛅' },
  { jour: 'Sam 16', temp: '27°C', icon: '☁️' },
  { jour: 'Dim 17', temp: '26°C', icon: '🌧️' },
  { jour: 'Lun 18', temp: '28°C', icon: '⛅' },
]

function StatCard5({ label, value, sub, icon, bg, color, trend }: {
  label: string; value: string; sub?: string; icon: string; bg: string; color: string; trend?: string
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className={`${bg} w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3`}>{icon}</div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      {sub && <p className={`text-xs font-semibold mt-0.5 ${color}`}>{sub}</p>}
      {trend && <p className="text-xs text-green-600 font-medium mt-0.5">{trend}</p>}
    </div>
  )
}

function CircularProgress({ value }: { value: number }) {
  const size = 100
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
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{value}%</span>
      </div>
    </div>
  )
}

export default function HomeMembre() {
  const { profile } = useAuth()

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Tableau de bord</h2>
          <p className="text-sm text-gray-500">Vue d'ensemble de toutes les activités de KFK Agro Business</p>
        </div>
      </div>

      {/* 5 Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard5 label="Poules actives" value="1 245" sub="sur 1 300" trend="+8.2%" icon="🐔" bg="bg-green-50" color="text-gray-500" />
        <StatCard5 label="œufs / jour" value="850" trend="+5.6%" icon="🥚" bg="bg-orange-50" color="text-orange-600" />
        <StatCard5 label="Ventes (ce mois)" value="1 250 $" trend="+12.4%" icon="🛒" bg="bg-blue-50" color="text-blue-600" />
        <StatCard5 label="Hectares exploités" value="40 ha" trend="+3.3%" icon="🌿" bg="bg-green-50" color="text-green-600" />
        <StatCard5 label="Solde actuel" value="2 350 $" icon="💰" bg="bg-indigo-50" color="text-indigo-600" />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Line chart œufs */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Production des œufs</h3>
              <p className="text-xs text-gray-400">30 derniers jours</p>
            </div>
            <button className="flex items-center gap-1 border border-gray-200 text-xs text-gray-600 px-2.5 py-1 rounded-lg hover:bg-gray-50">
              30 jours <ChevronDown size={11} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={oeufsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="date" tick={{ fontSize: 9 }} tickLine={false} />
              <YAxis domain={[600, 1000]} tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => [`${v} œufs`]} />
              <Line type="monotone" dataKey="oeufs" name="Œufs" stroke="#2E7D32" strokeWidth={2.5} dot={{ r: 3, fill: '#2E7D32' }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition activités */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-4">Répartition des activités</h3>
          <div className="flex justify-center mb-3">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={repartition} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" strokeWidth={0}>
                  {repartition.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5">
            {repartition.map(e => (
              <li key={e.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                  {e.name}
                </span>
                <span className="font-semibold text-gray-700">{e.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Activités + Élevage + Agriculture */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Activités récentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Activités récentes</h3>
            <Link to="/dashboard/activites" className="text-xs text-green-700 hover:underline flex items-center gap-0.5">
              Voir tout <ArrowUpRight size={11} />
            </Link>
          </div>
          <ul className="space-y-3">
            {activites.map((a, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className={`w-7 h-7 rounded-lg ${a.color} flex items-center justify-center shrink-0 mt-0.5 text-sm`}>{a.icon}</div>
                <div>
                  <p className="text-xs font-medium text-gray-800">{a.label}</p>
                  <p className="text-xs text-gray-400">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Élevage */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Statut de l'élevage</h3>
            <Link to="/dashboard/elevage" className="text-xs text-green-700 hover:underline">Gérer →</Link>
          </div>
          <ul className="space-y-2.5">
            {elevageStats.map(s => (
              <li key={s.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${s.highlight ? 'bg-green-100' : s.alert ? 'bg-red-100' : 'bg-gray-100'}`}>{s.icon}</span>
                  {s.label}
                </span>
                <span className={`font-semibold ${s.highlight ? 'text-green-700' : s.alert ? 'text-red-600' : 'text-gray-800'}`}>{s.value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Link to="/dashboard/elevage" className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Taux de ponte</span>
              <span className="text-xs font-semibold text-green-700">85%</span>
            </Link>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
        </div>

        {/* Agriculture */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Statut de l'agriculture</h3>
            <Link to="/dashboard/agriculture" className="text-xs text-green-700 hover:underline">Gérer →</Link>
          </div>
          <ul className="space-y-2.5 mb-4">
            {agriStats.map(s => (
              <li key={s.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${s.highlight ? 'bg-green-100' : 'bg-gray-100'}`}>{s.icon}</span>
                  {s.label}
                </span>
                <span className={`font-semibold ${s.highlight ? 'text-green-700' : 'text-gray-800'}`}>{s.value}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-gray-800 text-sm mb-2 border-t border-gray-50 pt-3">Aperçu financier (ce mois)</h3>
          <ul className="space-y-2">
            {finStats.map(f => (
              <li key={f.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1.5"><span>{f.icon}</span>{f.label}</span>
                <span className={`font-bold ${f.color}`}>{f.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alertes + Évolution + Objectifs + Météo */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Alertes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">Alertes & Rappels</h3>
            <Link to="/dashboard/activites" className="text-xs text-green-700 hover:underline flex items-center gap-0.5">
              Voir tout <ArrowUpRight size={11} />
            </Link>
          </div>
          <ul className="space-y-2.5">
            {alertes.map((a, i) => (
              <li key={i} className={`flex items-start gap-2 p-2.5 rounded-lg border ${a.color}`}>
                <span className="shrink-0 mt-0.5">{a.icon}</span>
                <div>
                  <p className="text-xs font-semibold">{a.label}</p>
                  <p className="text-xs opacity-80">{a.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bar chart mensuel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 text-sm mb-4">Évolution mensuelle</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={mensuelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="mois" tick={{ fontSize: 9 }} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(v) => [`${v} $`]} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="revenus" name="Revenus" fill="#2E7D32" radius={[3, 3, 0, 0]} />
              <Bar dataKey="depenses" name="Dépenses" fill="#EF4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Objectifs + Météo */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Objectifs 2025</h3>
            <div className="flex items-center gap-4">
              <CircularProgress value={75} />
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Objectif annuel</p>
                <p className="text-green-700 text-xs font-bold mb-2">✓ Atteint</p>
                <ul className="space-y-1">
                  {objectifs.map((o, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle size={11} className="text-green-600 shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-3xl font-bold text-gray-800">28°C</p>
                <p className="text-xs text-gray-500">Ensoleillé · Kinshasa</p>
              </div>
              <span className="text-3xl">☀️</span>
            </div>
            <div className="flex justify-between mt-2">
              {meteo.map((m, i) => (
                <div key={i} className="text-center">
                  <p className="text-xs text-gray-500">{m.jour}</p>
                  <span className="text-base">{m.icon}</span>
                  <p className="text-xs font-medium text-gray-700">{m.temp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
