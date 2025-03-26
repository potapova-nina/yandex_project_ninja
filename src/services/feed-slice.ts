// services/feed-slice.ts
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
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed(state, action: PayloadAction<FeedState>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const { setFeed } = feedSlice.actions;
export default feedSlice.reducer;
