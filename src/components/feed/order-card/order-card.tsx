import React from 'react';
import styles from './order-card.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

export interface OrderCardProps {
  number: number;
  name: string;
  time: string;
  price: number;
  status: string;
  ingredients: string[]; // массив URL'ов изображений
}

const OrderCard: React.FC<OrderCardProps> = ({
  number,
  name,
  time,
  price,
  ingredients,
  status,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {time}
        </p>
      </div>

      <p className="text text_type_main-default">{name}</p>
      <p className="text text_type_main-default"> {status}</p>

      <div className={styles.footer}>
        <div className={styles.ingredients}>
          {ingredients.slice(0, 6).map((url, index) => (
            <div
              key={index}
              className={styles.circle}
              style={{ backgroundImage: `url(${url})` }}
            ></div>
          ))}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
