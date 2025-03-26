import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-card.module.scss';

const FeedCard = () => {
  const { orderId } = useParams();
  const orders = useSelector((state: RootState) => state.feedOrder.orders);
  const ingredientsData = useSelector(
    (state: RootState) => state.ingredients.list,
  );

  const order = orders.find((order) => order._id === orderId);
  if (!order) return <p>Загрузка...</p>;

  const ingredientDetails = order.ingredients
    .map((id) => ingredientsData.find((i) => i._id === id))
    .filter(Boolean);

  const grouped = ingredientDetails.reduce((acc: Record<string, any>, item) => {
    if (!acc[item._id]) {
      acc[item._id] = { ...item, quantity: 1 };
    } else {
      acc[item._id].quantity += 1;
    }
    return acc;
  }, {});

  const totalPrice = Object.values(grouped).reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );

  const formattedTime = new Date(order.createdAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={styles.card}>
      <div className={styles.orderNumber}>
        <p className="text text_type_digits-default mb-8">#{order.number}</p>
      </div>
      <p className="text text_type_main-medium">{order.name}</p>
      <div className={styles.status}>
        <p className="text text_type_main-default text_color_success">
          {order.status === 'done' ? 'Выполнен' : 'Готовится'}
        </p>
      </div>

      <p className="text text_type_main-medium mt-7 mb-4">Состав:</p>
      <ul className={styles.ingredientList}>
        {Object.values(grouped).map((item: any) => (
          <li key={item._id} className={styles.ingredient}>
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
  );
};

export default FeedCard;
