import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, Home, TrendingUp, Wheat, Heart,
  ArrowLeft, ChevronRight
} from 'lucide-react'

type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }

const sections: {
  id: string
  icon: React.ElementType
  title: string
  accent: 'green' | 'orange'
  content: ContentBlock[]
}[] = [
  {
    id: 'emplois',
    icon: Users,
    title: "Création d'emplois",
    accent: 'green',
    content: [
      { type: 'p', text: "KFK Agro Business contribue activement à la création d'emplois locaux dans les secteurs agricoles et de l'élevage en République Démocratique du Congo." },
      { type: 'p', text: "Le projet mobilise actuellement une vingtaine de personnes pour les activités de préparation des champs, semis, entretien des cultures, manutention, suivi de l'élevage et commercialisation des produits agricoles." },
      { type: 'p', text: "À moyen terme, le développement progressif des activités permettra la création de nombreux emplois directs et indirects, notamment pour les jeunes et les populations rurales de la région de Luebo et de Kinshasa." },
      { type: 'p', text: "Notre objectif est de participer durablement à la réduction du chômage et à l'autonomisation économique des communautés locales." },
    ],
  },
  {
    id: 'familles-rurales',
    icon: Home,
    title: 'Soutien aux familles rurales',
    accent: 'orange',
    content: [
      { type: 'p', text: "Le projet KFK Agro Business génère des revenus pour plusieurs familles rurales grâce aux activités agricoles et à l'élevage." },
      { type: 'p', text: "En travaillant avec de la main-d'œuvre locale et en développant progressivement la production agricole, le projet contribue à améliorer les conditions de vie des populations locales." },
      { type: 'p', text: "Les revenus générés permettent notamment de soutenir :" },
      { type: 'list', items: [
        "l'alimentation des familles",
        "la scolarisation des enfants",
        "les dépenses de santé",
        "les activités économiques locales",
      ]},
      { type: 'p', text: "KFK Agro Business souhaite construire un modèle agricole durable bénéficiant directement aux communautés locales." },
    ],
  },
  {
    id: 'autonomisation',
    icon: TrendingUp,
    title: 'Autonomisation économique',
    accent: 'green',
    content: [
      { type: 'p', text: "KFK Agro Business vise à renforcer l'autonomie économique des jeunes et des populations locales à travers le développement d'activités agricoles rentables et durables." },
      { type: 'p', text: "Le projet encourage l'entrepreneuriat agricole en créant des opportunités de travail, de formation pratique et de génération de revenus dans les domaines de l'agriculture et de l'élevage." },
      { type: 'p', text: "Grâce à une approche progressive et structurée, le projet contribue à développer une économie locale plus dynamique et plus résiliente." },
    ],
  },
  {
    id: 'securite-alimentaire',
    icon: Wheat,
    title: 'Sécurité alimentaire',
    accent: 'orange',
    content: [
      { type: 'p', text: "Le projet KFK Agro Business contribue à renforcer la sécurité alimentaire en République Démocratique du Congo à travers la production locale de maïs et d'œufs." },
      { type: 'p', text: "En augmentant progressivement les capacités de production, le projet participe à :" },
      { type: 'list', items: [
        "la réduction des importations alimentaires",
        "l'amélioration de l'accès aux produits alimentaires essentiels",
        "la stabilisation des prix sur les marchés locaux",
      ]},
      { type: 'p', text: "Notre ambition est de contribuer durablement à une agriculture productive, accessible et créatrice de valeur pour les communautés locales." },
    ],
  },
  {
    id: 'developpement-communautaire',
    icon: Heart,
    title: 'Développement communautaire',
    accent: 'green',
    content: [
      { type: 'p', text: "KFK Agro Business place le développement communautaire au cœur de ses activités." },
      { type: 'p', text: "Le projet favorise l'implication des populations locales dans les activités agricoles et d'élevage afin de créer un impact économique et social durable dans les communautés rurales." },
      { type: 'p', text: "À travers la création d'emplois, la génération de revenus et le développement des activités agricoles, KFK Agro Business souhaite contribuer à l'amélioration des conditions de vie et au développement local dans la région de Luebo et au-delà." },
    ],
  },
]

function getDocumentTop(el: HTMLElement): number {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const navHeight = document.querySelector('nav')?.offsetHeight ?? 72
  // offsetTop traversal avoids getBoundingClientRect being skewed by CSS transforms
  window.scrollTo({ top: Math.max(0, getDocumentTop(el) - navHeight - 4), behavior: 'smooth' })
}

export default function SocialImpactDetail() {
  const { hash } = useLocation()
  const initialId = hash.replace('#', '') || ''
  const [activeId, setActiveId] = useState(initialId)

  useEffect(() => {
    const id = hash.replace('#', '')
    if (!id) return
    setActiveId(id)
    // Wait for ScrollToTop smooth animation (~400ms) + layout settle
    const t = setTimeout(() => scrollToId(id), 700)
    return () => clearTimeout(t)
  }, [hash])

  const scrollTo = (id: string) => {
    setActiveId(id)
    scrollToId(id)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="bg-green-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-700/30 rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-800/40 rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24">
          
          <h1 className="text-3xl sm:text-4xl font-800 text-white mb-3 leading-tight mt-6 md:mt-8 ">
            Nos axes d'impact{' '}
            <span className="text-orange-400">en détail</span>
          </h1>
          <p className="text-green-300 text-base max-w-2xl font-400">
            Découvrez comment KFK Agro Business crée un impact positif et durable
            dans les communautés locales de la RDC.
          </p>

          {/* Mobile nav pills */}
          <div className="flex lg:hidden gap-2 mt-7 overflow-x-auto pb-1 -mx-1 px-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                  text-xs font-600 transition-all duration-200
                  ${activeId === s.id
                    ? s.accent === 'orange'
                      ? 'bg-orange-500 text-white'
                      : 'bg-green-600 text-white'
                    : 'bg-white/10 text-green-200 hover:bg-white/20'
                  }`}
              >
                <s.icon size={12} />
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12 items-start">

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-[10px] font-700 uppercase tracking-widest text-gray-400 mb-4 px-1">
                Sections
              </p>
              <nav className="space-y-0.5">
                {sections.map(s => {
                  const isActive = activeId === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                        text-sm text-left transition-all duration-200
                        ${isActive
                          ? s.accent === 'orange'
                            ? 'bg-orange-50 text-orange-600 font-700'
                            : 'bg-green-50 text-green-700 font-700'
                          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50 font-500'
                        }`}
                    >
                      <span className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center
                        ${isActive
                          ? s.accent === 'orange'
                            ? 'bg-orange-100'
                            : 'bg-green-100'
                          : 'bg-gray-100'
                        }`}>
                        <s.icon size={14} className={isActive
                          ? s.accent === 'orange' ? 'text-orange-500' : 'text-green-600'
                          : 'text-gray-400'
                        } />
                      </span>
                      <span className="flex-1 leading-snug">{s.title}</span>
                      {isActive && (
                        <ChevronRight size={14} className={
                          s.accent === 'orange' ? 'text-orange-400' : 'text-green-500'
                        } />
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Sections list */}
          <main className="space-y-8 mt-8 lg:mt-0">
            {sections.map((s, i) => {
              const isActive = activeId === s.id
              return (
                <motion.section
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className={`bg-white rounded-xl p-8 shadow-sm border transition-all duration-500 scroll-mt-8
                    ${isActive
                      ? s.accent === 'orange'
                        ? 'border-orange-200 ring-1 ring-orange-100 shadow-md shadow-orange-50'
                        : 'border-green-200 ring-1 ring-green-100 shadow-md shadow-green-50'
                      : 'border-gray-100'
                    } scroll-mt-0`}
                >
                  {/* Section header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                      ${s.accent === 'orange'
                        ? 'bg-orange-50 border border-orange-100'
                        : 'bg-green-50 border border-green-100'
                      }`}>
                      <s.icon size={22} className={s.accent === 'orange' ? 'text-orange-500' : 'text-green-600'} />
                    </div>
                    <div>
                      <h2 className="text-xl font-800 text-green-900 leading-tight">{s.title}</h2>
                      <div className={`h-0.5 w-10 mt-2 rounded-full
                        ${s.accent === 'orange' ? 'bg-orange-400' : 'bg-green-500'}`}
                      />
                    </div>
                  </div>

                  {/* Content blocks */}
                  <div className="space-y-3.5 pl-16">
                    {s.content.map((block, j) =>
                      block.type === 'p' ? (
                        <p key={j} className="text-gray-600 leading-relaxed text-[15px] font-400">
                          {block.text}
                        </p>
                      ) : (
                        <ul key={j} className="space-y-2 pl-1">
                          {block.items.map((item, k) => (
                            <li key={k} className="flex items-start gap-3 text-gray-600 text-[15px]">
                              <span className={`mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0
                                ${s.accent === 'orange' ? 'bg-orange-400' : 'bg-green-500'}`}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )
                    )}
                  </div>
                </motion.section>
              )
            })}

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-green-900 rounded-xl p-8 text-center mt-4"
            >
              <p className="text-white font-700 text-lg mb-2">
                Vous souhaitez en savoir davantage ?
              </p>
              <p className="text-green-300 text-sm mb-6 font-400">
                Contactez-nous pour discuter de nos initiatives et de la façon dont vous pouvez contribuer.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600
                  text-white font-700 text-sm px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Nous contacter
                <ArrowLeft size={15} className="rotate-180" />
              </Link>
            </motion.div>
          </main>
        </div>
      </div>
    </motion.div>
  )
}
