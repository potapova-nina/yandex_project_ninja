import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { IBurgerIngredient } from '../components/burger-ingredients/dto';

export interface ConstructorIngredient extends IBurgerIngredient {
  constructorId: string;
}

interface ConstructorState {
  bun: IBurgerIngredient | null;
  ingredients: ConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
        if (!state.ingredients) {
          state.ingredients = [];
        }
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: IBurgerIngredient) => {
        return {
          payload: { ...ingredient, constructorId: nanoid() },
        };
      },
    },
    setBun: (state, action: PayloadAction<IBurgerIngredient>) => {
      return {
        ...state,
        bun: action.payload,
      };
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ing) => ing.constructorId !== action.payload,
        ),
      };
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
  },
});

export const { addIngredient, setBun, removeIngredient, moveIngredient } =
  constructorSlice.actions;
export default constructorSlice.reducer;
