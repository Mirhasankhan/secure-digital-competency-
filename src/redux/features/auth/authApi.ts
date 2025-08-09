import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/create-account",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login-account",
        method: "POST",
        body: userInfo,
      }),
    }),
    activeUser: builder.query({
      query: (email) => ({
        url: `auth/current-user?email=${email}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/auth/update-user`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useActiveUserQuery,
  useUpdateUserMutation,
} = authApi;
