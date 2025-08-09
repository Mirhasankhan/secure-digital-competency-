import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://infinite-mart-server.vercel.app

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://infinite-mart-server.vercel.app/api/v1",
  }),
  tagTypes: ["products", "wishlist", "cart", "purchase", "users"],
  endpoints: () => ({}),
});
