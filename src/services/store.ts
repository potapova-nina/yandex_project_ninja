// services/store.ts
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import constructorReducer from './constructor-slice';
import selectIngedientReducer from './select-ingredients-slice';
import orderReducer from './order-slice';
import registerReducer from './register-slice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructor: constructorReducer, // именно этот ключ вы затем используете через useSelector
    selectIngedient: selectIngedientReducer,
    order: orderReducer,
    register: registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
