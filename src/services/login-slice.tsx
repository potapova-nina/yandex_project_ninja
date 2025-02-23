import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserAuthAPI from '../api/auth.api';
import { ILoginData, ILoginResponse } from '../api/api.dto';

const initialState: ILoginResponse = {
  success: false,
  user: {
    email: '',
    name: '',
  },
  accessToken: '',
  refreshToken: '',
};

export const fetchLoginUser = createAsyncThunk(
  'loginUser',
  async (loginData: ILoginData) => {
    const response = await UserAuthAPI.postLoginRequest(loginData);
    localStorage.setItem('refreshToken', response?.refreshToken);
    return response;
  },
);

const registerSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {}, //сихрон
  extraReducers: (builder) => {
    // только если успешная загрузка fetchIngredients.fulfilled
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
  },
});

export default registerSlice.reducer;
