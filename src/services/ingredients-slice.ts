import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBurgerIngredient } from '../components/burger-ingredients/dto';
import IngredientAPI from '../api/burger-ingredients.api';

interface IngredientsState {
  list: IBurgerIngredient[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
const initialState: IngredientsState = {
  list: [],
  status: 'idle',
};

//ассинхронно подргружаем данные - ACTION
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => {
    const response = await IngredientAPI.getIngredients();
    return response.data;
  },
);

//
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
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
