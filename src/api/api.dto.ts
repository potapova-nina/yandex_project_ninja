export const BASE_URL = 'https://norma.nomoreparties.space/api';

export interface IRegisterData {
  email: string;
  password: string;
  name: string;
}

export interface IRegisterResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  // accessToken: "Bearer ...",
  accessToken: string;
  refreshToken: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}

export interface IForgotAndResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface IResetPassword {
  password: string;
  token: string;
}
export interface IUpdateTokenData {
  token: string; //"значение refreshToken"
}

export interface IUpdateTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

//чтобы не было путаницы
export interface ILogoutData {
  token: string; //"значение refreshToken"
}

export interface ILogoutResponse {
  success: boolean;
  message: string;
}
