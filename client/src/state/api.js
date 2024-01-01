import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  reducerPath: "analytics",
  tagTypes: ["Accountsopened", "Home"],
  endpoints: (build) => ({
    getAccountsopened: build.query({
      query: () => `/accountsopened`,
      providesTags: ["Accountsopened"],
    }),
  }),
});

export const { useGetAccountsopenedQuery, } = api;
