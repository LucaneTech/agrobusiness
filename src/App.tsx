import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Project from './pages/Project'
import SocialImpact from './pages/SocialImpact'
import Activities from './pages/Activities'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Partners from './pages/Partners'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projet" element={<Project />} />
            <Route path="/impact-social" element={<SocialImpact />} />
            <Route path="/nos-activites" element={<Activities />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/partenaires" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  )
}

export default App
