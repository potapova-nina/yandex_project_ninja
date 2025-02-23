import {
  BASE_URL,
  ILoginData,
  ILoginResponse,
  ILogoutData,
  ILogoutResponse,
  IRegisterData,
  IRegisterResponse,
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
  private postToken: string;
  private postLogout: string;

  constructor() {
    this.postRegister = '/auth/register'; //эндпоинт для регистрации пользователя.
    this.postLogin = '/auth/login'; //эндпоинт для авторизации.
    this.postToken = '/auth/token'; //эндпоинт обновления токена.
    this.postLogout = '/auth/logout'; //эндпоинт для выхода из системы.
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
    data: ILogoutData,
  ): Promise<ApiResponse<ILogoutResponse>> {
    return fetch(BASE_URL + this.postLogout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    }).then((response) => checkResponse<ILogoutResponse>(response));
  }
}

export default new UserAuthAPI();
