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

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    const response = await fetch(
      'https://norma.nomoreparties.space/api/auth/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
      },
    );

    if (!response.ok) return null;

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.accessToken;
  };

  useEffect(() => {
    refreshAccessToken();
    const accessToken = localStorage
      .getItem('accessToken')
      ?.replace('Bearer ', '');
    const socket: WebSocket = new WebSocket(
      `wss://norma.nomoreparties.space/orders?token=${accessToken}`,
    );

    socket.onmessage = (event: MessageEvent) => {
      try {
        const data: IWSResponse = JSON.parse(event.data);
        console.log('data', data, data.orders);
        if (data.success) {
          setWsOrders(data.orders);
          console.log('suc_data', data.orders);
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
