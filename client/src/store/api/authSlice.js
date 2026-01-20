// store/api/authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { MAX_IDLE_TIME } from './authConfig'



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    lastActivity: null,
    sessionExpired: false,
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
  const { user, lastActivity } = action.payload

  if (!user || !lastActivity) {
    console.log('[AUTH] restoreSession → payload inválido')
    state.user = null
    state.isAuthenticated = false
    state.lastActivity = null
    state.sessionExpired = false
    return
  }

  if (Date.now() - lastActivity > MAX_IDLE_TIME) {
    console.log('[AUTH] restoreSession → EXPIRADA')
    state.user = null
    state.isAuthenticated = false
    state.lastActivity = null
    state.sessionExpired = true
    localStorage.removeItem('auth')
    return
  }

  console.log('[AUTH] restoreSession → OK')
  state.user = user
  state.lastActivity = lastActivity
  state.isAuthenticated = true
  state.sessionExpired = false
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
