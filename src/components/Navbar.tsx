import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa'

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Le Projet', path: '/projet' },
  { label: 'Impact Social', path: '/impact-social' },
  { label: 'Nos Activités', path: '/nos-activites' },
  { label: 'Galerie', path: '/galerie' },
  { label: 'Partenaires', path: '/partenaires' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg ' : 'bg-white/95 backdrop-blur-sm '
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
           <img src="logo.png" alt="logo KFK agrobusiness" className='w-24 sm:w-28 md:w-48 h-auto object-contain'  />
           
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-600 transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-green-800 text-white'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/243970000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white text-sm font-700 px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <FaPhoneAlt size={15} />
              Nous Contacter
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-green-800 hover:bg-green-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg font-600 transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'bg-green-800 text-white'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/243970000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-800 text-white px-4 py-3 rounded-lg font-700 mt-2"
              >
                <FaPhoneAlt size={16} />
                Nous Contacter
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
