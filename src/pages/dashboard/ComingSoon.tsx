import { useLocation } from 'react-router-dom'
import { Construction } from 'lucide-react'

export default function ComingSoon() {
  const { pathname } = useLocation()
  const page = pathname.split('/').pop()?.replace(/-/g, ' ') ?? 'cette page'

  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
        <Construction size={28} className="text-green-700" />
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-1 capitalize">{page}</h2>
      <p className="text-gray-500 text-sm max-w-xs">
        Cette section est en cours de développement. Elle sera disponible très prochainement.
      </p>
    </div>
  )
}
