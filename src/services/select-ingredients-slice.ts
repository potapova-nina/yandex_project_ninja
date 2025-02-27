import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBurgerIngredient } from '../components/burger-ingredients/dto';

interface SelectedIngredientState {
  selectedIngredient: IBurgerIngredient | null;
}

const initialState: SelectedIngredientState = {
  selectedIngredient: null,
};
//
const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  reducers: {
    selectIngedient: (state, action: PayloadAction<IBurgerIngredient>) => {
      state.selectedIngredient = action.payload;
    },
    clearSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export const { selectIngedient, clearSelectedIngredient } =
  selectedIngredientSlice.actions;
export default selectedIngredientSlice.reducer;
