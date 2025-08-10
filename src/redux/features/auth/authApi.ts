import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPendingUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users/pending",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create",
        method: "POST",
        body: userInfo,
      }),
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/users/resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    sendOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (info) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: info,
      }),
    }),
    resetPassword: builder.mutation({
      query: (newPass) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: newPass,
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
  useCreatePendingUserMutation,
  useLoginMutation,
  useSendOtpMutation,
  useResendOtpMutation,
  useVerifyUserMutation,
  useResetPasswordMutation,
  useActiveUserQuery,
  useUpdateUserMutation,
  useVerifyOtpMutation
} = authApi;
