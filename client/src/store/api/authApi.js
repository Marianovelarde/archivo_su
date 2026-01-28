import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/user',
prepareHeaders: (headers, { getState }) => {
  const state = getState()

  const token = state.auth?.token 

  if (token) {
    headers.set('authorization', `Bearer ${token}`)
    console.log('[API] Token aplicado al header')
  } else {
    console.log('[API] No hay token (esto es normal en el login)')
  }

  return headers
}

  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Cambiar de contraseña
    updatePassword: builder.mutation({
      query: ({ id_user, contraseña }) => ({
        url: `/${id_user}`,
        method: 'PUT',
        body: { contraseña },
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useUpdatePasswordMutation,
} = authApi
