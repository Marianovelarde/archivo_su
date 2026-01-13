import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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
          })
    })
})

export const { useGetAltasQuery, useCreateAltaMutation, useGetAltaByIdQuery } = altasApi;