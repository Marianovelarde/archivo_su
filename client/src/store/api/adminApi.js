import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'AdminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
tagTypes: ['Metrics'],
endpoints: (builder) => ({
    query: () => '/metrics',
   getMetrics: builder.query({
  query: () => '/metrics'
})
})

})


export const {
  useGetMetricsQuery
} = adminApi