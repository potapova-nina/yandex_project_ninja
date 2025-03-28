import { IBurgerIngredientResponse } from '../components/burger-ingredients/dto';
import { BASE_URL } from './api.dto';

type ApiResponse<T> = T;

interface OrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

const checkResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return response.json(); // Если всё ок, парсим JSON
  }

  // Если ошибка, парсим ответ и возвращаем Promise.reject
  const error = await response.json();
  return Promise.reject(error);
};

class IngredientAPI {
  private getAllIngredientsURL: string;
  private createOrderURL: string;

  constructor() {
    this.getAllIngredientsURL = '/ingredients';
    this.createOrderURL = '/orders';
  }

  //GET ALL INGREDIENTS
  async getIngredients(): Promise<ApiResponse<IBurgerIngredientResponse>> {
    return fetch(BASE_URL + this.getAllIngredientsURL, {
      method: 'GET',
    }).then((response) =>
      checkResponse<ApiResponse<IBurgerIngredientResponse>>(response),
    );
  }

  //POST CREATE ORDER
  async postCreateOrder(
    ingredients: string[],
  ): Promise<ApiResponse<OrderResponse>> {
    const accessToken = localStorage.getItem('accessToken');

    return fetch(BASE_URL + this.createOrderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken!,
      },
      body: JSON.stringify({ ingredients }),
    }).then((response) => checkResponse<OrderResponse>(response));
  }
}

export default new IngredientAPI();
