import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  FaDollarSign, FaUsers, FaCheckCircle, FaPaperPlane,
  FaChevronDown, FaChevronUp, FaBoxOpen, FaLeaf, FaHandshake,
  FaPhoneAlt, FaWhatsapp, FaSpinner, FaExclamationCircle
} from 'react-icons/fa'
import PageHero from '../components/PageHero'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_PARTNER
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

type Status = 'idle' | 'sending' | 'success' | 'error'

// ─── Form types ────────────────────────────────────────────────
interface FormState {
  nom: string
  organisation: string
  email: string
  telephone: string
  type: string
  message: string
  agree: boolean
}

const initialForm: FormState = {
  nom: '', organisation: '', email: '', telephone: '',
  type: '', message: '', agree: false,
}

// ─── Section component ─────────────────────────────────────────
interface PartnerSectionProps {
  id: string
  icon: React.ReactNode
  label: string
  title: string
  subtitle: string
  image: string
  color: 'green' | 'orange' | 'dark'
  description: string
  points: string[]
  ctaLabel: string
  formTitle: string
  formType: string
  index: number
}

function PartnerSection({
  id, icon, label, title, subtitle, image, color,
  description, points, ctaLabel, formTitle, formType, index
}: PartnerSectionProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const handleToggle = () => {
    setOpen(prev => !prev)
    if (open) {
      // reset when closing
      setStatus('idle')
      setForm(initialForm)
    }
  }

  const colorMap = {
    green: {
      accent: 'bg-green-700',
      accentText: 'text-green-700',
      accentLight: 'bg-green-50',
      badge: 'bg-green-100 text-green-800',
      button: 'bg-green-700 hover:bg-green-800 shadow-green-700/25',
      check: 'text-green-600',
      ring: 'focus:ring-green-500',
      border: 'border-green-200',
      gradient: 'from-green-950',
      iconBg: 'bg-green-700',
    },
    orange: {
      accent: 'bg-orange-500',
      accentText: 'text-orange-600',
      accentLight: 'bg-orange-50',
      badge: 'bg-orange-100 text-orange-800',
      button: 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/25',
      check: 'text-orange-500',
      ring: 'focus:ring-orange-400',
      border: 'border-orange-200',
      gradient: 'from-orange-950',
      iconBg: 'bg-orange-500',
    },
    dark: {
      accent: 'bg-green-900',
      accentText: 'text-green-900',
      accentLight: 'bg-green-50',
      badge: 'bg-green-100 text-green-900',
      button: 'bg-green-900 hover:bg-green-950 shadow-green-900/25',
      check: 'text-green-700',
      ring: 'focus:ring-green-600',
      border: 'border-green-200',
      gradient: 'from-green-950',
      iconBg: 'bg-green-800',
    },
  }
  const c = colorMap[color]
  const isEven = index % 2 === 0

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-20"
    >
      <div className={`grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl`}>
        {/* Image */}
        <div className={`relative h-48 sm:h-64 md:h-72 lg:h-auto img-zoom ${!isEven ? 'lg:order-2' : ''}`}>
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient}/80 via-transparent to-transparent`} />
          <div className="absolute bottom-6 left-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${c.badge} rounded-md text-sm font-bold mb-3`}>
              {icon}
              {label}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`bg-white p-6 sm:p-8 lg:p-10 flex flex-col ${!isEven ? 'lg:order-1' : ''}`}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900 mb-2">{title}</h2>
          <p className={`text-sm font-semibold ${c.accentText} mb-4`}>{subtitle}</p>
          <p className="text-green-700/70 text-sm leading-relaxed mb-6">{description}</p>

          {/* Bullet points */}
          <div className="space-y-2.5 mb-8">
            {points.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <FaCheckCircle size={16} className={`${c.check} flex-shrink-0 mt-0.5`} />
                <span className="text-green-800 text-sm">{p}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleToggle}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 ${c.button} text-white font-bold rounded-md shadow-lg transition-all duration-200 text-sm`}
            >
              {ctaLabel}
              {open ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="https://wa.me/212621532793"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 px-5 bg-[#25D366] text-white font-bold rounded-md text-sm transition-all duration-200 hover:bg-[#20BA5A]"
            >
              <FaPhoneAlt size={15} />
              WhatsApp
            </motion.a>
          </div>

          {/* Inline Form */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className={`${c.accentLight} rounded-2xl p-5 sm:p-6 mt-2`}>
                  <h4 className="text-green-900 font-bold mb-4 text-base">{formTitle}</h4>

                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className={`w-14 h-14 ${c.accent} rounded-md flex items-center justify-center mx-auto mb-3`}>
                        <FaCheckCircle size={28} className="text-white" />
                      </div>
                      <p className="text-green-800 font-bold text-lg mb-1">Demande envoyée !</p>
                      <p className="text-green-600/70 text-sm mb-4">Notre équipe vous contactera très prochainement.</p>
                      <button
                        onClick={() => { setStatus('idle'); setForm(initialForm) }}
                        className={`px-5 py-2.5 ${c.accent} text-white font-bold rounded-md text-sm transition-colors`}
                      >
                        Nouvelle demande
                      </button>
                    </motion.div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                      {/* Champ caché pour identifier le type de partenariat dans l'email */}
                      <input type="hidden" name="partner_type" value={formType} />
                      <input type="hidden" name="partner_label" value={label} />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-green-800 text-xs font-semibold mb-1.5">Nom complet *</label>
                          <input
                            name="nom" value={form.nom} onChange={handleChange} required
                            placeholder="Votre nom complet"
                            className={`w-full px-3 py-2.5 bg-white border ${c.border} rounded-md text-green-800 placeholder-green-400/50 text-sm focus:outline-none focus:ring-2 ${c.ring} transition`}
                          />
                        </div>
                        <div>
                          <label className="block text-green-800 text-xs font-semibold mb-1.5">Organisation</label>
                          <input
                            name="organisation" value={form.organisation} onChange={handleChange}
                            placeholder="Votre organisation"
                            className={`w-full px-3 py-2.5 bg-white border ${c.border} rounded-md text-green-800 placeholder-green-400/50 text-sm focus:outline-none focus:ring-2 ${c.ring} transition`}
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-green-800 text-xs font-semibold mb-1.5">Email *</label>
                          <input
                            name="email" value={form.email} onChange={handleChange} type="email" required
                            placeholder="votre@email.com"
                            className={`w-full px-3 py-2.5 bg-white border ${c.border} rounded-md text-green-800 placeholder-green-400/50 text-sm focus:outline-none focus:ring-2 ${c.ring} transition`}
                          />
                        </div>
                        <div>
                          <label className="block text-green-800 text-xs font-semibold mb-1.5">Téléphone / WhatsApp</label>
                          <input
                            name="telephone" value={form.telephone} onChange={handleChange}
                            placeholder="+243 00 000 00 00"
                            className={`w-full px-3 py-2.5 bg-white border ${c.border} rounded-md text-green-800 placeholder-green-400/50 text-sm focus:outline-none focus:ring-2 ${c.ring} transition`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-green-800 text-xs font-semibold mb-1.5">Type de partenariat *</label>
                        <select
                          name="type" value={form.type} onChange={handleChange} required
                          className={`w-full px-3 py-2.5 bg-white border ${c.border} rounded-md text-green-800 text-sm focus:outline-none focus:ring-2 ${c.ring} transition`}
                        >
                          <option value="">Sélectionnez...</option>
                          <option value={formType}>{formTitle}</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-green-800 text-xs font-semibold mb-1.5">Message *</label>
                        <textarea
                          name="message" value={form.message} onChange={handleChange} required rows={3}
                          placeholder="Décrivez votre demande ou proposition..."
                          className={`w-full px-3 py-2.5 bg-white border ${c.border} rounded-md text-green-800 placeholder-green-400/50 text-sm focus:outline-none focus:ring-2 ${c.ring} transition resize-none`}
                        />
                      </div>
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox" name="agree" id={`agree-${id}`}
                          checked={form.agree} onChange={handleChange} required
                          className="mt-1 rounded"
                        />
                        <label htmlFor={`agree-${id}`} className="text-green-700/70 text-xs">
                          J'accepte d'être contacté(e) par KFK Agro Business concernant ma demande.
                        </label>
                      </div>

                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm"
                        >
                          <FaExclamationCircle className="flex-shrink-0" size={16} />
                          Une erreur est survenue. Réessayez ou contactez-nous via WhatsApp.
                        </motion.div>
                      )}

                      <motion.button
                        whileHover={{ scale: status === 'sending' ? 1 : 1.01 }}
                        whileTap={{ scale: status === 'sending' ? 1 : 0.97 }}
                        type="submit"
                        disabled={status === 'sending'}
                        className={`w-full flex items-center justify-center gap-2 py-3 ${c.button} disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-md shadow-lg transition-all text-sm`}
                      >
                        {status === 'sending' ? (
                          <>
                            <FaSpinner size={15} className="animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane size={15} />
                            Envoyer ma demande
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main page ─────────────────────────────────────────────────
const sections: Omit<PartnerSectionProps, 'index'>[] = [
  {
    id: 'fournisseurs',
    icon: <FaBoxOpen size={14} />,
    label: 'Fournisseurs',
    title: 'Devenir Fournisseur',
    subtitle: 'Nous recherchons des partenaires fiables pour accompagner notre croissance.',
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=800&auto=format&fit=crop&q=80',
    color: 'green',
    description:
      'KFK Agro Business recherche des fournisseurs fiables et engagés pour accompagner notre développement agricole en RDC. Nous croyons en des partenariats durables basés sur la confiance, la qualité et le respect mutuel.',
    points: [
      'Semences et plants de qualité',
      'Engrais et produits phytosanitaires',
      'Équipements agricoles',
      "Matériel d'élevage et de stockage",
      'Services logistiques agricoles',
    ],
    ctaLabel: 'Devenir fournisseur',
    formTitle: 'Formulaire Fournisseur',
    formType: 'fournisseur',
  },
  {
    id: 'financeurs',
    icon: <FaDollarSign size={14} />,
    label: 'Financeurs / Investisseurs',
    title: 'Investir dans KFK',
    subtitle: 'Soutenez un projet agricole durable à fort impact économique et social.',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&auto=format&fit=crop&q=80',
    color: 'orange',
    description:
      'Le projet KFK Agro Business est ouvert aux partenaires financiers souhaitant soutenir le développement agricole et la sécurité alimentaire en République Démocratique du Congo. Un investissement à la fois rentable et porteur de sens.',
    points: [
      'Partenariats financiers structurés',
      'Investissements à fort impact social',
      "Financement de projets d'extension",
      'Mécénat et dons pour le développement',
      'Retour sur investissement progressif',
    ],
    ctaLabel: "Contacter l'équipe",
    formTitle: 'Formulaire Investisseur',
    formType: 'investisseur',
  },
  {
    id: 'partenaires-techniques',
    icon: <FaLeaf size={14} />,
    label: 'Partenaires Techniques & ONG',
    title: 'Partenaires Techniques & ONG',
    subtitle: 'Accompagnez durablement les communautés locales.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    color: 'dark',
    description:
      'Nous collaborons avec les acteurs du développement agricole, les ONG et les institutions souhaitant accompagner durablement les communautés locales en RDC. Ensemble, nous pouvons amplifier notre impact sur le terrain.',
    points: [
      'Appui technique et méthodologique',
      'Renforcement des capacités locales',
      'Accompagnement des communautés rurales',
      'Projets de développement agricole',
      "Partage d'expertise et de ressources",
    ],
    ctaLabel: 'Devenir partenaire',
    formTitle: 'Formulaire Partenariat Technique',
    formType: 'technique',
  },
]

export default function Partners() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        title="Nos Partenaires"
        subtitle="Ensemble, cultivons un avenir durable pour les communautés de RDC"
        image="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1600&auto=format&fit=crop&q=80"
        accent="orange"
      />

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-700/80 text-lg leading-relaxed mb-8">
              KFK Agro Business croit en la force des partenariats pour transformer l'agriculture
              et améliorer les conditions de vie des communautés. Nous collaborons avec des
              fournisseurs, des partenaires techniques, des institutions et des financeurs engagés.
            </p>
            {/* Quick Nav */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { id: '#fournisseurs', icon: <FaBoxOpen size={15} />, label: 'Fournisseurs', color: 'bg-green-700' },
                { id: '#financeurs', icon: <FaDollarSign size={15} />, label: 'Financeurs / Investisseurs', color: 'bg-orange-500' },
                { id: '#partenaires-techniques', icon: <FaUsers size={15} />, label: 'Partenaires Techniques & ONG', color: 'bg-green-900' },
              ].map((nav) => (
                <a
                  key={nav.id}
                  href={nav.id}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 ${nav.color} text-white text-sm font-bold rounded-md shadow-md hover:opacity-90 transition-opacity`}
                >
                  {nav.icon}
                  {nav.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-6 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sections.map((section, i) => (
            <PartnerSection key={section.id} {...section} index={i} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaHandshake size={32} className="text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5">
              Envie de collaborer avec nous ?
            </h2>
            <p className="text-green-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Vous êtes une entreprise, une institution ou une organisation souhaitant travailler
              avec KFK Agro Business ? Contactez notre équipe dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/212621532793?text=Bonjour%2C%20je%20souhaite%20devenir%20partenaire%20de%20KFK%20Agro%20Business."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-md shadow-xl transition-all hover:bg-[#20BA5A]"
              >
                <FaWhatsapp size={20} />
                Contacter notre équipe
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:kfkagrobusiness@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white text-white hover:bg-white hover:text-green-900 font-bold rounded-md transition-all duration-200"
              >
                Écrire par email
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
