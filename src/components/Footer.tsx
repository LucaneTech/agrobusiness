import { Link } from 'react-router-dom'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="white_logo.png" alt="logo KFK agrobusiness" className='w-36 sm:w-40 md:w-44 lg:w-56 h-auto object-contain' />

            </Link>
            <p className="text-green-200 text-sm leading-relaxed mb-5">
              Ensemble, cultivons l'avenir. Projet agricole intégré en République Démocratique du Congo.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-green-700 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                <FaFacebook size={16} />
              </a>
              <a href="https://wa.me/212621532793" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-green-700 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                <FaWhatsapp size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-green-700 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Links rapides */}
          <div>
            <h3 className="font-700 text-white mb-5 text-base">Liens rapides</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Le Projet', path: '/projet' },
                { label: 'Nos Activités', path: '/nos-activites' },
                { label: 'Impact Social', path: '/impact-social' },
                { label: 'Partenaires', path: '/partenaires' },
                { label: 'Contact', path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-green-200 hover:text-orange-400 text-sm transition-colors duration-200 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-orange-400 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activités */}
          <div>
            <h3 className="font-700 text-white mb-5 text-base">Nos Activités</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Production de maïs',   path: '/nos-activites#agriculture' },
                { label: 'Élevage de poules',     path: '/nos-activites#elevage' },
                { label: 'Stockage agricole',     path: '/nos-activites#stockage' },
                { label: 'Développement futur',   path: '/nos-activites#futur' },
                { label: 'Impact communautaire',  path: '/impact-social' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-green-200 hover:text-orange-400 text-sm flex items-center gap-1.5 transition-colors duration-200"
                  >
                    <span className="w-1 h-1 bg-orange-400 rounded-full flex-shrink-0"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-700 text-white mb-5 text-base">Contact</h3>
            <ul className="space-y-3.5">
              <li>
                <a href="mailto:contact@kfkagrobusiness.com" className="flex items-start gap-3 text-green-200 hover:text-orange-400 text-sm transition-colors">
                  <FaEnvelope size={15} className="mt-0.5 flex-shrink-0 text-orange-400" />
                 contact@kfkagrobusiness.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/212621532793" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-green-200 hover:text-orange-400 text-sm transition-colors">
                  <FaPhoneAlt size={15} className="mt-0.5 flex-shrink-0 text-orange-400" />
                  +212 621 53 27 93
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-green-200 text-sm">
                  <FaMapMarkerAlt size={15} className="mt-0.5 flex-shrink-0 text-orange-400" />
                  Kinshasa / Luebo<br />République Démocratique du Congo
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2">
          <p className="text-green-300 text-[11px] sm:text-xs text-center">
            © 2025 KFK Agro Business. Tous droits réservés.
          </p>
          <p className="text-green-300 text-[11px] sm:text-xs text-center sm:text-right">
            KFK Agro Business — Ensemble, cultivons l'avenir
          </p>
        </div>
      </div>
    </footer>
  )
}
