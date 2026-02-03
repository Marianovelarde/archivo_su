import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const auditApi = createApi({
  reducerPath: 'AuditApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  tagTypes: ['AuditLogs'],
  endpoints: (builder) => ({
    getAuditLogs: builder.query({
      query: () => '/audit',
      providesTags: ['AuditLogs'],
    }),
  }),
})

export const { useGetAuditLogsQuery } = auditApi
