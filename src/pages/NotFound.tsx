import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] flex items-center justify-center px-4 bg-white mt-24 "
    >
      <div className="text-center max-w-lg">

        {/* Big 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="relative mb-6 select-none"
        >
          <span className="text-[140px] sm:text-[180px] font-800 leading-none
            text-green-50 select-none pointer-events-none">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center
            text-[140px] sm:text-[180px] font-800 leading-none
            bg-gradient-to-b from-green-700 to-green-900
            bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-orange-400/60" />
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <div className="h-px w-12 bg-orange-400/60" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-800 text-green-900 mb-3">
            Page introuvable
          </h1>
          <p className="text-gray-500 text-base font-400 leading-relaxed mb-8">
            La page que vous cherchez n'existe pas ou a été déplacée.
            Retournez à l'accueil pour continuer votre visite.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700
              text-white font-700 text-sm px-6 py-3 rounded-lg
              transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            <Home size={16} />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-gray-200 hover:border-green-300
              text-gray-600 hover:text-green-800 font-600 text-sm px-6 py-3 rounded-lg
              transition-all duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            Page précédente
          </button>
        </motion.div>

      </div>
    </motion.div>
  )
}
