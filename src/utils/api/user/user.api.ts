import { IUser } from "./user.type";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getToken } from './tokenService';
// Définir l'API utilisateur
export const UserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/', 
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser, string>({
      query: (id) => `/user/${id}`,
    }),
    getUsers: builder.query<IUser[], void>({
      query: () => '/users/',
    }),
    createUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: '/user',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/user/${user.id}`,
        method: 'PUT',
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
    }),
    loginUser: builder.mutation<IUser, { email: string, password: string }>({
        query: (body) => ({
            url: '/login/',
            method: 'POST',
            body,
        }),
        }),
    
  }),
});

// Exporter les hooks auto-générés pour les endpoints
export const {
  useGetUserQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserApi;
