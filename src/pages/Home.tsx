import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheckCircle, FaChevronDown, FaSeedling, FaBullseye, FaHardHat, FaHandshake } from 'react-icons/fa'
import { GiChicken, GiCorn } from 'react-icons/gi'
import { Leaf, ShieldCheck, Users, TrendingUp } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

const stats = [
  { value: '12', unit: 'ha', label: 'Hectares exploités', icon: <FaSeedling /> },
  { value: '100', unit: 'ha', label: "Objectif total", icon: <FaBullseye /> },
  { value: '1000', unit: '', label: 'Poules pondeuses', icon: <GiChicken /> },
  { value: '20+', unit: '', label: 'Emplois créés', icon: <FaHardHat /> },
]

const highlights = [
  { label: 'Agriculture durable et production locale', icon: Leaf },
  { label: 'Sécurité alimentaire pour la RDC', icon: ShieldCheck },
  { label: "Création d'emplois pour les jeunes", icon: Users },
  { label: 'Développement économique local', icon: TrendingUp },
]


export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-8 sm:mt-12 md:mt-24">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80"
            alt="Champ de maïs"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-green-900/70 to-green-900/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-white/40 text-white text-sm font-600 px-4 py-2 rounded-md mb-6">
                🌿 Projet Agricole Intégré — RDC
              </span>
            </motion.div> */}

            <div className='flex flex-row items-center justify-center'>
              <img src="favicon.png" alt="icon agrobusiness" className='w-64 sm:w-72 md:w-80 h-auto object-contain' />
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-800 text-white leading-tight">
                KFK{' '}
                <span className="text-orange-400">AGRO</span>
                <br />BUSINESS
              </motion.h1>
            </div>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-green-200 font-500 italic">
              Ensemble, cultivons l'avenir
            </motion.p>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-green-100 max-w-2xl mx-auto leading-relaxed font-400">
              KFK Agro Business est un projet agricole intégré basé en République Démocratique du Congo,
              combinant la production de maïs et l'élevage de poules pondeuses pour contribuer durablement
              à la sécurité alimentaire et au développement économique local.
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
              {highlights.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-md
        bg-white/10 backdrop-blur-md border border-white/20
        shadow-sm hover:bg-white/20 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-md bg-green-500/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-green-400" />
                  </div>
                  <span className="text-white text-xs font-600 leading-snug">{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/projet"
                className="bg-orange-600 hover:bg-orange-500 text-white font-700 px-8 py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1"
              >
                Découvrir le Projet
                <FaArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-700 px-8 py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                Nous Contacter
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/60"
            >
              <FaChevronDown size={28} />
            </motion.div>
          </motion.div> */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-800 py-14">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="relative group flex flex-col items-center text-center
            bg-white hover:bg-gray-50
            border border-gray-100 hover:border-orange-400/60
            rounded-2xl p-6 overflow-hidden
            shadow-md hover:shadow-xl hover:shadow-orange-500/10
            transition-all duration-300 cursor-default"
        >
          {/* Glow top accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5
            bg-gradient-to-r from-transparent via-orange-400/70 to-transparent
            group-hover:via-orange-500 transition-all duration-300" />

          {/* Icon bubble */}
          <div className="w-12 h-12 rounded-md mb-4 flex items-center justify-center text-2xl
            bg-green-200/50 text-green-800 group-hover:text-orange-400 group-hover:bg-orange-50
            border border-green-300 group-hover:border-orange-300/50
            shadow-sm transition-all duration-300">
            {stat.icon}
          </div>

          {/* Value */}
          <div className="flex items-end justify-center gap-0.5 leading-none mb-1">
            <span className="text-3xl md:text-4xl font-800 text-green-800 tracking-tight">
              {stat.value}
            </span>
            {stat.unit && (
              <span className="text-lg font-700 text-orange-500 mb-0.5 ml-0.5">
                {stat.unit}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="w-8 h-px bg-gray-400 group-hover:bg-orange-400/60 my-2.5
            transition-all duration-300 group-hover:w-12" />

          {/* Label */}
          <p className="text-gray-500 group-hover:text-gray-700
            text-xs font-500 leading-snug max-w-[90px]
            transition-colors duration-200">
            {stat.label}
          </p>

          {/* Corner subtle glow */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full
            bg-orange-500/0 group-hover:bg-orange-400/10
            blur-xl transition-all duration-500" />
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-orange-600 font-700 text-sm uppercase tracking-wider">Qui sommes-nous ?</span>
              <h2 className="text-3xl md:text-4xl font-800 text-green-800 mt-2 mb-5">
                Un projet agricole<br />au cœur de la RDC
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 font-400">
                Notre objectif est de contribuer durablement à la sécurité alimentaire,
                à la création d'emplois et au développement économique local dans les
                régions de Kinshasa et Luebo, République Démocratique du Congo.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 font-400">
                Nous croyons en un modèle agricole intégré, alliant production de maïs
                et élevage de poules pondeuses pour maximiser l'impact social et économique
                sur les communautés rurales.
              </p>
              <Link
                to="/projet"
                className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white font-700 px-6 py-3 rounded-md transition-all duration-300 hover:-translate-y-0.5 shadow-md"
              >
                En savoir plus
                <FaArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80"
                  alt="Agriculture maïs"
                  className="rounded-md w-full h-48 object-cover shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&q=80"
                  alt="Poules pondeuses"
                  className="rounded-md w-full h-32 object-cover shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&q=80"
                  alt="Agriculture africaine"
                  className="rounded-md w-full h-32 object-cover shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80"
                  alt="Communauté agricole"
                  className="rounded-md w-full h-48 object-cover shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-800 text-green-800 mb-3">Nos Engagements</h2>
            <p className="text-gray-600 font-400 max-w-xl mx-auto">Découvrez les piliers de notre projet agricole intégré en RDC</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <GiCorn />,
                title: 'Production de Maïs',
                desc: 'Culture progressive jusqu\'à 100 hectares dans la région de Luebo pour renforcer la sécurité alimentaire.',
                link: '/projet',
                color: 'green',
              },
              {
                icon: <GiChicken />,
                title: 'Élevage de Poules',
                desc: 'Développement d\'un élevage de 1000 poules pondeuses pour l\'approvisionnement en œufs frais à Kinshasa.',
                link: '/projet',
                color: 'orange',
              },
              {
                icon: <FaHandshake />,
                title: 'Impact Social',
                desc: 'Création d\'emplois et autonomisation économique pour les jeunes et les populations rurales de la RDC.',
                link: '/impact-social',
                color: 'green',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-md shadow-md hover:shadow-xl transition-all duration-300 p-8"
              >
                <div className={`w-16 h-16 rounded-md flex items-center justify-center text-3xl mb-5 ${item.color === 'orange' ? 'bg-orange-50' : 'bg-green-50'
                  }`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-700 text-green-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-400 mb-5">{item.desc}</p>
                <Link to={item.link} className={`text-sm font-700 flex items-center gap-1 ${item.color === 'orange' ? 'text-orange-600 hover:text-orange-700' : 'text-green-700 hover:text-green-800'
                  } transition-colors`}>
                  En savoir plus <FaArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-green-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-800 text-white mb-4">
              Rejoignez l'aventure KFK
            </h2>
            <p className="text-green-200 font-400 mb-8 max-w-xl mx-auto">
              Nous restons ouverts aux partenariats, accompagnements techniques et
              collaborations contribuant au développement durable du projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/partenaires"
                className="bg-orange-500 hover:bg-orange-400 text-white font-700 px-8 py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-lg"
              >
                Devenir Partenaire
                <FaArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-700 px-8 py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
