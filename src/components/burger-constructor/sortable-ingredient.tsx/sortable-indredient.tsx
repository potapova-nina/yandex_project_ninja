import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../burger-constructor.module.scss';
import { useDispatch } from 'react-redux';
import {
  ConstructorIngredient,
  moveIngredient,
  removeIngredient,
} from '../../../services/constructor-slice';

interface SortableIngredientProps {
  ingredient: ConstructorIngredient;
  index: number;
}

const SortableIngredient: React.FC<SortableIngredientProps> = ({
  ingredient,
  index,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'sortableIngredient',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'sortableIngredient',
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      // Получаем размеры элемента на экране
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Перемещаем элемент, только если курсор пересек середину
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      // Обновляем индекс перемещаемого элемента
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={styles.ingredient}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredient(ingredient.constructorId))}
      />
    </div>
  );
};

export default SortableIngredient;
