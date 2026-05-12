import { motion } from 'framer-motion'

interface PageHeroProps {
  title: string
  subtitle: string
  image: string
  accent?: string
}

export default function PageHero({ title, subtitle, image, accent = 'green' }: PageHeroProps) {
  return (
    <section className="relative h-96 flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/50 to-green-800/20" />
        <div className="absolute inset-0 pattern-dots" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
            accent === 'orange' ? 'bg-kfk-orange-500 text-white' : 'bg-green-600 text-white'
          }`}>
            KFK AGROBUSINESS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg mb-3">{title}</h1>
          <p className="text-green-100/80 text-lg max-w-xl">{subtitle}</p>
        </motion.div>
      </div>
    {/* Decorative bottom divider */}
<div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
  <svg
    viewBox="0 0 1440 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className="w-full h-16 md:h-20"
  >
    {/* Soft wave layer 1 — semi-transparent */}
    <path
      d="M0 40 C240 70, 480 10, 720 40 C960 70, 1200 15, 1440 40 L1440 80 L0 80 Z"
      fill="white"
      fillOpacity="0.08"
    />
    {/* Soft wave layer 2 — offset */}
    <path
      d="M0 55 C360 25, 600 65, 900 45 C1100 30, 1300 60, 1440 50 L1440 80 L0 80 Z"
      fill="white"
      fillOpacity="0.06"
    />
    {/* Solid crisp edge */}
    <path
      d="M0 62 C320 42, 580 75, 900 58 C1150 44, 1320 68, 1440 60 L1440 80 L0 80 Z"
      fill="white"
    />
  </svg>
</div>
    </section>
  )
}
