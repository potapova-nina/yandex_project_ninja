import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import UserAuthAPI from '../api/auth.api';
import { ILoginData, ILoginResponse } from '../api/api.dto';
import { RootState } from './store';

const token = localStorage.getItem('accessToken');
const initialUser: ILoginResponse = token
  ? JSON.parse(localStorage.getItem('user') || 'null') || {
      success: false,
      user: {
        email: localStorage.getItem('email') || '',
        name: localStorage.getItem('name') || '',
      },
      accessToken: token,
      refreshToken: localStorage.getItem('refreshToken') || '',
    }
  : {
      success: false,
      user: { email: '', name: '' },
      accessToken: '',
      refreshToken: '',
    };

interface LoginState {
  user: ILoginResponse;
  // Для неавторизованных сразу считаем, что проверка завершена
  isAuthChecked: boolean;
}

const initialState: LoginState = {
  user: initialUser,
  isAuthChecked: true,
};

export const fetchLoginUser = createAsyncThunk(
  'loginUser',
  async (loginData: ILoginData) => {
    const response = await UserAuthAPI.postLoginRequest(loginData);
    localStorage.setItem('accessToken', response?.accessToken);
    localStorage.setItem('refreshToken', response?.refreshToken);
    localStorage.setItem('name', response?.user.name);
    localStorage.setItem('email', response?.user.email);
    return response;
  },
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<ILoginResponse>) => {
      state.user = action.payload;
      localStorage.setItem('email', action.payload.user.email);
      localStorage.setItem('name', action.payload.user.name);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    });
  },
});

export const { setIsAuthChecked, setUser } = loginSlice.actions;

// Определяем селекторы для доступа к состоянию
export const getIsAuthChecked = (state: RootState) => state.login.isAuthChecked;
export const getUser = (state: RootState) => state.login.user;

export default loginSlice.reducer;
