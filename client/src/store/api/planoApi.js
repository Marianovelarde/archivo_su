import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const planoApi = createApi({
  reducerPath: 'planoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Plano'],
  endpoints: (builder) => ({
    getPlanos: builder.query({
      query: () => '/planos',
      providesTags: ['Plano'],
    }),
    createPlano: builder.mutation({
      query: (body) => ({
        url: '/planos/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Plano'],
    }),
  }),
})

export const {
  useGetPlanosQuery,
  useCreatePlanoMutation,
} = planoApi
