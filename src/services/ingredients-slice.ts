import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBurgerIngredient } from '../components/burger-ingredients/dto';
import ingredientService from '../api/burger-ingredients.api';

//ассинхронно подргружаем данные - ACTION
export const fetchIngredients = createAsyncThunk('ingredients/fetch', async () => {
  const response = await ingredientService.getIngredients();
  return response.data;
});

//
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: { list: [] as IBurgerIngredient[], status: 'idle' },
  reducers: {}, //сихрон
  extraReducers: (builder) => {
    // только если успешная загрузка fetchIngredients.fulfilled
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.list = action.payload; //массив данных 
      state.status = 'succeeded'; //статус
    });
  },

});


export default ingredientsSlice.reducer;
