import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const destinoApi = createApi({
  reducerPath: 'destinoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  tagTypes: ['Destino'],
  endpoints: (builder) => ({
    getDestinos: builder.query({
      query: () => '/destino',
      providesTags: ['Destino'],
    }),
    createDestino: builder.mutation({
      query: (body) => ({
        url: '/destino/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Destino'],
    }),
  }),
})

export const {
  useGetDestinosQuery,
  useCreateDestinoMutation,
} = destinoApi
