import { IBurgerIngredient } from "../components/burger-ingredients/dto";

type ApiResponse<T> = {
  data: T;
  success: boolean;
};

const checkResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return response.json(); // Если всё ок, парсим JSON
  }

  // Если ошибка, парсим ответ и возвращаем Promise.reject
  const error = await response.json();
  return Promise.reject(error);
};

class IngredientService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://norma.nomoreparties.space/api/ingredients';
  }

  async getIngredients(): Promise<ApiResponse<IBurgerIngredient[]>> {
    return fetch(this.baseUrl, {
      method: 'GET',
    }).then((response) => checkResponse<ApiResponse<IBurgerIngredient[]>>(response));
  }
}

export default new IngredientService();
