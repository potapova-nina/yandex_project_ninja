import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ingredientService from '../api/burger-ingredients.api';

type OrderState = {
  orderNumber: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';

};

// Начальное состояние
const initialState: OrderState = {
  orderNumber: null,
  status: 'idle',
};

// Асинхронный экшен для создания заказа
export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredients: string[]) => {
 
      const response = await ingredientService.postCreateOrder( ingredients );
      return response; // Вернёт { name, order: { number }, success }

    
  }
);

// Создаём срез
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderNumber = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state,action) => {
        state.status = 'succeeded';
        state.orderNumber = action.payload.order.number;   
      })
     
  },
});

// Экспортируем действия
export const { resetOrder } = orderSlice.actions;

// Экспортируем редьюсер
export default orderSlice.reducer;
