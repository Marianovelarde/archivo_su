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
  query: (filters) => {
    const queryParams = new URLSearchParams(filters).toString()
    return `/search?${queryParams}`
  }
}),
getDestinos: builder.query({
  query: () => '/destino'
}),

getPlanos: builder.query({
  query: () => '/planos'
}),
  })
})

export const {
  useGetAltasQuery,
  useCreateAltaMutation,
  useGetAltaByIdQuery,
  useSearchAltasQuery,   // 👈 nuevo hook
  useLazySearchAltasQuery,
   useGetDestinosQuery,
    useGetPlanosQuery   
} = altasApi;
