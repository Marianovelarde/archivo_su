import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


/// API para autenticación y gestión de usuarios

//createApi es una función de RTK Query que nos permite definir un conjunto de endpoints relacionados con la autenticación y gestión de usuarios.

//reducerPath: 'authApi' define el nombre del slice de Redux donde se almacenarán los datos relacionados con esta API.

//baseQuery: fetchBaseQuery({ baseUrl: '/api/user' }) establece la URL base para todas las solicitudes a esta API. En este caso, todas las solicitudes se harán a rutas que comienzan con /api/user.

//token en prepareHeaders: (headers, { getState }) => { ... } es una función que se ejecuta antes de cada solicitud para agregar el token de autenticación a los encabezados si está disponible en el estado de Redux.

// endpoints: (builder) => ({ ... }) define los diferentes endpoints de la API, como login, createUser, getUsers, updateUserRole, toggleUserActive y updatePassword. Cada endpoint especifica cómo se debe realizar la solicitud (método HTTP, URL, cuerpo, etc.) y qué tags invalidar o proporcionar para la gestión de caché.

// Finalmente, se exportan los hooks generados automáticamente por RTK Query para cada endpoint, como useLoginMutation, useGetUsersQuery, etc., que se pueden usar en los componentes de React para interactuar con la API de autenticación y gestión de usuarios.

//mutation se utiliza para endpoints que realizan operaciones de escritura (como POST, PUT, DELETE), mientras que query se utiliza para endpoints que realizan operaciones de lectura (como GET).

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/user',
prepareHeaders: (headers, { getState }) => {
  const state = getState()

  const token = state.auth?.token 

  if (token) {
    headers.set('authorization', `Bearer ${token}`)
    console.log('')
  } else {
    console.log('')
  }

  return headers
}


  }), 
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    createUser: builder.mutation({
  query: (body) => ({
    url: '/signup',
    method: 'POST',
    body,
  }),
  invalidatesTags: ['Users'],
}),
    // ===== ADMIN =====

    // LISTAR USUARIOS
    getUsers: builder.query({
      query: () => '/',
      providesTags: ['Users'],
    }),

    // CAMBIAR ROL
   updateUserRole: builder.mutation({
  query: ({ id_user, role }) => ({
    url: `/role/${id_user}`,
    method: 'PUT',
    body: { role },
  }),
  invalidatesTags: ['Users'],
}),

    // ACTIVAR / DESACTIVAR
    toggleUserActive: builder.mutation({
      query: ({ id_user, isActived }) => ({
        url: `/${id_user}`,
        method: 'PUT',
        body: { isActived },
      }),
      invalidatesTags: ['Users'],
    }),
    // Cambiar de contraseña
    updatePassword: builder.mutation({
      query: ({ id_user, contraseña }) => ({
        url: `/edit/${id_user}`,
        method: 'PUT',
        body: { contraseña },
      }),
    }),
    
  }),
})

export const {
  useLoginMutation,
  useUpdatePasswordMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserActiveMutation,
    useCreateUserMutation, 
} = authApi
