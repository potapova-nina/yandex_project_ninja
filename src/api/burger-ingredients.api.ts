import { IBurgerIngredient } from "../components/burger-ingredients/dto";

type ApiResponse<T> = T extends { success: boolean }
  ? T // Если T уже содержит success, просто используем T
  : {
      data: T; // Иначе добавляем data
      success: boolean;
    };

interface OrderResponse  {
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

class IngredientService {
  private getAllIngredientsURL: string;
  private createOrderURL: string;

  constructor() {
    this.getAllIngredientsURL = 'https://norma.nomoreparties.space/api/ingredients';
    this.createOrderURL = 'https://norma.nomoreparties.space/api/orders';
  }

  async getIngredients(): Promise<ApiResponse<IBurgerIngredient[]>> {
    return fetch(this.getAllIngredientsURL, {
      method: 'GET',
    }).then((response) => checkResponse<ApiResponse<IBurgerIngredient[]>>(response));
  }


  async postCreateOrder(ingredients: string[]):Promise<ApiResponse<OrderResponse>>
  {
    return fetch(this.createOrderURL, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }), 
    }).then((response) => checkResponse<OrderResponse>(response));
    
  
    
  }
}

export default new IngredientService();
