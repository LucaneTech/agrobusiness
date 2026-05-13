import { useState, FormEvent } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function Parametres() {
  const { user } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwdLoading, setPwdLoading] = useState(false)
  const [pwdError, setPwdError] = useState('')
  const [pwdSuccess, setPwdSuccess] = useState(false)

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault()
    setPwdError('')
    setPwdSuccess(false)
    if (newPassword !== confirmPassword) return setPwdError('Les mots de passe ne correspondent pas.')
    if (newPassword.length < 6) return setPwdError('Le mot de passe doit contenir au moins 6 caractères.')
    setPwdLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPwdError(error.message)
    } else {
      setPwdSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
    setPwdLoading(false)
  }

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Paramètres du compte</h2>

      {/* Info compte */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Informations du compte</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex gap-4">
            <dt className="text-gray-500 w-28 shrink-0">Email</dt>
            <dd className="text-gray-800 font-medium">{user?.email}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="text-gray-500 w-28 shrink-0">Membre depuis</dt>
            <dd className="text-gray-800">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                : '—'}
            </dd>
          </div>
          <div className="flex gap-4">
            <dt className="text-gray-500 w-28 shrink-0">ID</dt>
            <dd className="text-gray-400 text-xs font-mono truncate">{user?.id}</dd>
          </div>
        </dl>
      </div>

      {/* Changement mot de passe */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Changer le mot de passe</h3>

        {pwdError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{pwdError}</div>
        )}
        {pwdSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            Mot de passe mis à jour avec succès.
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Minimum 6 caractères"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={pwdLoading}
            className="bg-green-700 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm disabled:opacity-60"
          >
            {pwdLoading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
          </button>
        </form>
      </div>

      {/* Zone danger */}
      <div className="bg-white rounded-xl shadow-sm border border-red-100 p-5">
        <h3 className="font-semibold text-red-600 mb-2">Zone de danger</h3>
        <p className="text-gray-500 text-sm mb-4">
          La suppression de votre compte est définitive et irréversible. Toutes vos données seront effacées.
        </p>
        <button
          onClick={() => alert('Veuillez contacter l\'administrateur pour supprimer votre compte.')}
          className="text-sm text-red-600 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Demander la suppression du compte
        </button>
      </div>
    </div>
  )
}
