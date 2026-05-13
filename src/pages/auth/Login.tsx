import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Leaf } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    if (error) {
      setError('Email ou mot de passe incorrect.')
    } else {
      navigate('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Panel gauche */}
      <div className="hidden lg:flex w-1/2 bg-green-900 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-green-600 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-400 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <img src="/logo.png" alt="KFK" className="h-16 w-16 object-contain bg-white rounded-full p-1" />
            <div className="text-left">
              <h1 className="text-white text-3xl font-bold">KFK</h1>
              <p className="text-green-400 text-lg">Agrobusiness</p>
            </div>
          </div>
          <p className="text-green-200 text-lg leading-relaxed max-w-sm">
            Votre espace partenaire pour suivre vos projets agricoles, gérer vos demandes et accéder à vos documents.
          </p>
          <div className="mt-10 flex items-center justify-center gap-2 text-green-400">
            <Leaf size={16} />
            <span className="text-sm">Agriculture durable & responsable</span>
          </div>
        </div>
      </div>

      {/* Panel droite */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="KFK" className="h-10 w-10 rounded-full bg-green-900 p-1" />
            <div>
              <p className="font-bold text-gray-800">KFK Agrobusiness</p>
              <p className="text-xs text-gray-500">Espace membre</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Connexion</h2>
          <p className="text-gray-500 text-sm mb-7">Accédez à votre espace partenaire</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Pas encore de compte ?{' '}
            <Link to="/auth/register" className="text-green-700 font-medium hover:underline">
              Créer un compte
            </Link>
          </p>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-600">
              ← Retour au site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
