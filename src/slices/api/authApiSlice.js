import { apiSlice } from "./apiSlice"
import { AUTH_URL } from "../../constants"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/signout`,
        method: "POST",
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `${AUTH_URL}/change-password`,
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "POST",
        body,
      }),
      params: (body) => ({
        id: body.id,
        token: body.token,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
} = authApiSlice
