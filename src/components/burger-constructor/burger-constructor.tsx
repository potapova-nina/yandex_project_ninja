import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './burger-constructor.module.scss';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';

import { createOrder } from '../../services/order-slice';
import { useDrop } from 'react-dnd';
import { addIngredient, setBun } from '../../services/constructor-slice';
import { IBurgerIngredient } from '../burger-ingredients/dto';
import SortableIngredient from './sortable-ingredient.tsx/sortable-indredient';

function BurgerConstructor() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { bun, ingredients } = useSelector(
    (state: RootState) => state.constructor,
  );

  const orderNumber = useSelector(
    (state: RootState) => state.order.orderNumber,
  );

  // Итоговая цена: булка учитывается дважды + сумма цен остальных ингредиентов
  const totalPrice =
    (bun ? bun.price * 2 : 0) +
    (ingredients ? ingredients.reduce((sum, ing) => sum + ing.price, 0) : 0);

  const handleOpenOrderModal = () => {
    const ingredientIds: string[] = [];
    if (bun) {
      ingredientIds.push(bun._id, bun._id);
    }
    if (ingredients) {
      ingredients.forEach((ing) => ingredientIds.push(ing._id));
    }

    dispatch(createOrder(ingredientIds));
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  // Drop-цель для добавления ингредиентов из списка (с булкой отдельно)
  const [{ isHover }, dropRef] = useDrop<
    IBurgerIngredient,
    void,
    { isHover: boolean }
  >({
    accept: 'ingredient',
    drop(item: IBurgerIngredient) {
      if (item.type === 'bun') {
        dispatch(setBun(item));
      } else {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const dropAreaStyle = isHover
    ? { border: '2px solid pink', borderRadius: '20px' }
    : {};

  return (
    <>
      <div className={styles.container} ref={dropRef} style={dropAreaStyle}>
        {/* Верхняя булка */}
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass="ml-8"
          />
        ) : (
          <div className={`${styles.placeholder} ml-8 mt-10`}>
            Перетащите булку
          </div>
        )}

        {/* Список сортируемых ингредиентов */}
        {ingredients && (
          <div className={styles.scrollable}>
            {ingredients.map((ingredient, index) => (
              <SortableIngredient
                key={ingredient.constructorId}
                ingredient={ingredient}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Нижняя булка */}
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass="ml-9"
          />
        ) : (
          <div className={`${styles.placeholder} ml-9`}>Перетащите булку</div>
        )}

        <div className={styles.order}>
          <p className="text text_type_digits-default mr-3">
            {totalPrice ? totalPrice : 0}
          </p>
          <CurrencyIcon type="primary" className="mr-10" />
          <Button htmlType={'button'} onClick={handleOpenOrderModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
      {isOrderModalOpen && (
        <>
          <Modal onClose={handleCloseOrderModal} title=" ">
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        </>
      )}
    </>
  );
}

export default BurgerConstructor;
