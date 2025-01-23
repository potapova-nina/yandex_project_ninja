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

      console.log(data?.data)
      return data; 
  }
}

export default new ingredientService();