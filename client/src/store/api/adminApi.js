import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'AdminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
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