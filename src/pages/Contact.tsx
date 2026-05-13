import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaWhatsapp, FaExclamationCircle, FaSpinner } from 'react-icons/fa'
import PageHero from '../components/PageHero'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY)
      setStatus('success')
      setForm({ nom: '', email: '', sujet: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        title="Contact"
        subtitle="Nous restons ouverts aux partenariats, accompagnements techniques et collaborations"
        image="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1600&auto=format&fit=crop&q=80"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-14">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-6">Contactez-nous</h2>
              <p className="text-green-700/70 mb-8 leading-relaxed text-sm">
                Vous souhaitez en savoir plus sur KFK Agro Business, devenir partenaire ou
                simplement prendre contact avec notre équipe ? Nous sommes à votre écoute.
              </p>
              <div className="space-y-6">
                <a href="mailto:kfkagrobusiness@gmail.com" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center text-green-700 flex-shrink-0 group-hover:bg-green-700 group-hover:text-white transition-all duration-200">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-green-500 uppercase font-bold tracking-wider mb-1">Email</div>
                    <div className="text-green-800 font-semibold text-sm group-hover:text-orange-600 transition-colors">
                      kfkagrobusiness@gmail.com
                    </div>
                  </div>
                </a>
                <a href="https://wa.me/243970000000" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center text-green-700 flex-shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-200">
                    <FaPhoneAlt size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-green-500 uppercase font-bold tracking-wider mb-1">Téléphone / WhatsApp</div>
                    <div className="text-green-800 font-semibold text-sm group-hover:text-orange-600 transition-colors">
                      +243 97 000 00 00
                    </div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center text-green-700 flex-shrink-0">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-green-500 uppercase font-bold tracking-wider mb-1">Localisation</div>
                    <div className="text-green-800 font-semibold text-sm">
                      Kinshasa / Luebo<br />
                      République Démocratique du Congo
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/243970000000?text=Bonjour%20KFK%20Agro%20Business%2C%20je%20souhaite%20en%20savoir%20plus."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center gap-3 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-4 px-6 rounded-md shadow-lg shadow-green-500/20 transition-all duration-200"
              >
                <FaWhatsapp size={24} className="flex-shrink-0" />
                <span>Écrire via WhatsApp</span>
              </motion.a>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-green-50 rounded-3xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-2">Envoyez-nous un message</h3>
                <p className="text-green-700/60 text-sm mb-8">Nous vous répondrons dans les meilleurs délais.</p>

                {status === 'success' ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-600 rounded-md flex items-center justify-center mx-auto mb-5">
                      <FaCheckCircle size={40} className="text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-green-800 mb-2">Message envoyé !</h4>
                    <p className="text-green-600/70 mb-6">Merci pour votre message. Notre équipe vous contactera très bientôt.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-3 bg-green-700 text-white font-bold rounded-md text-sm hover:bg-green-800 transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-green-800 text-sm font-semibold mb-2">Votre nom *</label>
                        <input
                          name="nom"
                          value={form.nom}
                          onChange={handleChange}
                          required
                          placeholder="Jean Mutombo"
                          className="w-full px-4 py-3 bg-white border border-green-200 rounded-md text-green-800 placeholder-green-400/60 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        />
                      </div>
                      <div>
                        <label className="block text-green-800 text-sm font-semibold mb-2">Votre email *</label>
                        <input
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          type="email"
                          required
                          placeholder="jean@exemple.com"
                          className="w-full px-4 py-3 bg-white border border-green-200 rounded-md text-green-800 placeholder-green-400/60 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-green-800 text-sm font-semibold mb-2">Sujet *</label>
                      <select
                        name="sujet"
                        value={form.sujet}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-green-200 rounded-md text-green-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="partenariat">Partenariat</option>
                        <option value="investissement">Investissement</option>
                        <option value="information">Demande d'information</option>
                        <option value="collaboration">Collaboration ONG/Institution</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-green-800 text-sm font-semibold mb-2">Votre message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Décrivez votre message ou votre proposition..."
                        className="w-full px-4 py-3 bg-white border border-green-200 rounded-md text-green-800 placeholder-green-400/60 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm"
                      >
                        <FaExclamationCircle className="flex-shrink-0" size={16} />
                        Une erreur est survenue. Veuillez réessayer ou nous contacter directement par WhatsApp.
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-green-700 hover:bg-green-800 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-bold rounded-md transition-all duration-200 shadow-lg shadow-green-700/20"
                    >
                      {status === 'sending' ? (
                        <>
                          <FaSpinner size={18} className="animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane size={18} />
                          Envoyer le message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
