import { configureStore } from '@reduxjs/toolkit'

import { altasApi } from './api/altasApi'
import { propietariosApi } from './api/propietariosApi'
import { destinoApi } from './api/destinoApi'
import { planoApi } from './api/planoApi'

export const store = configureStore({
  reducer: {
    [altasApi.reducerPath]: altasApi.reducer,
    [propietariosApi.reducerPath]: propietariosApi.reducer,
    [destinoApi.reducerPath]: destinoApi.reducer,
    [planoApi.reducerPath]: planoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      altasApi.middleware,
      propietariosApi.middleware,
      destinoApi.middleware,
      planoApi.middleware
    ),
})
