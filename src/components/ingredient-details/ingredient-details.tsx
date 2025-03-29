import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import styles from './ingredient-details.module.scss';
import { selectIngedient } from '../../services/select-ingredients-slice';

const IngredientDetails: React.FC = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const dispatch: AppDispatch = useDispatch();

  // Берём список ингредиентов (предполагается, что он уже был загружен ранее)
  const ingredientsList = useSelector(
    (state: RootState) => state.ingredients.list,
  );

  // Если в состоянии выбранного ингредиента его нет, ищем по id в списке ингредиентов
  const ingredient =
    ingredientsList.find((item) => item._id === ingredientId) || null;

  useEffect(() => {
    if (ingredient) {
      dispatch(selectIngedient(ingredient));
    }
  }, [dispatch, ingredient]);

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

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
          <p className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
