import { configureStore } from '@reduxjs/toolkit'

import { altasApi } from './api/altasApi'
import { propietariosApi } from './api/propietariosApi'
import { destinoApi } from './api/destinoApi'
import { planoApi } from './api/planoApi'
import { authApi } from './api/authApi'
import { auditApi } from './api/auditApi'
import { adminApi } from './api/adminApi'
import authReducer from './api/authSlice'

export const store = configureStore({
  reducer: {
    [altasApi.reducerPath]: altasApi.reducer,
    [propietariosApi.reducerPath]: propietariosApi.reducer,
    [destinoApi.reducerPath]: destinoApi.reducer,
    [planoApi.reducerPath]: planoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [auditApi.reducerPath]: auditApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      altasApi.middleware,
      propietariosApi.middleware,
      destinoApi.middleware,
      planoApi.middleware,
      authApi.middleware,
      auditApi.middleware,
      adminApi.middleware
    ),
})
