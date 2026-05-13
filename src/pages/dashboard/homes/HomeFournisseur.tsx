import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Download, Eye, ArrowRight } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../contexts/AuthContext'
import { Message } from '../../../types/database'

const commandesMock = [
  { numero: 'CMD-2025-018', date: '12 Mai 2025', produit: 'Aliment pondeuse (Sac 50 kg)', quantite: '200 sacs', statut: 'En cours', montant: '1 200 000 FC' },
  { numero: 'CMD-2025-017', date: '08 Mai 2025', produit: 'Aliment poussin (Sac 25 kg)', quantite: '150 sacs', statut: 'Confirmée', montant: '675 000 FC' },
  { numero: 'CMD-2025-016', date: '05 Mai 2025', produit: 'Aliment dinde (Sac 50 kg)', quantite: '100 sacs', statut: 'Livrée', montant: '550 000 FC' },
  { numero: 'CMD-2025-015', date: '30 Avr. 2025', produit: 'Concentré volaille (Sac 50 kg)', quantite: '80 sacs', statut: 'Livrée', montant: '440 000 FC' },
]

const facturesMock = [
  { numero: 'FAC-2025-014', date: '12 Mai 2025', commande: 'CMD-2025-018', montant: '1 200 000 FC', statut: 'En attente', echeance: '26 Mai 2025' },
  { numero: 'FAC-2025-013', date: '08 Mai 2025', commande: 'CMD-2025-017', montant: '675 000 FC', statut: 'En attente', echeance: '22 Mai 2025' },
  { numero: 'FAC-2025-012', date: '05 Mai 2025', commande: 'CMD-2025-016', montant: '550 000 FC', statut: 'Payée', echeance: '15 Mai 2025' },
  { numero: 'FAC-2025-011', date: '30 Avr. 2025', commande: 'CMD-2025-015', montant: '440 000 FC', statut: 'Payée', echeance: '10 Mai 2025' },
]

const paiementsData = [
  { name: 'Payé', value: 2450, color: '#2E7D32' },
  { name: 'En attente', value: 1245, color: '#F59E0B' },
  { name: 'En retard', value: 350, color: '#EF4444' },
]

const docs = [
  { nom: 'Contrat de fourniture', taille: 'PDF · 2.4 Mo' },
  { nom: 'Conditions générales de paiement', taille: 'PDF · 1.1 Mo' },
  { nom: 'Liste des produits & tarifs', taille: 'PDF · 1.8 Mo' },
  { nom: 'Charte fournisseur KFK', taille: 'PDF · 1.3 Mo' },
]

const statutCmd: Record<string, string> = {
  'En cours': 'bg-orange-100 text-orange-600',
  'Confirmée': 'bg-blue-100 text-blue-600',
  'Livrée': 'bg-green-100 text-green-700',
  'Annulée': 'bg-red-100 text-red-600',
}

const statutFac: Record<string, string> = {
  'En attente': 'bg-orange-100 text-orange-600',
  'Payée': 'bg-green-100 text-green-700',
  'En retard': 'bg-red-100 text-red-600',
}

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime()
  const h = Math.floor(diff / 3600000)
  return h < 24 ? `Il y a ${h}h` : `Il y a ${Math.floor(diff / 86400000)}j`
}

export default function HomeFournisseur() {
  const { user, profile } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [docList, setDocList] = useState<{ nom: string; taille: string | null }[]>([])

  useEffect(() => {
    if (!user) return
    supabase.from('messages').select('*').eq('recipient_id', user.id).order('created_at', { ascending: false }).limit(3)
      .then(({ data }) => setMessages((data ?? []) as Message[]))
    supabase.from('documents').select('nom, taille').eq('user_id', user.id).order('created_at', { ascending: false }).limit(4)
      .then(({ data }) => setDocList(data ?? []))
  }, [user])

  const totalDu = paiementsData.slice(1).reduce((s, i) => s + i.value, 0)

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Bienvenue, {profile?.full_name ?? 'Fournisseur'}</h2>
        <p className="text-sm text-gray-500 mt-0.5">Voici un aperçu de votre activité avec KFK Agro Business.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total en cours', value: '4', title: 'Commandes en cours', icon: '🛒', bg: 'bg-green-50' },
          { label: 'Total livraisons', value: '3', title: 'Livraisons ce mois', icon: '🚚', bg: 'bg-blue-50' },
          { label: 'Total en attente', value: '2', title: 'Factures en attente', icon: '🧾', bg: 'bg-orange-50' },
          { label: 'Total à recevoir', value: '1 245 000 FC', title: 'Montant en attente', icon: '💵', bg: 'bg-green-50' },
        ].map(s => (
          <div key={s.title} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`${s.bg} w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            <p className="text-xs font-semibold text-gray-700">{s.title}</p>
          </div>
        ))}
      </div>

      {/* Commandes + Paiements */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Table commandes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 className="font-semibold text-gray-800">Commandes récentes</h3>
            <Link to="/dashboard/commandes" className="text-xs text-green-700 font-medium hover:underline flex items-center gap-1">
              Voir toutes les commandes <ArrowRight size={11} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500">N° Commande</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500 hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500">Produit</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500 hidden md:table-cell">Qté</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500">Statut</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-gray-500 hidden md:table-cell">Montant</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {commandesMock.map(c => (
                  <tr key={c.numero} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-700">{c.numero}</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{c.date}</td>
                    <td className="px-4 py-3 text-gray-700 max-w-[140px] truncate">{c.produit}</td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{c.quantite}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${statutCmd[c.statut]}`}>{c.statut}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700 font-medium hidden md:table-cell">{c.montant}</td>
                    <td className="px-4 py-3 text-gray-400 hover:text-green-700 cursor-pointer"><Eye size={14} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paiements donut */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-sm">Échéancier des paiements</h3>
            <Link to="/dashboard/factures" className="text-xs text-green-700 hover:underline">Voir tout</Link>
          </div>
          <div className="flex justify-center mb-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={paiementsData} cx="50%" cy="50%" innerRadius={38} outerRadius={60} dataKey="value" strokeWidth={0}>
                  {paiementsData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} FC`]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-2">
            {paiementsData.map(p => (
              <li key={p.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-gray-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                  {p.name}
                </span>
                <span className="font-semibold text-gray-700">{p.value.toLocaleString()} FC</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Total dû</span>
            <span className="text-sm font-bold text-red-600">{totalDu.toLocaleString()} FC</span>
          </div>
        </div>
      </div>

      {/* Factures + Messages + Documents */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Table factures */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 className="font-semibold text-gray-800">Factures récentes</h3>
            <Link to="/dashboard/factures" className="text-xs text-green-700 hover:underline flex items-center gap-1">
              Voir toutes les factures <ArrowRight size={11} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500">N° Facture</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500 hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500 hidden md:table-cell">Commande</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-gray-500">Montant</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500">Statut</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-500 hidden md:table-cell">Échéance</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {facturesMock.map(f => (
                  <tr key={f.numero} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-700">{f.numero}</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{f.date}</td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{f.commande}</td>
                    <td className="px-4 py-3 text-right text-gray-700 font-medium">{f.montant}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${statutFac[f.statut]}`}>{f.statut}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{f.echeance}</td>
                    <td className="px-4 py-3 text-gray-400 hover:text-green-700 cursor-pointer"><Eye size={14} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Messages + Documents */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">Messages récents</h3>
              <Link to="/dashboard/messages" className="text-xs text-green-700 hover:underline">Voir tous</Link>
            </div>
            {messages.length === 0 ? (
              <div className="space-y-3">
                {[
                  { sender: 'KFK Agro Business', preview: 'Commande CMD-2025-018 confirmée.', time: '12 Mai 2025' },
                  { sender: 'KFK Finances', preview: 'Facture FAC-2025-014 en attente de paiement.', time: '10 Mai 2025' },
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{m.sender[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800">{m.sender}</p>
                      <p className="text-xs text-gray-500 truncate">{m.preview}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">{m.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {messages.map(m => (
                  <li key={m.id} className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{(m.sender_name ?? 'A')[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800">{m.sender_name ?? 'KFK Admin'}</p>
                      <p className="text-xs text-gray-500 truncate">{m.content}</p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">{timeAgo(m.created_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 text-sm">Documents importants</h3>
              <Link to="/dashboard/documents" className="text-xs text-green-700 hover:underline">Voir tous</Link>
            </div>
            <ul className="space-y-2.5">
              {(docList.length > 0
                ? docList.map(d => ({ nom: d.nom, taille: d.taille ?? 'Fichier' }))
                : docs
              ).map((d, i) => (
                <li key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span>📄</span>
                    <div>
                      <p className="text-xs font-medium text-gray-700 truncate max-w-[130px]">{d.nom}</p>
                      <p className="text-xs text-gray-400">{d.taille}</p>
                    </div>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-green-700 shrink-0"><Download size={13} /></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Support footer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center shrink-0">
            <span className="text-white text-sm">💬</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Besoin d'aide ?</p>
            <p className="text-xs text-green-700 font-medium">Contactez-nous</p>
          </div>
        </div>
        <Link to="/dashboard/messages" className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shrink-0">
          Envoyer un message
        </Link>
      </div>
    </div>
  )
}
