import { useEffect, useState } from 'react'
import { Upload, Download, Trash2, File } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { Document } from '../../types/database'

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const typeIcon: Record<string, string> = {
  pdf: '📄',
  doc: '📝',
  docx: '📝',
  xls: '📊',
  xlsx: '📊',
  jpg: '🖼️',
  jpeg: '🖼️',
  png: '🖼️',
}

export default function Documents() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    if (!user) return
    const { data } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setDocuments((data ?? []) as Document[])
    setLoading(false)
  }

  useEffect(() => { load() }, [user])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploading(true)
    const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
    const path = `${user.id}/${Date.now()}_${file.name}`

    const { error: uploadError, data } = await supabase.storage
      .from('documents')
      .upload(path, file)

    if (!uploadError && data) {
      const { data: urlData } = supabase.storage.from('documents').getPublicUrl(path)
      await supabase.from('documents').insert({
        user_id: user.id,
        nom: file.name,
        type: ext,
        url: urlData.publicUrl,
        taille: formatSize(file.size),
      })
      load()
    }
    setUploading(false)
    e.target.value = ''
  }

  const handleDelete = async (doc: Document) => {
    if (!user) return
    if (!confirm(`Supprimer "${doc.nom}" ?`)) return
    const path = doc.url?.split('/documents/')[1]
    if (path) await supabase.storage.from('documents').remove([decodeURIComponent(path)])
    await supabase.from('documents').delete().eq('id', doc.id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Mes documents</h2>
        <label className={`flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
          <Upload size={15} />
          {uploading ? 'Upload...' : 'Importer'}
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
          <File size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Aucun document. Importez votre premier fichier.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Nom</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Taille</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documents.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{typeIcon[doc.type ?? ''] ?? '📁'}</span>
                      <span className="text-gray-800 font-medium truncate max-w-[180px]">{doc.nom}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 uppercase text-xs hidden sm:table-cell">{doc.type ?? '—'}</td>
                  <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{doc.taille ?? '—'}</td>
                  <td className="px-5 py-3.5 text-gray-400 hidden md:table-cell">{formatDate(doc.created_at)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      {doc.url && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                          title="Télécharger"
                        >
                          <Download size={15} />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(doc)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
