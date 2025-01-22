 class ingredientService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://norma.nomoreparties.space/api/ingredients';
  }
 async getIngredients(){
    const response = await fetch(this.baseUrl, {
        method: 'GET',
      });
      const data = await response.json();
      return data; 
  }
}

export default new ingredientService();