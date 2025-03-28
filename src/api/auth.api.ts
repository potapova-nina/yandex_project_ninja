import {
  BASE_URL,
  IDataUserResponse,
  IForgotAndResetPasswordResponse,
  ILoginData,
  ILoginResponse,
  ILogoutResponse,
  IRegisterData,
  IRegisterResponse,
  IResetPassword,
  IUpdateTokenData,
  IUpdateTokenResponse,
} from './api.dto';

type ApiResponse<T> = T;

const checkResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return response.json(); // Если всё ок, парсим JSON
  }
  // Если ошибка, парсим ответ и возвращаем Promise.reject
  const error = await response.json();
  return Promise.reject(error);
};

class UserAuthAPI {
  private postRegister: string;
  private postLogin: string;
  private postForgotPassword: string;
  private postResetPassword: string;
  private postToken: string;
  private postLogout: string;
  private getDataUser: string;

  constructor() {
    this.postRegister = '/auth/register'; //эндпоинт для регистрации пользователя.
    this.postLogin = '/auth/login'; //эндпоинт для авторизации.
    this.postForgotPassword = '/password-reset'; //эндпоинт для авторизации.
    this.postResetPassword = '/password-reset/reset'; //эндпоинт для авторизации.
    this.postToken = '/auth/token'; //эндпоинт обновления токена.
    this.postLogout = '/auth/logout'; //эндпоинт для выхода из системы.
    this.getDataUser = '/auth/user'; //эндпоинт для получения данных о пользователе.
  }

  async postRegisterRequest(
    data: IRegisterData,
  ): Promise<ApiResponse<IRegisterResponse>> {
    return fetch(BASE_URL + this.postRegister, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    }).then((response) => checkResponse<IRegisterResponse>(response));
  }

  async postLoginRequest(
    data: ILoginData,
  ): Promise<ApiResponse<ILoginResponse>> {
    return fetch(BASE_URL + this.postLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    }).then((response) => checkResponse<ILoginResponse>(response));
  }

  async postForgotPasswordRequest(
    email: string,
  ): Promise<ApiResponse<IForgotAndResetPasswordResponse>> {
    return fetch(BASE_URL + this.postForgotPassword, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then((response) =>
      checkResponse<IForgotAndResetPasswordResponse>(response),
    );
  }

  async postResetPasswordRequest(
    data: IResetPassword,
  ): Promise<ApiResponse<IForgotAndResetPasswordResponse>> {
    return fetch(BASE_URL + this.postResetPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    }).then((response) =>
      checkResponse<IForgotAndResetPasswordResponse>(response),
    );
  }

  async postUpdateTokenRequest(
    data: IUpdateTokenData,
  ): Promise<ApiResponse<IUpdateTokenResponse>> {
    return fetch(BASE_URL + this.postToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    }).then((response) => checkResponse<IUpdateTokenResponse>(response));
  }

  async postLogoutRequest(
    token: string, //refreshToken
  ): Promise<ApiResponse<ILogoutResponse>> {
    return fetch(BASE_URL + this.postLogout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }).then((response) => checkResponse<ILogoutResponse>(response));
  }
  async getDataAboutUser(
    token: string,
  ): Promise<ApiResponse<IDataUserResponse>> {
    const response = await fetch(BASE_URL + this.getDataUser, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    return checkResponse<IDataUserResponse>(response);
  }

  async updateDataAboutUser(
    token: string,
    data: {
      name: string;
      email: string;
    },
  ): Promise<ApiResponse<IDataUserResponse>> {
    const response = await fetch(BASE_URL + this.getDataUser, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        ...data,
      }), // Отправляем обновлённые данные
    });

    return checkResponse<IDataUserResponse>(response);
  }
}

export default new UserAuthAPI();
