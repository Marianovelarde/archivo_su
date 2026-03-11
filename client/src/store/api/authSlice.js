// store/api/authSlice.js
import { MAX_IDLE_TIME } from './authConfig'
import { createSlice } from '@reduxjs/toolkit'


const persistedAuth = JSON.parse(localStorage.getItem('auth'))
const initialState = {
  user: persistedAuth?.user || null,
  token: persistedAuth?.token || null, 
  isAuthenticated: !!persistedAuth?.token,
  lastActivity: persistedAuth?.lastActivity || null,
  sessionExpired: false,
  isHydrated: false,
}
const authSlice = createSlice({
  name: 'auth',
initialState,
  reducers: {
setCredentials: (state, action) => {
  const { user, token } = action.payload
  state.user = user
  state.token = token
  state.isAuthenticated = true
  state.lastActivity = Date.now()
  state.sessionExpired = false
  localStorage.setItem(
    'auth',
    JSON.stringify({
     user: state.user,
    token: state.token,
    lastActivity: state.lastActivity,
    })
  )
},
restoreSession: (state, action) => {
  const { user, token } = action.payload || {}
  if (!user || !token) return

  state.user = user
  state.token = token
  state.isAuthenticated = true
  state.lastActivity = Date.now()
  state.sessionExpired = false
},


   updateActivity: (state) => {
  if (!state.isAuthenticated || !state.user) return
  state.lastActivity = Date.now()

  // Mantenemos los datos anteriores y solo actualizamos la actividad
  const currentAuth = JSON.parse(localStorage.getItem('auth') || '{}')
  localStorage.setItem(
    'auth',
    JSON.stringify({ 
      ...currentAuth, // <--- ESTO mantiene el token que ya estaba
      lastActivity: state.lastActivity 
    })
  )
},
    expireSession: (state) => {
        console.log('[AUTH] expireSession')

      state.user = null
      state.isAuthenticated = false
      state.lastActivity = null
      state.sessionExpired = true
      localStorage.removeItem('auth')
    },
logout: (state) => {
  state.user = null 
  state.token = null
  state.isAuthenticated = false
  state.lastActivity = null
   state.sessionExpired = false
  localStorage.removeItem('auth')
},
  },
})

export const {
  setCredentials,
  restoreSession,
  updateActivity,
  expireSession,
  logout,
} = authSlice.actions

export default authSlice.reducer
