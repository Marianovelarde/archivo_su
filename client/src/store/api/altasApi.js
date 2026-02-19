import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const altasApi = createApi({
  reducerPath: 'AltasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  tagTypes: ['Altas'],
  endpoints: (builder) => ({
    getAltas: builder.query({
      query: () => '/altas',
      providesTags: ['Altas']
    }),

    createAlta: builder.mutation({
      query: (body) => ({
        url: '/altas',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Altas']
    }),

    getAltaById: builder.query({
      query: (id) => `/altas/${id}`,
    }),

    // 🔎 NUEVO SEARCH
  searchAltas: builder.query({
  query: (filters) => ({
    url: '/search',
    params: filters
  }),
})
  })
})

export const {
  useGetAltasQuery,
  useCreateAltaMutation,
  useGetAltaByIdQuery,
  useSearchAltasQuery,   // 👈 nuevo hook
  useLazySearchAltasQuery   
} = altasApi;
