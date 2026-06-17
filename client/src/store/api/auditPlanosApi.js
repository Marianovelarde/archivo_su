import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const auditPlanosApi = createApi({
  reducerPath: 'auditPlanosApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auditoria',

    prepareHeaders: (headers, { getState }) => {

      const token = getState().auth.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),

  endpoints: (builder) => ({

    getAuditoriaPlanos: builder.query({
      query: () => '/'
    })

  })
})

export const {
  useGetAuditoriaPlanosQuery
} = auditPlanosApi