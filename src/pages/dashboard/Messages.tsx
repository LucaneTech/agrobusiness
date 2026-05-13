import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { Message } from '../../types/database'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (h < 1) return "À l'instant"
  if (h < 24) return `Il y a ${h}h`
  return `Il y a ${d}j`
}

export default function Messages() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('messages')
      .select('*')
      .eq('recipient_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setMessages((data ?? []) as Message[])
        setLoading(false)
      })
  }, [user])

  const handleOpen = async (msg: Message) => {
    setSelected(msg)
    if (!msg.lu) {
      await supabase.from('messages').update({ lu: true }).eq('id', msg.id)
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, lu: true } : m))
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-6">Mes messages</h2>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
          <p className="text-gray-400 text-sm">Aucun message pour l'instant.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-5 h-[calc(100vh-16rem)]">
          {/* Liste */}
          <div className={`lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto ${selected ? 'hidden lg:block' : ''}`}>
            <ul className="divide-y divide-gray-50">
              {messages.map(m => (
                <li
                  key={m.id}
                  onClick={() => handleOpen(m)}
                  className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === m.id ? 'bg-green-100' : ''}`}
                >
                  <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                    {m.sender_avatar ? (
                      <img src={m.sender_avatar} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-white text-xs font-bold">
                        {(m.sender_name ?? 'A')[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${!m.lu ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                        {m.sender_name ?? 'KFK Admin'}
                      </p>
                      <span className="text-xs text-gray-400 ml-2 shrink-0">{timeAgo(m.created_at)}</span>
                    </div>
                    {m.subject && (
                      <p className={`text-xs truncate mt-0.5 ${!m.lu ? 'font-medium text-gray-700' : 'text-gray-500'}`}>
                        {m.subject}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 truncate mt-0.5">{m.content}</p>
                  </div>
                  {!m.lu && (
                    <span className="w-2 h-2 rounded-full bg-green-700 mt-1.5 shrink-0" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Détail */}
          <div className={`lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 ${!selected ? 'hidden lg:flex lg:items-center lg:justify-center' : ''}`}>
            {!selected ? (
              <p className="text-gray-400 text-sm">Sélectionnez un message</p>
            ) : (
              <div className="p-5 h-full flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                      {selected.sender_avatar ? (
                        <img src={selected.sender_avatar} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-white text-sm font-bold">
                          {(selected.sender_name ?? 'A')[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{selected.sender_name ?? 'KFK Admin'}</p>
                      <p className="text-xs text-gray-400">{timeAgo(selected.created_at)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-gray-400 hover:text-gray-600 lg:hidden"
                  >
                    ←
                  </button>
                </div>

                {selected.subject && (
                  <h3 className="font-semibold text-gray-800 mb-3">{selected.subject}</h3>
                )}

                <div className="flex-1 overflow-y-auto">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selected.content}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
