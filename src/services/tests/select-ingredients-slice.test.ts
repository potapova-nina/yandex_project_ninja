import { IBurgerIngredient } from '../../components/burger-ingredients/dto';
import reducer, {
  selectIngedient,
  clearSelectedIngredient,
  SelectedIngredientState,
} from '../select-ingredients-slice';

describe('selectedIngredientSlice', () => {
  const initialState: SelectedIngredientState = {
    selectedIngredient: null,
  };

  const mockIngredient: IBurgerIngredient = {
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
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle selectIngedient', () => {
    const nextState = reducer(initialState, selectIngedient(mockIngredient));
    expect(nextState.selectedIngredient).toEqual(mockIngredient);
  });

  it('should handle clearSelectedIngredient', () => {
    const filledState: SelectedIngredientState = {
      selectedIngredient: mockIngredient,
    };
    const nextState = reducer(filledState, clearSelectedIngredient());
    expect(nextState.selectedIngredient).toBeNull();
  });
});
