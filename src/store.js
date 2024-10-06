import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import { AuthApi } from '../src/utils/api/auth/auth.api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [AuthApi.reducerPath]: AuthApi.reducer, // Ajoutez le reducer de l'API Slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware), // Ajoutez le middleware de RTK-Query
});
