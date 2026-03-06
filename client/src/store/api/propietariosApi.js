import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const propietariosApi = createApi({
  reducerPath: 'propietariosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
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
    editPropietario: builder.mutation({
  query: ({ id, body }) => ({
    url: `/propietarios/edit/${id}`,
    method: 'PUT',
    body,
  }),
  invalidatesTags: ['Propietarios'],
}),
  }),
  
})

export const {
  useGetPropietariosQuery,
  useCreatePropietarioMutation,
  useEditPropietarioMutation
} = propietariosApi
