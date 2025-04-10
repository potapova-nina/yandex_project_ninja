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

export interface UserFeedState {
  orders: IOrder[];
  wsConnected: boolean;
  error: Event | null;
}

const initialState: UserFeedState = {
  orders: [],
  wsConnected: false,
  error: null,
};

const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {
    wsUserInit: (_, __: PayloadAction<string>) => {},
    wsUserClose: () => {},
    wsUserOpen: (state) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsUserError: (state, action: PayloadAction<Event>) => {
      state.error = action.payload;
    },
    wsUserClosed: (state) => {
      state.wsConnected = false;
    },
    wsUserMessage: (state, action: PayloadAction<string>) => {
      const data = JSON.parse(action.payload);
      if (data.success) {
        state.orders = data.orders;
      }
    },
  },
});

export const {
  wsUserInit,
  wsUserClose,
  wsUserOpen,
  wsUserError,
  wsUserClosed,
  wsUserMessage,
} = userFeedSlice.actions;

export default userFeedSlice.reducer;
