import React from 'react';
import styles from '../feed.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

interface OrderCardProps {
  id: string;
  name: string;
  time: string;
  price: number;
  ingredients: (number | string)[];
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  name,
  time,
  price,
  ingredients,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className="text text_type_digits-default">#{id}</p>
        <p className="text text_type_main-default text_color_inactive">
          {time}
        </p>
      </div>

      <p className="text text_type_main-default">{name}</p>

      <div className={styles.footer}>
        <div className={styles.ingredients}>
          {ingredients.map((item, index) => (
            <div key={index} className={styles.circle}></div>
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
