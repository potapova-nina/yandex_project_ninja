import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IWSResponse {
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export interface ProfileOrdersState extends IWSResponse {
  wsConnected: boolean;
  error?: Event;
}

//  Экшены
export const wsProfileOpen = createAction('WS_PROFILE_OPEN');
export const wsProfileClose = createAction('WS_PROFILE_CLOSE');
export const wsProfileError = createAction<Event>('WS_PROFILE_ERROR');
export const wsProfileMessage = createAction<IWSResponse>('WS_PROFILE_MESSAGE');

const initialState: ProfileOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wsProfileOpen, (state) => {
        state.wsConnected = true;
        state.error = undefined;
      })
      .addCase(wsProfileClose, (state) => {
        state.wsConnected = false;
      })
      .addCase(wsProfileError, (state, action: PayloadAction<Event>) => {
        state.error = action.payload;
      })
      .addCase(
        wsProfileMessage,
        (state, action: PayloadAction<IWSResponse>) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        },
      );
  },
});

export default profileOrdersSlice.reducer;
