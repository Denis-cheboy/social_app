import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://social-app-api-et09.onrender.com"
    }),
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:"/auth/login",
                method:"POST",
                body:{...data}
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                method:"POST",
                url:"/auth/register",
                body:{...data}
            })
        })
    })
})

export const {useLoginMutation,useRegisterMutation}=apiSlice
export default apiSlice