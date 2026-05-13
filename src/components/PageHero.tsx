import { motion } from 'framer-motion'

interface PageHeroProps {
  title: string
  subtitle: string
  image: string
  accent?: string
}

export default function PageHero({ title, subtitle, image, accent = 'green' }: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[65vh] lg:h-[420px] xl:h-[480px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/50 to-green-800/20" />
        <div className="absolute inset-0 pattern-dots" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-8 sm:pb-10 md:pb-12 lg:pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={`inline-block px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold mb-2 sm:mb-2.5 md:mb-3 ${
            accent === 'orange' ? 'bg-orange-500 text-white' : 'bg-green-600 text-white'
          }`}>
            KFK AGROBUSINESS
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-shadow-lg mb-2 sm:mb-2.5 md:mb-3 leading-tight">
            {title}
          </h1>
          <p className="text-green-100/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            {subtitle}
          </p>
        </motion.div>
      </div>
      {/* Decorative bottom divider - responsive SVG */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24"
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