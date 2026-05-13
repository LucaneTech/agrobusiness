import { motion } from 'framer-motion'
import { FaCheckCircle, FaSeedling, FaTruck } from 'react-icons/fa'
import { GiCorn, GiWheat } from 'react-icons/gi'
import PageHero from '../components/PageHero'

const activities = [
  {
    id: 'agriculture',
    emoji: '🌽',
    label: 'Agriculture',
    title: 'Culture du Maïs',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80',
    desc: "Le cœur de notre activité agricole repose sur la culture du maïs dans la région de Luebo. Nous appliquons des pratiques agricoles durables pour maximiser les rendements tout en préservant l'environnement.",
    points: [
      'Culture du maïs à grande échelle',
      'Préparation et amendement des sols',
      'Semis mécanisé progressif',
      'Entretien et suivi des cultures',
      'Récolte et stockage optimisés',
    ],
  },
  {
    id: 'elevage',
    emoji: '🐔',
    label: 'Élevage',
    title: 'Élevage Avicole',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&auto=format&fit=crop&q=80',
    desc: "Notre élevage de poules pondeuses est conçu pour approvisionner les marchés locaux en œufs frais de qualité. Un élevage qui respecte les normes sanitaires et le bien-être animal.",
    points: [
      'Élevage de poules pondeuses',
      "Production d'œufs frais",
      'Alimentation des volailles',
      'Suivi sanitaire rigoureux',
      'Amélioration continue des conditions',
    ],
  },
  {
    id: 'stockage',
    emoji: '📦',
    label: 'Stockage',
    title: 'Stockage & Conservation',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
    desc: "Des installations de stockage adaptées permettent de conserver les récoltes de maïs dans les meilleures conditions, réduisant ainsi les pertes post-récolte et optimisant la commercialisation.",
    points: [
      'Stockage des récoltes de maïs',
      'Séchage et traitement du maïs',
      'Conservation optimale des produits',
      'Gestion des stocks',
      'Traçabilité des produits',
    ],
  },
  {
    id: 'futur',
    emoji: '🚜',
    label: 'Développement',
    title: 'Développement Futur',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=800&auto=format&fit=crop&q=80',
    desc: "Notre vision s'étend au-delà des activités actuelles. Nous planifions une mécanisation progressive, l'extension des surfaces cultivées et la diversification des activités agricoles.",
    points: [
      'Extension des surfaces cultivées',
      'Amélioration des rendements',
      'Mécanisation progressive',
      'Diversification des activités',
      'Formation des équipes locales',
    ],
  },
]

export default function Activities() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        title="Nos Activités"
        subtitle="De la culture du maïs à l'élevage avicole, un modèle agricole intégré"
        image="https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=1600&auto=format&fit=crop&q=80"
      />

      {/* Activity Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-14 sm:space-y-16 md:space-y-20">
            {activities.map((act, i) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold mb-5 ${
                    act.color === 'orange'
                      ? 'bg-kfk-orange-100 text-kfk-orange-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {/* <span className="text-xl">{act.emoji}</span> */}
                    {act.label}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-4">{act.title}</h2>
                  <p className="text-green-700/70 leading-relaxed mb-6 text-base">{act.desc}</p>
                  <div className="space-y-3">
                    {act.points.map((p, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <FaCheckCircle
                          size={17}
                          className={act.color === 'orange' ? 'text-kfk-orange-500' : 'text-green-600'}
                        />
                        <span className="text-green-800 text-sm font-medium">{p}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="img-zoom rounded-md overflow-hidden shadow-2xl shadow-green-900/15 aspect-[4/3]">
                    <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 mb-4">Notre processus agricole</h2>
            <p className="text-green-700/70">De la préparation des sols à la commercialisation</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '01', label: 'Préparation', desc: 'Analyse et préparation des sols', icon: <FaSeedling className="text-green-600" /> },
              { step: '02', label: 'Culture', desc: 'Semis, entretien et irrigation', icon: <GiCorn className="text-orange-500" /> },
              { step: '03', label: 'Récolte', desc: 'Collecte et traitement des produits', icon: <GiWheat className="text-yellow-600" /> },
              { step: '04', label: 'Distribution', desc: 'Stockage et commercialisation', icon: <FaTruck className="text-green-700" /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-md p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-green-300"
              >
                <div className="text-4xl mb-3 flex justify-center">{item.icon}</div>
                <div className="text-green-300 font-black text-4xl mb-2">{item.step}</div>
                <div className="font-bold text-green-800 mb-2">{item.label}</div>
                <div className="text-green-600/70 text-xs">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
