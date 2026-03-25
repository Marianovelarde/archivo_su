import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//redux toolkit query for admin api - 
// administra el estado de de la aplicacion y las llamadas a la api para el panel de admin

//createApi es una funcion de redux toolkit query que nos permite crear un slice de estado para manejar las llamadas a la api y el estado de la aplicacion relacionado con esa api

//reducerPath es el nombre del slice de estado que se va a crear

//baseQuery es la funcion que se va a usar para hacer las llamadas a la api, en este caso fetchBaseQuery que es una funcion que viene con redux toolkit query y nos permite hacer llamadas a la api de manera sencilla 

//tagTypes es un array de strings que nos permite definir los tipos de tags que vamos a usar para invalidar el cache de las llamadas a la api

//endpoints es una funcion que recibe un builder y nos permite definir los endpoints de la api, en este caso tenemos un endpoint query que hace una llamada a /metrics y devuelve los datos de las metricas

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