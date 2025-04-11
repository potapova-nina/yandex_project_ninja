import { IBurgerIngredient } from '../../components/burger-ingredients/dto';
import reducer, { fetchIngredients } from '../ingredients-slice';

export interface IngredientsState {
  list: IBurgerIngredient[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

describe('ingredientsSlice reducer', () => {
  const initialState: IngredientsState = {
    list: [],
    status: 'idle',
  };

  const mockIngredients: IBurgerIngredient[] = [
    {
      _id: '1',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: 'image-url',
      image_mobile: 'image-mobile-url',
      image_large: 'image-large-url',
    },
  ];

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients,
    };

    const nextState = reducer(initialState, action);

    expect(nextState.status).toBe('succeeded');
    expect(nextState.list).toEqual(mockIngredients);
  });

  it('should return initial state by default', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });
});
