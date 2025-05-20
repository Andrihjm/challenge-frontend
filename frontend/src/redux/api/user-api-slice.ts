import { USERS_URL } from "../constants";
import { apiSlice } from "./api-slice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/sign-up`,
        method: "POST",
        body: data,
      }),
    }),

    signin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/sign-in`,
        method: "POST",
        body: data,
      }),
    }),

    signout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/sign-out`,
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      unknown,
      { token: string; password: string }
    >({
      query: ({ token, password }) => ({
        url: `/reset-password/${token}`,
        method: "POST",
        body: { password },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApiSlice;
