// auth.api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 // Assurez-vous que cette URL est correctement définie
import {
  AuthState,
  ForgetPasswordFormData,
  LoginFormData,
  LoginResult,
  ResetPasswordFormData,
  RegisterFormData,
} from "./auth.type";
const ApiBaseUrl = "http://0.0.0.0:8000";

export const AuthApi = createApi({
  reducerPath: "auth",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${ApiBaseUrl}/api/`,
  }),
  endpoints: (build) => ({
    // Enregistrement de l'utilisateur
    registerUser: build.mutation<
      AuthState["user"],
      RegisterFormData | FormData
    >({
      query: (data) => ({
        url: "users/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
      transformResponse: ({ data }) => data,
    }),
    // Connexion de l'utilisateur
    loginUser: build.mutation<LoginResult, LoginFormData>({
      query: (data) => ({
        url: "login/web/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    // Demande de réinitialisation du mot de passe
    forgetPassword: build.mutation<any, ForgetPasswordFormData>({
      query: (data) => ({
        url: `auth/request-password-reset/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    // Réinitialisation du mot de passe
    resetUserPassword: build.mutation<any, ResetPasswordFormData>({
      query: (data) => ({
        url: `auth/reset-password/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgetPasswordMutation,
  useResetUserPasswordMutation,
} = AuthApi;
