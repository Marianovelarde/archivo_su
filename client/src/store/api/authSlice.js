// store/api/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

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
      const { user, lastActivity } = action.payload || {}

      if (!user || typeof user.isAdmin !== 'boolean') {
        state.user = null
        state.isAuthenticated = false
        return
      }

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
      state.user = null
      state.isAuthenticated = false
      state.lastActivity = null
      state.sessionExpired = true
      localStorage.removeItem('auth')
    },

    logout: (state) => {
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
