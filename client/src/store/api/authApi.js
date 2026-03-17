import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
