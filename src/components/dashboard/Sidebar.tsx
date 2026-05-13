import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Info, TrendingUp, Activity, Users, FileText,
  Image, DollarSign, Mail, User, Settings, LogOut, Sprout,
  ShoppingCart, Truck, Receipt, FolderOpen, X, HandshakeIcon,
  Egg, Leaf, BarChart2,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

type Role = 'Investisseur' | 'Partenaire' | 'Membre' | 'Fournisseur'

const navConfig: Record<Role, { to: string; label: string; icon: React.ElementType; end?: boolean }[]> = {
  Investisseur: [
    { to: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
    { to: '/dashboard/presentation', label: 'Présentation du projet', icon: Info },
    { to: '/dashboard/performance', label: 'Performance financière', icon: TrendingUp },
    { to: '/dashboard/activites', label: 'Production & Activités', icon: Activity },
    { to: '/dashboard/impact', label: 'Impact social', icon: Users },
    { to: '/dashboard/rapports', label: 'Rapports & Documents', icon: FileText },
    { to: '/dashboard/galerie', label: 'Galerie & Médias', icon: Image },
    { to: '/dashboard/investissement', label: 'Investissement', icon: DollarSign },
    { to: '/dashboard/messages', label: 'Messages', icon: Mail },
    { to: '/dashboard/profil', label: 'Mon profil', icon: User },
    { to: '/dashboard/parametres', label: 'Paramètres', icon: Settings },
  ],
  Partenaire: [
    { to: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
    { to: '/dashboard/presentation', label: 'Présentation du projet', icon: Info },
    { to: '/dashboard/avancement', label: 'Avancement du projet', icon: TrendingUp },
    { to: '/dashboard/rapports', label: 'Rapports & Documents', icon: FileText },
    { to: '/dashboard/impact', label: 'Impact social', icon: Users },
    { to: '/dashboard/galerie', label: 'Galerie & Médias', icon: Image },
    { to: '/dashboard/messages', label: 'Messages', icon: Mail },
  ],
  Membre: [
    { to: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
    { to: '/dashboard/elevage', label: 'Élevage', icon: Egg },
    { to: '/dashboard/agriculture', label: 'Agriculture', icon: Leaf },
    { to: '/dashboard/finances', label: 'Finances', icon: BarChart2 },
    { to: '/dashboard/fournisseurs-liste', label: 'Fournisseurs', icon: ShoppingCart },
    { to: '/dashboard/partenaires', label: 'Partenaires & Financements', icon: HandshakeIcon },
    { to: '/dashboard/documents', label: 'Documents Entreprise', icon: FolderOpen },
    { to: '/dashboard/equipe', label: 'Équipe', icon: Users },
    { to: '/dashboard/galerie', label: 'Galerie & Médias', icon: Image },
    { to: '/dashboard/parametres', label: 'Paramètres', icon: Settings },
  ],
  Fournisseur: [
    { to: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
    { to: '/dashboard/commandes', label: 'Commandes', icon: ShoppingCart },
    { to: '/dashboard/livraisons', label: 'Livraisons', icon: Truck },
    { to: '/dashboard/factures', label: 'Factures', icon: Receipt },
    { to: '/dashboard/documents', label: 'Documents', icon: FolderOpen },
    { to: '/dashboard/messages', label: 'Messages', icon: Mail },
    { to: '/dashboard/profil', label: 'Mon profil', icon: User },
  ],
}

const roleLabel: Record<Role, { top: string; sub?: string; badge: string; subColor?: string }> = {
  Investisseur: { top: 'ESPACE INVESTISSEUR', badge: 'text-green-400 text-xs font-bold tracking-wider' },
  Partenaire: { top: 'ESPACE PARTENAIRE', badge: 'border border-white/40 text-white text-xs font-bold tracking-wider px-2 py-0.5 rounded-sm' },
  Membre: { top: 'ESPACE MEMBRE', sub: 'CO-GÉRANTS', badge: 'text-white text-xs font-bold tracking-wider', subColor: 'text-amber-400 text-xs font-bold tracking-wider' },
  Fournisseur: { top: 'ESPACE FOURNISSEUR', badge: 'text-blue-300 text-xs font-bold tracking-wider' },
}

interface SidebarProps { open: boolean; onClose: () => void }

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { signOut, profile } = useAuth()
  const navigate = useNavigate()
  const role = (profile?.role ?? 'Partenaire') as Role
  const nav = navConfig[role] ?? navConfig.Partenaire
  const label = roleLabel[role] ?? roleLabel.Partenaire

  const handleSignOut = async () => {
    await signOut()
    navigate('/auth/login')
  }

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-green-900 flex flex-col z-30 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>

        {/* Logo + Role badge */}
        <div className="px-5 pt-5 pb-4 border-b border-green-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="KFK" className="h-9 w-9 object-contain rounded-full bg-white p-0.5" />
              <div>
                <p className="text-white font-bold text-sm leading-tight">KFK</p>
                <p className="text-green-400 text-xs leading-tight">Agro Business</p>
              </div>
            </div>
            <button onClick={onClose} className="text-green-400 hover:text-white lg:hidden"><X size={18} /></button>
          </div>
          <div>
            <span className={label.badge}>{label.top}</span>
            {label.sub && <p className={label.subColor}>{label.sub}</p>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-3 overflow-y-auto">
          <ul className="space-y-0.5">
            {nav.map(({ to, label: lbl, icon: Icon, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-800 hover:text-white'}`
                  }
                >
                  <Icon size={17} />
                  <span className="truncate">{lbl}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer sidebar */}
        <div className="px-4 py-3 border-t border-green-800 space-y-2">
          <div className="flex items-start gap-2.5 bg-green-800/60 rounded-lg p-3">
            <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-0.5">
              <Users size={13} className="text-white" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold leading-tight">Besoin d'informations ?</p>
              <p className="text-green-300 text-xs leading-tight">Notre équipe est à votre disposition.</p>
            </div>
          </div>
          <button onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors">
            <LogOut size={17} />
            {role === 'Fournisseur' || role === 'Membre' ? 'Déconnexion' : 'Se déconnecter'}
          </button>
        </div>
      </aside>
    </>
  )
}
