import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Definición de la API para Altas

// Aquí se definen los endpoints para obtener, crear, actualizar y buscar altas

// Cada endpoint se asocia con un hook que se puede usar en los componentes para interactuar con la API

// El endpoint de búsqueda se ha agregado para permitir filtrar altas por diferentes criterios

// La función `searchAltas` construye una URL con los parámetros de búsqueda y devuelve los resultados filtrados

// Además, se han agregado endpoints para obtener destinos y planos, que pueden ser útiles para la creación y edición de altas

// La función `updateAlta` permite actualizar una alta existente, invalidando la caché de altas para asegurar que los datos estén actualizados en la interfaz de usuario

export const altasApi = createApi({
  reducerPath: 'AltasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Altas'],
  endpoints: (builder) => ({
    getAltas: builder.query({
      query: () => '/altas',
      providesTags: ['Altas']
    }),

    createAlta: builder.mutation({
      query: (formData) => ({
        url: '/altas',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['Altas']
    }),

   getAltaById: builder.query({
  query: (id) => `/altas/${id}`,
  providesTags: (result, error, id) => [{ type: 'Altas', id }]
}),

    //  SEARCH
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
updateAlta: builder.mutation({
  query: ({ id, body }) => ({
    url: `/altas/editar/${id}`,
    method: 'PUT',
    body
  }),
  invalidatesTags: ['Altas']
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
    useGetPlanosQuery,
    useUpdateAltaMutation,   
} = altasApi;
