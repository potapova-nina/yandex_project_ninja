import React from 'react';
import styles from './ingredient-details.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

const IngredientDetails: React.FC = () => {
  const selectedIngredient = useSelector(
    (state: RootState) => state.selectIngedient.selectedIngredient,
  );
  return (
    <>
      <div className={styles.ingredientDetails}>
        <img
          src={selectedIngredient?.image_large}
          alt={selectedIngredient?.name}
        />
        <p className="text text_type_main-medium mt-4">
          {selectedIngredient?.name}
        </p>
        <div className={styles.nutrition}>
          <div>
            <p className="text text_type_main-default">Калории, ккал</p>
            <p className="text text_type_digits-default">
              {selectedIngredient?.calories}
            </p>
          </div>
          <div>
            <p className="text text_type_main-default">Белки, г</p>
            <p className="text text_type_digits-default">
              {selectedIngredient?.proteins}
            </p>
          </div>
          <div>
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_digits-default">
              {selectedIngredient?.fat}
            </p>
          </div>
          <div>
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default">
              {selectedIngredient?.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
