import React, { useEffect, useState } from 'react';
import styles from './feed.module.scss';
import OrderCard from './order-card/order-card';

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

const Feed: React.FC = () => {
  const [wsOrders, setWsOrders] = useState<IOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);

  useEffect(() => {
    const socket: WebSocket = new WebSocket(
      'wss://norma.nomoreparties.space/orders/all',
    );

    socket.onmessage = (event: MessageEvent) => {
      try {
        const data: IWSResponse = JSON.parse(event.data);
        if (data.success) {
          setWsOrders(data.orders);
          setTotal(data.total);
          setTotalToday(data.totalToday);
        }
        console.log(data.orders);
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

  // Фильтруем заказы по статусу
  const doneOrders: IOrder[] = wsOrders.filter(
    (order) => order.status === 'done',
  );
  const inProgressOrders: IOrder[] = wsOrders.filter(
    (order) => order.status !== 'done',
  );

  // Для колонки "Готово" берем максимум 14 заказов
  const visibleDoneOrders = doneOrders.slice(0, 14);
  // Разбиваем на 2 колонки по 7 записей
  const doneColumn1 = visibleDoneOrders.slice(0, 7);
  const doneColumn2 = visibleDoneOrders.slice(7, 14);

  return (
    <div className={styles.feed_main}>
      <div className={styles.scrollable_column}>
        {wsOrders.map((order) => (
          // Преобразуем данные из wsOrders в структуру, ожидаемую OrderCard
          <OrderCard
            key={order._id}
            number={order.number}
            name={order.name}
            time={new Date(order.createdAt).toLocaleString()}
            price={0} // Цена отсутствует в ws-ответе, можно заменить на актуальное значение
            ingredients={order.ingredients}
            status={order.status}
          />
        ))}
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
