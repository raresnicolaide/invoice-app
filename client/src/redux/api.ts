import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "./store"

export interface IUser {
  id: number
  name: string
  email: string
}

export interface IUserResponse {
  user: IUser
  token: string
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface IInvoiceResponse {
  id: number
  amount: number
  due_date: string
  description: string
  user_id: number
  user: {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
  }
  created_at: string
  updated_at: string
}

export interface IInvoiceRequest {
  invoiceId: number
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      console.log(getState())

      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IUserResponse, ILoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getAllInvoices: builder.query<IInvoiceResponse[], void>({
      query: () => "invoices",
    }),
    getInvoice: builder.query<IInvoiceResponse, IInvoiceRequest>({
      query: ({ invoiceId }) => `invoices/${invoiceId}`,
    }),
  }),
})

export const { useLoginMutation, useGetAllInvoicesQuery, useGetInvoiceQuery } =
  api
