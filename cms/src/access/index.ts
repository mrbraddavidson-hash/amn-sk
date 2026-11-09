import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === 'admin')
}

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  return Boolean(user && user.role === 'admin')
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return {
    id: {
      equals: user.id,
    },
  }
}

export const isMentor: Access = ({ req: { user } }) => {
  return Boolean(user && (user.role === 'mentor' || user.role === 'admin'))
}

export const isMentee: Access = ({ req: { user } }) => {
  return Boolean(user && (user.role === 'mentee' || user.role === 'admin'))
}
