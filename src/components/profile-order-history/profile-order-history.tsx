import React, { useEffect, useState } from 'react';
import styles from './profile-order-history.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderCard from '../feed/order-card/order-card';

interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

interface IWSResponse {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

const ProfileOrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useSelector((state: RootState) => state.ingredients.list);
  const [wsOrders, setWsOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const socket: WebSocket = new WebSocket(
      'wss://norma.nomoreparties.space/orders',
    );

    socket.onmessage = (event: MessageEvent) => {
      try {
        const data: IWSResponse = JSON.parse(event.data);
        if (data.success) {
          setWsOrders(data.orders);
        }
      } catch (error) {
        console.error('Ошибка при обработке сообщения WebSocket:', error);
      }
    };
    socket.onerror = (error: Event) => {
      console.error('Ошибка WebSocket:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const getPriceAndImages = (ingredientIds: string[]) => {
    const orderIngredients = ingredientIds
      .map((id) => ingredients.find((item) => item._id === id))
      .filter(Boolean); // убираем undefined, если не нашлось

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
        {wsOrders.map((order) => {
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
    </div>
  );
};

export default ProfileOrderHistory;
