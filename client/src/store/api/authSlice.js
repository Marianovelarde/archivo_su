// store/api/authSlice.js
import { MAX_IDLE_TIME } from './authConfig'
import { createSlice } from '@reduxjs/toolkit'



const authSlice = createSlice({
  name: 'auth',
initialState: {
  user: null,
  isAuthenticated: false,
  lastActivity: null,
  sessionExpired: false,
  isHydrated: false, // 👈 CLAVE
},

  reducers: {
    setCredentials: (state, action) => {

      const { user } = action.payload
  console.log('[AUTH] setCredentials')
      state.user = user
      state.isAuthenticated = true
      state.lastActivity = Date.now()
      state.sessionExpired = false

      localStorage.setItem(
        'auth',
        JSON.stringify({
          user,
          lastActivity: state.lastActivity,
        })
      )
    },


restoreSession: (state, action) => {
  const { user } = action.payload || {}

  if (!user) return

  state.user = user
  state.isAuthenticated = true
  state.sessionExpired = false

  // 🔥 CLAVE: refresh = actividad
  state.lastActivity = Date.now()

  localStorage.setItem(
    'auth',
    JSON.stringify({
      user,
      lastActivity: state.lastActivity,
    })
  )
},


    updateActivity: (state) => {
      if (!state.isAuthenticated || !state.user) return

      state.lastActivity = Date.now()

      localStorage.setItem(
        'auth',
        JSON.stringify({
          user: state.user,
          lastActivity: state.lastActivity,
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
       console.log('[AUTH] logout')
      state.user = null
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
