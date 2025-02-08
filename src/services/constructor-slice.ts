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

// import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
// import { IBurgerIngredient } from '../components/burger-ingredients/dto';

// export interface ConstructorIngredient extends IBurgerIngredient {
//   constructorId: string;
// }

// interface ConstructorState {
//   bun: IBurgerIngredient | null;
//   ingredients: ConstructorIngredient[];
// }

// const initialState: ConstructorState = {
//   bun: null,
//   ingredients: [],
// };

// const constructorSlice = createSlice({
//   name: 'constructor',
//   initialState,
//   reducers: {
//     addIngredient: (state, action: PayloadAction<IBurgerIngredient>) => {
//       if (!state.ingredients) {
//         state.ingredients = [];
//       }
//       if (action.payload.type !== 'bun') {
//         const newIngredient: ConstructorIngredient = {
//           ...action.payload,
//           constructorId: nanoid(),
//         };
//         state.ingredients.push(newIngredient);
//       }
//     },
//     setBun: (state, action: PayloadAction<IBurgerIngredient>) => {
//       return {
//         ...state,
//         bun: action.payload,
//       };
//     },
//     removeIngredient: (state, action: PayloadAction<string>) => {
//       return {
//         ...state,
//         ingredients: state.ingredients.filter(
//           (ing) => ing.constructorId !== action.payload,
//         ),
//       };
//     },

//     moveIngredient: (
//       state,
//       action: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
//     ) => {
//       const { dragIndex, hoverIndex } = action.payload;
//       // Берём перемещаемый элемент
//       const draggedItem = state.ingredients[dragIndex];
//       // Удаляем его из текущей позиции
//       state.ingredients.splice(dragIndex, 1);
//       // Вставляем на новую позицию
//       state.ingredients.splice(hoverIndex, 0, draggedItem);
//     },
//   },
// });

// export const { addIngredient, setBun, removeIngredient, moveIngredient } =
//   constructorSlice.actions;
// export default constructorSlice.reducer;

/////////ХУЙ

// import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
// import { IBurgerIngredient } from '../components/burger-ingredients/dto';

// export interface ConstructorIngredient extends IBurgerIngredient {
//   constructorId: string;
// }

// interface ConstructorState {
//   bun: IBurgerIngredient | null;
//   ingredients: ConstructorIngredient[];
// }

// const initialState: ConstructorState = {
//   bun: null,
//   ingredients: [],
// };

// const constructorSlice = createSlice({
//   name: 'constructor',
//   initialState,
//   reducers: {
//     addIngredient222: (state, action: PayloadAction<IBurgerIngredient>) => {
//       if (action.payload.type !== 'bun') {
//         const newIngredient: ConstructorIngredient = {
//           ...action.payload,
//           constructorId: nanoid(),
//         };
//         state.ingredients.push(newIngredient);
//       }
//     },

//     addIngredient: {
//       reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
//         if (!state.ingredients) {
//           state.ingredients = [];
//         }

//         if (action.payload.type !== 'bun') {
//           state.ingredients.push(action.payload);
//         }
//       },
//       prepare: (ingredient: IBurgerIngredient) => {
//         return {
//           payload: {
//             ...ingredient,
//             constructorId: nanoid(),
//           },
//         };
//       },
//     },

//     setBun: (state, action: PayloadAction<IBurgerIngredient>) => {
//       state.bun = action.payload;
//     },
//     removeIngredient: (state, action: PayloadAction<string>) => {
//       state.ingredients = state.ingredients.filter(
//         (ing) => ing.constructorId !== action.payload,
//       );
//     },
//     moveIngredient: (
//       state,
//       action: PayloadAction<{ dragIndex: number; hoverIndex: number }>,
//     ) => {
//       const { dragIndex, hoverIndex } = action.payload;
//       const draggedItem = state.ingredients[dragIndex];
//       state.ingredients.splice(dragIndex, 1);
//       state.ingredients.splice(hoverIndex, 0, draggedItem);
//     },
//   },
// });

// export const { addIngredient, setBun, removeIngredient, moveIngredient } =
//   constructorSlice.actions;
// export default constructorSlice.reducer;
