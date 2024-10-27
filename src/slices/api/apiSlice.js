import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../constants"

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = JSON.parse(localStorage.getItem("auth"))?.accessToken
    if (accessToken) {
      headers.set("x-access-token", accessToken)
    }
    return headers
  },
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
})
