import { IUser } from "../user/user.type";

export type LoginFormData = {
    email: string;
    password: string;
};

export type ForgetPasswordFormData = {
  email: string;
};

export type ResetPasswordFormData = {
  email: string;
  new_password_confirm: string;
  code: string;
  new_password: string;
};

export type ChangePasswordData = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export interface LoginResult {
    token: string;
    user: {
      id: string;
      email: string;
      username: string;
    };
  }

export interface AuthState {
    user: LoginResult['user'] | null;
    token: string | null;
  }


  export interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
  }