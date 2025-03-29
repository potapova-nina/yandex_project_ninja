import React, { useEffect } from 'react';
import styles from './profile-order-history.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderCard from '../feed/order-card/order-card';
import { wsUserInit, wsUserClose } from '../../services/user-feed-slice';

const ProfileOrderHistory: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useSelector((state: RootState) => state.ingredients.list);
  const orders = useSelector((state: RootState) => state.userFeed.orders);

  useEffect(() => {
    const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
    if (token) {
      dispatch(
        wsUserInit(`wss://norma.nomoreparties.space/orders?token=${token}`),
      );
    }

    return () => {
      dispatch(wsUserClose());
    };
  }, [dispatch]);

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
    <div className={styles.order_history_main}>
      <div className={styles.scrollable_column}>
        {orders.map((order: any) => {
          const { totalPrice, images } = getPriceAndImages(order.ingredients);

          return (
            <div
              key={order._id}
              onClick={() => {
                navigate(`/profile/orders/${order.number}`, {
                  state: { background: location },
                });
              }}
            >
              <OrderCard
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
    </div>
  );
};

export default ProfileOrderHistory;
