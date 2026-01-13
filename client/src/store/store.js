import { configureStore } from '@reduxjs/toolkit'
import { altasApi } from '../store/api/AltasApi'

export const store = configureStore({
  reducer: {
    [altasApi.reducerPath]: altasApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(altasApi.middleware),
})
