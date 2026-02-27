import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const propietariosApi = createApi({
  reducerPath: 'propietariosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.7:3001/api',
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
