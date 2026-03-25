export const canAccessPanel = (user) => {
  return user?.role === 'super_admin'
}

export const canCreateAlta = (user) => {
  return ['super_admin', 'editor'].includes(user?.role)
}

export const canEditAlta = (user) => {
  return ['super_admin', 'editor'].includes(user?.role)
}

export const canViewExpediente = (user) => {
  return ['super_admin', 'editor', 'visor'].includes(user?.role)
}
export const canViewPlanos = (user) => {
  return ['super_admin', 'editor', 'visor'].includes(user?.role)
}
export const canOnlyFilter = (user) => {
  return user?.role === 'consulta'
}