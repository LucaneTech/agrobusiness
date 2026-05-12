import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import { GiCorn, GiChicken } from 'react-icons/gi'
import PageHero from '../components/PageHero'
import { MapPin, Truck, Sprout, Target, Users } from 'lucide-react'

const objectives = [
  { horizon: 'Court terme (1–2 ans)', mais: '20 hectares', elevage: '200 poules' },
  { horizon: 'Moyen terme (2–4 ans)', mais: '50 hectares', elevage: '500 poules' },
  { horizon: 'Long terme (4–6 ans)', mais: '100 hectares', elevage: '1 000 poules' },
]

const maisPoints = [
  'Production locale de qualité',
  'Sécurité alimentaire renforcée',
  'Réduction des importations',
  'Amélioration des rendements agricoles',
]

const elevagePoints = [
  "Production d'œufs frais",
  'Élevage durable et responsable',
  'Alimentation locale améliorée',
  'Diversification des revenus',
]

export default function Project() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        title="Le Projet"
        subtitle="Agriculture intégrée pour un avenir durable en RDC"
        image="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1600&auto=format&fit=crop&q=80"
      />

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-green-900 mb-4">Notre Vision</h2>
            <p className="text-green-700/70 max-w-2xl mx-auto text-base leading-relaxed">
              KFK Agro Business est un projet agricole intégré qui combine la culture du maïs et
              l'élevage de poules pondeuses pour créer un modèle agricole durable en RDC.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Maïs */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="rounded-md overflow-hidden shadow-lg hover:shadow-2xl
          group transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop&q=80"
                  alt="Production de maïs"
                  className="w-full h-full object-cover transition-transformmai
              duration-700 group-hover:scale-105"
                />
                {/* Medium dark overlay — full */}
                <div className="absolute inset-0 bg-black/30" />
                {/* Strong gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t
            from-black/80 via-black/20 to-transparent" />

                {/* Icon + Title */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end gap-3">
                  <div className="bg-green-600/80 backdrop-blur-sm
              border border-green-400/40 rounded-md p-2 flex-shrink-0">
                    <GiCorn className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Production de Maïs
                  </h3>
                </div>
              </div>

              <div className="bg-white p-6">
                {/* Color bar */}
                <div className="w-8 h-1 bg-green-500 rounded-md mb-4" />
                <p className="text-green-700/70 text-sm leading-relaxed mb-5">
                  Production agricole progressive dans la région de Luebo avec un objectif
                  de montée à 100 hectares. Le maïs constitue le pilier central de notre
                  engagement alimentaire pour les communautés locales.
                </p>
                <div className="space-y-2">
                  {maisPoints.map((p, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <FaCheckCircle size={13} className="text-green-500 flex-shrink-0" />
                      <span className="text-green-900 text-sm font-medium">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Élevage */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-md overflow-hidden shadow-lg hover:shadow-2xl
          group transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&auto=format&fit=crop&q=80"
                  alt="Élevage de poules pondeuses"
                  className="w-full h-full object-cover transition-transform
              duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t
            from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end gap-3">
                  <div className="bg-orange-600/80 backdrop-blur-sm
              border border-orange-400/40 rounded-md p-2 flex-shrink-0">
                    <GiChicken className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Élevage de Poules Pondeuses
                  </h3>
                </div>
              </div>

              <div className="bg-white p-6">
                <div className="w-8 h-1 bg-orange-500 rounded-md mb-4" />
                <p className="text-green-700/70 text-sm leading-relaxed mb-5">
                  Développement d'un élevage de poules pondeuses destiné à renforcer
                  l'offre locale en œufs à Kinshasa et dans les villes environnantes.
                  Un élevage responsable au service des communautés.
                </p>
                <div className="space-y-2">
                  {elevagePoints.map((p, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <FaCheckCircle size={13} className="text-orange-500 flex-shrink-0" />
                      <span className="text-green-900 text-sm font-medium">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Impact Social — 3ème card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-md overflow-hidden shadow-lg hover:shadow-2xl
          group transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80"
                  alt="Impact Social"
                  className="w-full h-full object-cover transition-transform
              duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t
            from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end gap-3">
                  <div className="bg-emerald-700/80 backdrop-blur-sm
              border border-emerald-400/40 rounded-md p-2 flex-shrink-0">
                    <Users size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Impact Social & Emplois
                  </h3>
                </div>
              </div>

              <div className="bg-white p-6">
                <div className="w-8 h-1 bg-emerald-600 rounded-md mb-4" />
                <p className="text-green-700/70 text-sm leading-relaxed mb-5">
                  KFK Agro Business mobilise déjà une vingtaine de personnes et prévoit
                  la création progressive de 20 à 50 emplois directs pour les jeunes et
                  les populations rurales de la RDC.
                </p>
                <div className="space-y-2">
                  {[
                    "Création d'emplois locaux",
                    'Soutien aux familles rurales',
                    'Autonomisation économique',
                    'Développement communautaire',
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <FaCheckCircle size={13} className="text-emerald-600 flex-shrink-0" />
                      <span className="text-green-900 text-sm font-medium">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Objectives Table */}
      <section className="py-20 bg-green-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-green-900 mb-4">Objectifs de Développement</h2>
            <p className="text-green-700/70">Notre feuille de route pour les 6 prochaines années</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-md shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-green-800 to-green-700">
              {[
                { label: 'Horizon', align: 'text-left', icon: null },
                { label: 'Maïs', align: 'text-center', icon: null },
                { label: 'Élevage', align: 'text-center', icon: null },
              ].map((col) => (
                <div
                  key={col.label}
                  className={`px-6 py-4 ${col.align} flex items-center
          ${col.align === 'text-center' ? 'justify-center' : ''} gap-2`}
                >
                  {col.icon && (
                    <span className="w-7 h-7 bg-white/15 rounded-md flex items-center
            justify-center text-base leading-none">
                      {col.icon}
                    </span>
                  )}
                  <span className="text-white text-xs font-700 uppercase tracking-widest">
                    {col.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {objectives.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`grid grid-cols-3 group
        border-b border-gray-100 last:border-0
        hover:bg-green-50/60 transition-colors duration-200
        ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                {/* Horizon */}
                <div className="px-6 py-5 flex items-center gap-3">
                  {/* Step indicator */}
                  <div className={`w-1.5 h-8 rounded-md flex-shrink-0 ${i === 0 ? 'bg-green-300' :
                      i === 1 ? 'bg-green-500' :
                        'bg-green-700'
                    }`} />
                  <div>
                    <p className="text-green-900 text-sm font-700 leading-tight">
                      {row.horizon.split('(')[0].trim()}
                    </p>
                    {row.horizon.includes('(') && (
                      <p className="text-gray-400 text-[11px] font-500 mt-0.5">
                        {row.horizon.match(/\(.*\)/)?.[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Maïs */}
                <div className="px-6 py-5 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5
         
          text-green-700 font-700 text-xs
          px-3 py-1.5 
          group-hover:bg-green-100 transition-colors duration-200">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-md" />
                    {row.mais}
                  </span>
                </div>

                {/* Élevage */}
                <div className="px-6 py-5 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5
        
          text-orange-600 font-700 text-xs
          px-3 py-1.5
          group-hover:bg-orange-100 transition-colors duration-200">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-md" />
                    {row.elevage}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Footer note */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100
    flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-md" />
              <p className="text-gray-400 text-[11px] font-500">
                Projections sur 6 ans — KFK Agro Business, RDC
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Zone d'action */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-green-900 mb-6">Zone d'Action</h2>
              <p className="text-green-700/70 leading-relaxed mb-4">
                Le projet KFK Agro Business est principalement implanté dans la <strong className="text-green-800">région de Luebo</strong>,
                dans la province du Kasaï en République Démocratique du Congo.
              </p>
              <p className="text-green-700/70 leading-relaxed mb-6">
                La distribution des produits — particulièrement les œufs — est orientée vers
                <strong className="text-green-800"> Kinshasa</strong>, la capitale, pour répondre
                à une forte demande locale.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: 'Superficie cible',
                    value: '100 hectares',
                    icon: Target,
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    iconBg: 'bg-green-500',
                    iconColor: 'text-white',
                    labelColor: 'text-green-600',
                    valueColor: 'text-green-900',
                    watermark: 'text-green-200',
                  },
                  {
                    label: 'Production',
                    value: 'Région de Luebo',
                    icon: MapPin,
                    bg: 'bg-emerald-50',
                    border: 'border-emerald-200',
                    iconBg: 'bg-emerald-500',
                    iconColor: 'text-white',
                    labelColor: 'text-emerald-600',
                    valueColor: 'text-emerald-900',
                    watermark: 'text-emerald-200',
                  },

                  {
                    label: 'Distribution',
                    value: 'Kinshasa & environs',
                    icon: Truck,
                    bg: 'bg-orange-50',
                    border: 'border-orange-200',
                    iconBg: 'bg-orange-500',
                    iconColor: 'text-white',
                    labelColor: 'text-orange-600',
                    valueColor: 'text-orange-900',
                    watermark: 'text-orange-200',
                  },
                  {
                    label: 'Superficie initiale',
                    value: '12 hectares',
                    icon: Sprout,
                    bg: 'bg-lime-50',
                    border: 'border-lime-200',
                    iconBg: 'bg-lime-500',
                    iconColor: 'text-white',
                    labelColor: 'text-lime-700',
                    valueColor: 'text-lime-900',
                    watermark: 'text-lime-200',
                  },

                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45, ease: 'easeOut' }}
                    whileHover={{ y: -3, scale: 1.02, transition: { duration: 0.2 } }}
                    className={`group relative ${item.bg} border ${item.border}
        rounded-md p-4 overflow-hidden
        shadow-sm hover:shadow-lg
        transition-all duration-300 cursor-default`}
                  >
                    {/* Watermark icon in background */}
                    <div className={`absolute -bottom-2 -right-2 ${item.watermark}
        opacity-60 group-hover:opacity-100 group-hover:scale-110
        transition-all duration-500`}>
                      <item.icon size={64} strokeWidth={1} />
                    </div>

                    {/* Icon pill */}
                    <div className={`w-8 h-8 rounded-md ${item.iconBg}
        flex items-center justify-center mb-3
        shadow-md group-hover:scale-110
        transition-transform duration-300`}>
                      <item.icon size={15} className={item.iconColor} strokeWidth={2.5} />
                    </div>

                    {/* Label */}
                    <p className={`${item.labelColor}
        text-[9px] font-800 uppercase tracking-[0.12em] mb-1`}>
                      {item.label}
                    </p>

                    {/* Value */}
                    <p className={`${item.valueColor} font-800 text-sm leading-snug
        relative z-10`}>
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="img-zoom rounded-md overflow-hidden aspect-[4/3] shadow-2xl shadow-green-900/20">
                <img
                  src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&auto=format&fit=crop&q=80"
                  alt="Récolte agricole"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
