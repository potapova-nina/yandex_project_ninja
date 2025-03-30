import React, { useEffect } from 'react';
import styles from './profile-order-history.module.scss';
import { RootState } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderCard from '../feed/order-card/order-card';
import { wsUserInit, wsUserClose } from '../../services/user-feed-slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

const ProfileOrderHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.list,
  );
  const orders = useAppSelector((state: RootState) => state.userFeed.orders);

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
        {orders.map((order: IOrder) => {
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
