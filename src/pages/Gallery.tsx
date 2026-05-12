import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaSearchPlus } from 'react-icons/fa'
import PageHero from '../components/PageHero'

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&auto=format&fit=crop&q=70',
    caption: 'Champ de maïs — Région de Luebo',
    category: 'agriculture',
  },
  {
    src: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&auto=format&fit=crop&q=70',
    caption: 'Récolte de maïs frais',
    category: 'agriculture',
  },
  {
    src: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&auto=format&fit=crop&q=70',
    caption: 'Élevage de poules pondeuses',
    category: 'elevage',
  },
  {
    src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&auto=format&fit=crop&q=70',
    caption: "Travaux d'agriculture",
    category: 'agriculture',
  },
  {
    src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=70',
    caption: "Équipe sur le terrain",
    category: 'equipe',
  },
  {
    src: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&auto=format&fit=crop&q=70',
    caption: 'Stockage des récoltes',
    category: 'stockage',
  },
  {
    src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop&q=70',
    caption: 'Champs agricoles en saison',
    category: 'agriculture',
  },
  {
    src: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=400&auto=format&fit=crop&q=70',
    caption: 'Mécanisation agricole progressive',
    category: 'materiel',
  },
  {
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop&q=70',
    caption: 'Formation communautaire',
    category: 'equipe',
  },
]

const categories = ['tous', 'agriculture', 'elevage', 'equipe', 'stockage', 'materiel']
const categoryLabels: Record<string, string> = {
  tous: 'Tous',
  agriculture: 'Agriculture',
  elevage: 'Élevage',
  equipe: 'Équipe',
  stockage: 'Stockage',
  materiel: 'Matériel',
}

export default function Gallery() {
  const [selected, setSelected] = useState<null | typeof gallery[0]>(null)
  const [activeCategory, setActiveCategory] = useState('tous')

  const filtered = activeCategory === 'tous'
    ? gallery
    : gallery.filter((img) => img.category === activeCategory)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        title="Galerie"
        subtitle="Quelques images du développement progressif du projet KFK Agro Business"
        image="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1600&auto=format&fit=crop&q=80"
        accent="orange"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-green-700/70 mb-10 max-w-2xl mx-auto"
          >
            Découvrez à travers ces images le quotidien de nos équipes, nos champs de maïs,
            notre élevage et le développement progressif de KFK Agro Business en République
            Démocratique du Congo.
          </motion.p>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-green-700 text-white shadow-lg shadow-green-700/20'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                {categoryLabels[cat]}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(img)}
                  className="group relative img-zoom rounded-md overflow-hidden aspect-square cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={img.thumb}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-green-950/0 group-hover:bg-green-950/50 transition-all duration-300 flex items-center justify-center">
                    <FaSearchPlus
                      size={32}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-green-950/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium">{img.caption}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              >
                <FaTimes size={28} />
              </button>
              <img
                src={selected.src}
                alt={selected.caption}
                className="w-full max-h-[80vh] object-contain rounded-md"
              />
              <p className="text-white/70 text-sm text-center mt-4">{selected.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
