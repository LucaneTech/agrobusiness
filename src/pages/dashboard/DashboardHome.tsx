import { useAuth } from '../../contexts/AuthContext'
import HomeInvestisseur from './homes/HomeInvestisseur'
import HomePartenaire from './homes/HomePartenaire'
import HomeMembre from './homes/HomeMembre'
import HomeFournisseur from './homes/HomeFournisseur'

export default function DashboardHome() {
  const { profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  switch (profile?.role) {
    case 'Investisseur': return <HomeInvestisseur />
    case 'Membre':       return <HomeMembre />
    case 'Fournisseur':  return <HomeFournisseur />
    default:             return <HomePartenaire />
  }
}
