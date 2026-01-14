import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const propietariosApi = createApi({
  reducerPath: 'propietariosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  tagTypes: ['Propietarios'],
  endpoints: (builder) => ({
    getPropietarios: builder.query({
      query: () => '/propietarios',
      providesTags: ['Propietarios'],
    }),
    createPropietario: builder.mutation({
      query: (body) => ({
        url: '/propietarios',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Propietarios'],
    }),
  }),
})

export const {
  useGetPropietariosQuery,
  useCreatePropietarioMutation,
} = propietariosApi
