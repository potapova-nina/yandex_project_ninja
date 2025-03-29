import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

interface IWSResponse {
  orders: IOrder[];
  total: number;
  totalToday: number;
}

interface ProfileOrdersState extends IWSResponse {
  wsConnected: boolean;
  error?: Event;
}

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
      .addCase('WS_PROFILE_OPEN', (state) => {
        state.wsConnected = true;
        state.error = undefined;
      })
      .addCase('WS_PROFILE_CLOSE', (state) => {
        state.wsConnected = false;
      })
      .addCase('WS_PROFILE_ERROR', (state, action: PayloadAction<Event>) => {
        state.error = action.payload;
      })
      .addCase(
        'WS_PROFILE_MESSAGE',
        (state, action: PayloadAction<IWSResponse>) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        },
      );
  },
});

export default profileOrdersSlice.reducer;
