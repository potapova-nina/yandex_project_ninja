import React from "react";
import styles from "./ingredient-details.module.scss";
import { IBurgerIngredient } from "../burger-ingredients/dto";

interface IngredientDetailsProps {
  ingredient: IBurgerIngredient;
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({ ingredient }) => {
  return (
    <div className={styles.ingredientDetails}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
      <div className={styles.nutrition}>
        <div>
          <p className="text text_type_main-default">Калории, ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div>
         <p className="text text_type_main-default">Углеводы, г</p>
        <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
