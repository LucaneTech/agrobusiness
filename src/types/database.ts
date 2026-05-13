export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: string
  phone: string | null
  location: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export interface Demande {
  id: string
  user_id: string
  titre: string
  description: string | null
  statut: 'En cours' | 'En attente' | 'Approuvé' | 'Rejeté'
  type: string | null
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string | null
  recipient_id: string
  subject: string | null
  content: string
  lu: boolean
  sender_name: string | null
  sender_avatar: string | null
  created_at: string
}

export interface Document {
  id: string
  user_id: string
  nom: string
  type: string | null
  url: string | null
  taille: string | null
  created_at: string
}

export interface Projet {
  id: string
  titre: string
  description: string | null
  image_url: string | null
  progression: number
  statut: string
  created_at: string
}

export interface ProjetSuivi {
  id: string
  user_id: string
  projet_id: string
  created_at: string
  projets?: Projet
}
