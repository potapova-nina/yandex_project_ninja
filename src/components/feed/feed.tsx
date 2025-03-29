import React, { useEffect } from 'react';
import styles from './feed.module.scss';
import OrderCard from './order-card/order-card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { wsInit, wsClose } from '../../services/feed-slice';

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { orders, total, totalToday } = useSelector(
    (state: RootState) => state.feedOrder,
  );
  const ingredients = useSelector((state: RootState) => state.ingredients.list);

  useEffect(() => {
    dispatch(wsInit('wss://norma.nomoreparties.space/orders/all'));

    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  const doneOrders = orders.filter((order) => order.status === 'done');
  const inProgressOrders = orders.filter((order) => order.status !== 'done');

  const visibleDoneOrders = doneOrders.slice(0, 14);
  const doneColumn1 = visibleDoneOrders.slice(0, 7);
  const doneColumn2 = visibleDoneOrders.slice(7, 14);

  const getPriceAndImages = (ingredientIds: string[]) => {
    const orderIngredients = ingredientIds
      .map((id) => ingredients.find((item) => item._id === id))
      .filter(Boolean);

    const totalPrice = orderIngredients.reduce(
      (sum, item) => sum + (item!.price || 0),
      0,
    );

    const images = orderIngredients.map((item) => item!.image);

    return { totalPrice, images };
  };

  return (
    <div className={styles.feed_main}>
      <div className={styles.scrollable_column}>
        {orders.map((order) => {
          const { totalPrice, images } = getPriceAndImages(order.ingredients);

          return (
            <div
              key={order._id}
              onClick={() => {
                navigate(`/feed/${order.number}`, {
                  state: { background: location },
                });
              }}
            >
              <OrderCard
                key={order._id}
                number={order.number}
                name={order.name}
                time={new Date(order.createdAt).toLocaleString()}
                price={totalPrice}
                ingredients={images}
                status={order.status}
              />
            </div>
          );
        })}
      </div>

      <div>
        <div className={styles.done}>
          <div>
            <p className="text text_type_main-medium mb-3">Готовы:</p>
            <div className={styles.done_columns}>
              <div className={styles.done_list}>
                {doneColumn1.map((order) => (
                  <p
                    key={order._id}
                    className="text text_type_digits-default text_blue"
                  >
                    {order.number}
                  </p>
                ))}
              </div>
              <div className={styles.done_list}>
                {doneColumn2.map((order) => (
                  <p
                    key={order._id}
                    className="text text_type_digits-default text_blue"
                  >
                    {order.number}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text text_type_main-medium mb-3">В работе:</p>
            <div className={styles.done_columns}>
              {inProgressOrders.map((order) => (
                <p key={order._id} className="text text_type_digits-default">
                  {order.number}
                </p>
              ))}
            </div>
          </div>
        </div>

        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large text_color_inactive">
          {total}
        </p>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large text_color_inactive">
          {totalToday}
        </p>
      </div>
    </div>
  );
};

export default Feed;
