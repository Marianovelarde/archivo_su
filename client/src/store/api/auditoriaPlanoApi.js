import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const auditoriaPlanoApi = createApi({

    reducerPath:'auditoriaPlanoApi',

    baseQuery: fetchBaseQuery({

        baseUrl:'/api/auditoriaPlanos',

        prepareHeaders:(headers,{getState})=>{

            const token = getState().auth.token

            if(token){

                headers.set(
                    'authorization',
                    `Bearer ${token}`
                )

            }

            return headers

        }

    }),

    endpoints:(builder)=>({

        getAuditorias: builder.query({

            query: ()=>''

        })

    })

})

export const {
    useGetAuditoriasQuery
} = auditoriaPlanoApi