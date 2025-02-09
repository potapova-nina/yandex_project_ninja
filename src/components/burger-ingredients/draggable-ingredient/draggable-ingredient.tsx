import React from 'react';
import { useDrag } from 'react-dnd';
import styles from "./draggable-ingredient.module.scss";
import { useSelector } from 'react-redux';
import { IBurgerIngredient } from '../dto';
import IngredientsItems from '../ingredient-items/ingredient-items';
import { RootState } from '../../../services/store';


interface DraggableIngredientProps {
  ingredient: IBurgerIngredient;
  onClick: (ingredient: IBurgerIngredient) => void;
}

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({ ingredient, onClick }) => {
  // Получаем из Redux данные конструктора
  const { bun, ingredients } = useSelector((state: RootState) => state.constructor);

  let count = 0;
  if (ingredient.type === "bun") {
    if (bun && bun._id === ingredient._id) {
      count = 2;
    }
  } else {
    
    if (ingredients){
    count = ingredients.filter((item: IBurgerIngredient) => item._id === ingredient._id).length;}
  }

  
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div 
      ref={dragRef} 
      style={{ opacity }} 
      onClick={() => onClick(ingredient)} 
      className={styles.ingredientWrapper}
    >
      {count > 0 && <div className={styles.counter}>{count}</div>}
      <IngredientsItems
        image={ingredient.image}
        name={ingredient.name}
        price={ingredient.price}
      />
    </div>
  );
};

export default DraggableIngredient;
