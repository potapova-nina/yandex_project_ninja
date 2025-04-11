import { IBurgerIngredient } from '../../components/burger-ingredients/dto';
import reducer, {
  addIngredient,
  setBun,
  removeIngredient,
  moveIngredient,
} from '../constructor-slice';

export interface ConstructorIngredient extends IBurgerIngredient {
  constructorId: string;
}

export interface ConstructorState {
  bun: IBurgerIngredient | null;
  ingredients: ConstructorIngredient[];
}

const baseIngredient: IBurgerIngredient = {
  _id: '123',
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

describe('constructorSlice', () => {
  const initialState: ConstructorState = {
    bun: null,
    ingredients: [],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setBun', () => {
    const nextState = reducer(initialState, setBun(baseIngredient));
    expect(nextState.bun).toEqual(baseIngredient);
  });

  it('should handle addIngredient with constructorId', () => {
    const state = reducer(initialState, addIngredient(baseIngredient));
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toHaveProperty('constructorId');
    expect(state.ingredients[0].name).toBe('Test Ingredient');
  });

  it('should handle removeIngredient by constructorId', () => {
    const stateWithIngredient = reducer(
      initialState,
      addIngredient(baseIngredient),
    );
    const idToRemove = stateWithIngredient.ingredients[0].constructorId;

    const nextState = reducer(
      stateWithIngredient,
      removeIngredient(idToRemove),
    );
    expect(nextState.ingredients.length).toBe(0);
  });

  it('should handle moveIngredient', () => {
    let state: ConstructorState = {
      bun: null,
      ingredients: [],
    };

    // добавляем 2 разных ингредиента
    state = reducer(state, addIngredient({ ...baseIngredient, name: 'A' }));
    state = reducer(state, addIngredient({ ...baseIngredient, name: 'B' }));

    const ingredientA = state.ingredients[0];
    const ingredientB = state.ingredients[1];

    const movedState = reducer(
      state,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 }),
    );

    expect(movedState.ingredients[0].name).toBe(ingredientB.name);
    expect(movedState.ingredients[1].name).toBe(ingredientA.name);
  });
});
