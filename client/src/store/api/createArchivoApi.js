import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const planoArchivoApi = createApi({
  reducerPath: 'planoArchivoApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api/planoArchivo',

    prepareHeaders: (headers, { getState }) => {

      const token = getState().auth.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),

  endpoints: (builder) => ({

    getPlano: builder.query({

      query: (id) => ({
        url: `/ver/${id}`,
        responseHandler: async (response) => await response.blob()
      })

    })

  })
})

export const {
  useLazyGetPlanoQuery
} = planoArchivoApi