import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
// import ProtectedRoute from './components/dashboard/ProtectedRoute'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Project from './pages/Project'
import SocialImpact from './pages/SocialImpact'
import SocialImpactDetail from './pages/SocialImpactDetail'
import Activities from './pages/Activities'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Partners from './pages/Partners'
import NotFound from './pages/NotFound'

// import Login from './pages/auth/Login'
// import Register from './pages/auth/Register'

// import DashboardLayout from './pages/dashboard/DashboardLayout'
// import DashboardHome from './pages/dashboard/DashboardHome'
// import Profile from './pages/dashboard/Profile'
// import Demandes from './pages/dashboard/Demandes'
// import Messages from './pages/dashboard/Messages'
// import Documents from './pages/dashboard/Documents'
// import Projets from './pages/dashboard/Projets'
// import Parametres from './pages/dashboard/Parametres'
// import ComingSoon from './pages/dashboard/ComingSoon'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Hash in URL = section scroll takes over → instant reset only
    // No hash = smooth scroll to top
    if (window.location.hash) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projet" element={<Project />} />
          <Route path="/impact-social" element={<SocialImpact />} />
          <Route path="/impact-social/detail" element={<SocialImpactDetail />} />
          <Route path="/nos-activites" element={<Activities />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/partenaires" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth */}
          {/* <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} /> */}

          {/* Dashboard — protégé */}
          {/* <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} /> */}
            {/* Communs */}
            {/* <Route path="profil" element={<Profile />} />
            <Route path="messages" element={<Messages />} />
            <Route path="documents" element={<Documents />} />
            <Route path="parametres" element={<Parametres />} />
            <Route path="demandes" element={<Demandes />} />
            <Route path="projets" element={<Projets />} /> */}

            {/* Investisseur */}
            {/* <Route path="presentation" element={<ComingSoon />} />
            <Route path="performance" element={<ComingSoon />} />
            <Route path="investissement" element={<ComingSoon />} /> */}

            {/* Partenaire + commun */}
            {/* <Route path="avancement" element={<ComingSoon />} />
            <Route path="rapports" element={<Documents />} />
            <Route path="impact" element={<ComingSoon />} />
            <Route path="galerie" element={<ComingSoon />} /> */}

            {/* Membre */}
            {/* <Route path="elevage" element={<ComingSoon />} />
            <Route path="agriculture" element={<ComingSoon />} />
            <Route path="finances" element={<ComingSoon />} />
            <Route path="fournisseurs-liste" element={<ComingSoon />} />
            <Route path="partenaires" element={<ComingSoon />} />
            <Route path="equipe" element={<ComingSoon />} />
            <Route path="activites" element={<ComingSoon />} /> */}
            {/* Fournisseur */}
            {/* <Route path="commandes" element={<ComingSoon />} />
            <Route path="livraisons" element={<ComingSoon />} />
            <Route path="factures" element={<ComingSoon />} /> */}
          {/* </Route> */}

          {/* Site public */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
