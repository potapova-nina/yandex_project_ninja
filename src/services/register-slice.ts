import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserAuthAPI from '../api/auth.api';
import { IRegisterData, IRegisterResponse } from '../api/api.dto';

const initialState: IRegisterResponse = {
  success: false,
  user: {
    email: '',
    name: '',
  },
  accessToken: '',
  refreshToken: '',
};

export const fetchRegistration = createAsyncThunk(
  'registration',
  async (registerData: IRegisterData) => {
    const response = await UserAuthAPI.postRegisterRequest(registerData);

    return response;
  },
);

//
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {}, //сихрон
  extraReducers: (builder) => {
    // только если успешная загрузка fetchIngredients.fulfilled
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
  },
});

export default registerSlice.reducer;
