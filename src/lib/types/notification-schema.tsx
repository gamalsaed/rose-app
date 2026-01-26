export interface Root {
  message: string
  metadata: Metadata
  notifications: Notification[]
}

export interface Metadata {
  currentPage: number
  totalPages: number
  limit: number
  totalItems: number
  unreadCount: number
}

export interface NotificationType {
  _id: string
  recipient: string
  title: string
  body: string
  type: string
  priority: string
  isRead: boolean
  actionLink: string
  relatedId: string
  relatedModel: string
  createdAt: string
  updatedAt: string
  expiresAt: string
  __v: number
}
