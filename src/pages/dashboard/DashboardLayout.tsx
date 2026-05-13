import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu, Bell, ChevronDown, Calendar } from 'lucide-react'
import Sidebar from '../../components/dashboard/Sidebar'
import { useAuth } from '../../contexts/AuthContext'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Tableau de bord',
  '/dashboard/profil': 'Mon profil',
  '/dashboard/messages': 'Messages',
  '/dashboard/documents': 'Documents',
  '/dashboard/parametres': 'Paramètres',
  '/dashboard/presentation': 'Présentation du projet',
  '/dashboard/performance': 'Performance financière',
  '/dashboard/activites': 'Production & Activités',
  '/dashboard/impact': 'Impact social',
  '/dashboard/rapports': 'Rapports & Documents',
  '/dashboard/galerie': 'Galerie & Médias',
  '/dashboard/investissement': 'Investissement',
  '/dashboard/avancement': 'Avancement du projet',
  '/dashboard/elevage': 'Élevage',
  '/dashboard/agriculture': 'Agriculture',
  '/dashboard/finances': 'Finances',
  '/dashboard/fournisseurs-liste': 'Fournisseurs',
  '/dashboard/partenaires': 'Partenaires & Financements',
  '/dashboard/equipe': 'Équipe',
  '/dashboard/commandes': 'Commandes',
  '/dashboard/livraisons': 'Livraisons',
  '/dashboard/factures': 'Factures',
}

function formatDate() {
  return new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    .replace(/^\w/, c => c.toUpperCase())
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { profile } = useAuth()
  const { pathname } = useLocation()

  const pageTitle = pageTitles[pathname] ?? 'Tableau de bord'
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'MB'

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700 lg:hidden">
              <Menu size={22} />
            </button>
            <h1 className="text-base font-bold text-gray-800 hidden sm:block">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Date */}
            <div className="hidden md:flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 cursor-pointer hover:bg-gray-50">
              <Calendar size={13} className="text-gray-400" />
              {formatDate()}
              <ChevronDown size={12} className="text-gray-400 ml-0.5" />
            </div>

            {/* Bell */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>

            {/* User */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center overflow-hidden shrink-0">
                {profile?.avatar_url
                  ? <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-white text-xs font-bold">{initials}</span>
                }
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-800 leading-tight">{profile?.full_name ?? 'Membre'}</p>
                <p className="text-xs text-green-700 leading-tight">{profile?.role ?? 'Partenaire'}</p>
              </div>
              <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
