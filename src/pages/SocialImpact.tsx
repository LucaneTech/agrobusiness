import { motion } from 'framer-motion'
import {
  Users, Home, TrendingUp, Wheat, Heart,
  Handshake, ArrowRight, Quote
} from 'lucide-react'
import PageHero from '../components/PageHero'

const impacts = [
  {
    icon: Users,
    title: "Création d'emplois",
    desc: "Le projet mobilise déjà une vingtaine de personnes et prévoit la création progressive de 20 à 50 emplois directs dans les activités agricoles et d'élevage.",
    accent: 'green',
  },
  {
    icon: Home,
    title: 'Soutien aux familles rurales',
    desc: "En générant des revenus stables, KFK contribue directement à l'amélioration des conditions de vie des familles rurales de la région de Luebo.",
    accent: 'orange',
  },
  {
    icon: TrendingUp,
    title: 'Autonomisation économique',
    desc: "Le projet forme et accompagne les jeunes agriculteurs, leur offrant des compétences durables et une autonomie économique réelle.",
    accent: 'green',
  },
  {
    icon: Wheat,
    title: 'Sécurité alimentaire',
    desc: "La production locale de maïs et d'œufs contribue à réduire la dépendance aux importations et renforce la disponibilité alimentaire locale.",
    accent: 'orange',
  },
  {
    icon: Heart,
    title: 'Développement communautaire',
    desc: "KFK Agro Business s'inscrit dans une vision de développement holistique qui bénéficie à l'ensemble de la communauté locale.",
    accent: 'green',
  },
  {
    icon: Handshake,
    title: 'Partenariats locaux',
    desc: "Nous collaborons avec des acteurs locaux, des institutions et des ONG pour maximiser l'impact social du projet sur le terrain.",
    accent: 'orange',
  },
]

const counters = [
  { value: '20+', label: 'Personnes mobilisées', icon: Users,      color: 'text-green-700',  bg: 'bg-green-30',  border: 'border-green-200' },
  { value: '50',  label: 'Emplois prévus',       icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  { value: '100%',label: 'Impact local',         icon: Heart,      color: 'text-green-800',  bg: 'bg-green-50',  border: 'border-green-200' },
]

export default function SocialImpact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        title="Impact Social"
        subtitle="Créer des opportunités économiques pour les jeunes et populations rurales"
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80"
        accent="orange"
      />

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 text-orange-500
                font-700 text-xs uppercase tracking-widest mb-4">
                <span className="w-6 h-px bg-orange-400" />
                Notre Mission Sociale
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-800 text-green-900 mb-6 leading-tight">
                Un projet au service des{' '}
                <span className="text-orange-500">communautés</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-base mb-4 font-400">
                KFK Agro Business contribue activement au développement local en créant
                des opportunités économiques pour les jeunes et les populations rurales
                de la République Démocratique du Congo.
              </p>
              <p className="text-gray-600 leading-relaxed text-base mb-8 font-400">
                Le projet mobilise déjà une vingtaine de personnes et prévoit la création
                progressive de 20 à 50 emplois directs dans les activités agricoles et d'élevage.
              </p>

              {/* Counters */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {counters.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, type: 'spring', stiffness: 120 }}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className={`relative ${item.bg} border ${item.border}
                      rounded-md p-4 text-center overflow-hidden
                      shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    {/* Watermark icon */}
                    <item.icon
                      size={48}
                      strokeWidth={1}
                      className={`absolute -bottom-2 -right-2 ${item.color} opacity-50`}
                    />
                    <div className={`w-8 h-8 rounded-md ${item.bg} border ${item.border}
                      flex items-center justify-center mx-auto mb-2 shadow-sm`}>
                      <item.icon size={15} className={item.color} />
                    </div>
                    <div className={`text-2xl font-800 ${item.color}`}>{item.value}</div>
                    <div className="text-gray-500 text-[10px] font-600 mt-0.5 leading-snug">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Images grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&auto=format&fit=crop&q=80', alt: 'Équipe agricole',      mt: '' },
                { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop&q=80', alt: 'Communauté rurale',   mt: 'mt-8' },
                { src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop&q=80', alt: 'Travail agricole',    mt: '-mt-8' },
                { src: 'https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?w=400&auto=format&fit=crop&q=80', alt: 'Jeunes agriculteurs', mt: '' },
              ].map((img, i) => (
                <div key={i}
                  className={`rounded-md overflow-hidden shadow-lg aspect-square ${img.mt}
                    hover:shadow-xl transition-shadow duration-300 group`}>
                  <img
                    src={img.src} alt={img.alt}
                    className="w-full h-full object-cover transition-transform
                      duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Impacts grid ─────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 text-orange-500
              font-700 text-xs uppercase tracking-widest mb-4">
              <span className="w-6 h-px bg-orange-400" />
              Axes d'impact
              <span className="w-6 h-px bg-orange-400" />
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-800 text-green-900 mb-3">
              Nos axes d'impact
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto font-400">
              Chaque dimension de notre projet est pensée pour générer un impact
              positif et durable sur les communautés.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {impacts.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-white rounded-md p-7 shadow-sm
                  hover:shadow-xl border border-gray-100
                  hover:border-green-100 transition-all duration-300
                  overflow-hidden relative"
              >
                {/* Top accent */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl
                  bg-gradient-to-r from-transparent
                  ${item.accent === 'orange'
                    ? 'via-orange-400/60 group-hover:via-orange-500'
                    : 'via-green-500/60 group-hover:via-green-600'}
                  to-transparent transition-all duration-300`}
                />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-md mb-5 flex items-center justify-center
                  shadow-sm transition-all duration-300
                  ${item.accent === 'orange'
                    ? 'bg-orange-50 border border-orange-100 group-hover:bg-orange-100'
                    : 'bg-green-50 border border-green-100 group-hover:bg-green-100'}`}
                >
                  <item.icon
                    size={20}
                    className={item.accent === 'orange'
                      ? 'text-orange-500 group-hover:text-orange-600'
                      : 'text-green-600 group-hover:text-green-700'}
                  />
                </div>

                <h3 className="text-base font-800 text-green-900 mb-2.5">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-400 mb-4">
                  {item.desc}
                </p>

                {/* Read more link */}
                <div className={`flex items-center gap-1 text-xs font-700
                  opacity-0 group-hover:opacity-100 -translate-y-1
                  group-hover:translate-y-0 transition-all duration-300
                  ${item.accent === 'orange' ? 'text-orange-500' : 'text-green-600'}`}>
                  En savoir plus
                  <ArrowRight size={12} />
                </div>

                {/* Watermark */}
                <item.icon
                  size={80}
                  strokeWidth={0.5}
                  className={`absolute -bottom-4 -right-4 opacity-[0.04]
                    group-hover:opacity-[0.07] transition-opacity duration-300
                    ${item.accent === 'orange' ? 'text-orange-500' : 'text-green-600'}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ────────────────────────────────────────── */}
      <section className="py-20 bg-green-800 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-700/40
          rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-900/50
          rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] bg-green-700/10 rounded-full" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Quote icon */}
            <div className="w-14 h-14 bg-white/10 border border-white/20
              rounded-md flex items-center justify-center mx-auto mb-8">
              <Quote size={24} className="text-orange-400" />
            </div>

            <blockquote className="text-xl sm:text-2xl md:text-3xl font-700 text-white
              leading-relaxed mb-8 max-w-3xl mx-auto px-2 sm:px-0">
              Le développement commence par la terre. En cultivant la terre,
              nous cultivons l'avenir de nos communautés.
            </blockquote>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-12 h-px bg-orange-400/60" />
              <div className="w-2 h-2 bg-orange-400 rounded-full" />
              <div className="w-12 h-px bg-orange-400/60" />
            </div>
            <span className="text-orange-400 font-700 text-sm tracking-widest uppercase">
              KFK Agro Business
            </span>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}