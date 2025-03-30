import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef } from 'react';
import styles from './burger-constructor.module.scss';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { AppDispatch, RootState } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createOrder } from '../../services/order-slice';
import { useDrop } from 'react-dnd';
import { addIngredient, setBun } from '../../services/constructor-slice';
import { IBurgerIngredient } from '../burger-ingredients/dto';
import SortableIngredient from './sortable-ingredient.tsx/sortable-indredient';
import { useNavigate } from 'react-router-dom';

function BurgerConstructor() {
  const navigate = useNavigate();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const dispatch: AppDispatch = useAppDispatch();

  const { bun, ingredients } = useAppSelector(
    (state: RootState) => state.constructor,
  );

  const orderNumber = useAppSelector(
    (state: RootState) => state.order.orderNumber,
  );

  // Итоговая цена: булка учитывается дважды + сумма цен остальных ингредиентов
  const totalPrice =
    (bun ? bun.price * 2 : 0) +
    (ingredients ? ingredients.reduce((sum, ing) => sum + ing.price, 0) : 0);

  const handleOpenOrderModal = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const ingredientIds: string[] = [];
      if (bun) {
        ingredientIds.push(bun._id, bun._id);
      }
      if (ingredients) {
        ingredients.forEach((ing) => ingredientIds.push(ing._id));
      }
      dispatch(createOrder(ingredientIds));
      setIsOrderModalOpen(true);
    } else {
      navigate('/login');
    }
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  // Drop-цель для добавления ингредиентов (булка обрабатывается отдельно)
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

  // Флаг, чтобы восстановление из localStorage происходило только один раз
  const isRestored = useRef(false);

  // Восстановление состояния из localStorage (только если авторизован и состояние конструктора пустое)
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      localStorage.removeItem('burgerConstructor');

      return;
    }
    // Если состояние уже заполнено или мы уже восстановили – ничего не делаем
    if (isRestored.current || bun || (ingredients && ingredients.length > 0)) {
      isRestored.current = true;
      return;
    }
    const storedData = localStorage.getItem('burgerConstructor');
    if (storedData) {
      try {
        const { bun: storedBun, ingredients: storedIngredients } =
          JSON.parse(storedData);
        if (storedBun) {
          dispatch(setBun(storedBun));
        }
        if (storedIngredients && storedIngredients.length > 0) {
          storedIngredients.forEach((ing: IBurgerIngredient) => {
            dispatch(addIngredient(ing));
          });
        }
      } catch (error) {
        console.error('Ошибка парсинга данных конструктора:', error);
      }
    }
    isRestored.current = true;
  }, [bun, ingredients, dispatch]);

  // Сохранение состояния конструктора в localStorage (только если авторизован)
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const constructorData = { bun, ingredients };
      if (bun || (ingredients && ingredients.length > 0)) {
        localStorage.setItem(
          'burgerConstructor',
          JSON.stringify(constructorData),
        );
      } else {
        localStorage.removeItem('burgerConstructor');
      }
    } else {
      localStorage.removeItem('burgerConstructor');
    }
  }, [bun, ingredients]);

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
          <Button htmlType="button" onClick={handleOpenOrderModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
      {isOrderModalOpen && (
        <Modal onClose={handleCloseOrderModal} title=" ">
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
