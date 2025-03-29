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

interface FeedState {
  orders: IOrder[];
  total: number;
  totalToday: number;
  wsConnected: boolean;
  error: Event | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsInit: (_, action: PayloadAction<string>) => {},
    wsClose: () => {},

    onOpen: (state) => {
      state.wsConnected = true;
      state.error = null;
    },
    onError: (state, action: PayloadAction<Event>) => {
      state.error = action.payload;
    },
    onClose: (state) => {
      state.wsConnected = false;
    },
    onMessage: (state, action: PayloadAction<string>) => {
      const data = JSON.parse(action.payload);
      if (data.success) {
        state.orders = data.orders;
        state.total = data.total;
        state.totalToday = data.totalToday;
      }
    },
  },
});

export const { wsInit, wsClose, onOpen, onError, onClose, onMessage } =
  feedSlice.actions;

export default feedSlice.reducer;
