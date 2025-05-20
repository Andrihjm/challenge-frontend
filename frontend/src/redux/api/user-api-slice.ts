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
  }),
});

export const { useSignupMutation, useSigninMutation, useSignoutMutation } =
  userApiSlice;
