import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-card.module.scss';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../services/store';
import { IBurgerIngredient } from '../../burger-ingredients/dto';

interface IBurgerIngredientWithQuantity extends IBurgerIngredient {
  quantity: number;
}

interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

const FeedCard = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const isModal = !!location.state?.background;
  const orders = useSelector((state: RootState) => state.feedOrder.orders);
  const ingredientsData = useSelector(
    (state: RootState) => state.ingredients.list,
  );

  const [fetchedOrder, setFetchedOrder] = useState<IOrder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Поиск по _id среди WebSocket заказов
  // const orderFromSocket = orders.find((order) => order._id === orderId);

  const orderFromSocket = orders.find(
    (order) => String(order.number) === orderId,
  );

  useEffect(() => {
    if (!orderFromSocket && orderId) {
      setIsLoading(true);
      fetch(`https://norma.nomoreparties.space/api/orders/${orderId}`)
        .then((res) => (res.ok ? res.json() : Promise.reject('Не найдено')))
        .then((data) => {
          if (data.orders && data.orders.length > 0) {
            setFetchedOrder(data.orders[0]);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, [orderFromSocket, orderId]);

  const order = orderFromSocket || fetchedOrder;

  if (!order || isLoading) {
    return <p className="text text_type_main-default p-4">Загрузка...</p>;
  }

  const ingredientDetails: IBurgerIngredient[] = order.ingredients
    .map((id) => ingredientsData.find((i) => i._id === id))
    .filter((item): item is IBurgerIngredient => item !== undefined);

  const grouped: Record<string, IBurgerIngredientWithQuantity> =
    ingredientDetails.reduce(
      (acc, item) => {
        const id = item._id;
        if (!acc[id]) {
          acc[id] = { ...item, quantity: 1 };
        } else {
          acc[id].quantity += 1;
        }
        return acc;
      },
      {} as Record<string, IBurgerIngredientWithQuantity>,
    );

  const totalPrice = Object.values(grouped).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const formattedTime = new Date(order.createdAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={!isModal ? styles.pageContainer : ''}>
      <div className={`${styles.card} ${!isModal ? styles.centered : ''}`}>
        <div className={styles.card}>
          <div className={styles.orderNumber}>
            <p className="text text_type_digits-default mb-8">
              #{order.number}
            </p>
          </div>
          <p className="text text_type_main-medium">{order.name}</p>
          <div className={styles.status}>
            <p className="text text_type_main-default text_color_success">
              {order.status === 'done' ? 'Выполнен' : 'Готовится'}
            </p>
          </div>

          <p className="text text_type_main-medium mt-7 mb-4">Состав:</p>
          <ul className={styles.ingredientList}>
            {Object.values(grouped).map((item, index) => (
              <li key={index} className={styles.ingredient}>
                <div
                  className={styles.icon}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <p className="text text_type_main-default">{item.name}</p>
                <div className={styles.priceBlock}>
                  <p className="text text_type_digits-default">
                    {item.quantity} x {item.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <p className="text text_type_main-default">{formattedTime}</p>
            <div className={styles.price}>
              <p className="text text_type_digits-default">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
