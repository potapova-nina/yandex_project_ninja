import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-card.module.scss';

const ingredients = [
  { name: 'Флуоресцентная булка R2-D3', quantity: 2, price: 20 },
  { name: 'Филе Люминесцентного тетрадонтиформа', quantity: 1, price: 300 },
  { name: 'Соус традиционный галактический', quantity: 1, price: 30 },
  { name: 'Плоды фалленианского дерева', quantity: 1, price: 80 },
];

const FeedCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.orderNumber}>
        <p className="text text_type_digits-default mb-8">#034533</p>
      </div>
      <p className="text text_type_main-medium">
        Black Hole Singularity острый бургер
      </p>
      <div className={styles.status}>
        <p className="text text_type_main-default">Выполнен</p>
      </div>

      <p className="text text_type_main-medium mt-7 mb-4">Состав:</p>
      <ul className={styles.ingredientList}>
        {ingredients.map((item, index) => (
          <li key={index} className={styles.ingredient}>
            <div className={styles.icon}></div>

            <p className="text text_type_main-default">{item.name}</p>
            <div className={styles.priceBlock}>
              <div className={styles.price}>
                <p className="text text_type_digits-default">
                  {item.quantity} x {item.price}
                </p>

                <CurrencyIcon type="primary" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <p className="text text_type_main-default">Вчера, 13:50</p>

        <div className={styles.price}>
          <p className="text text_type_digits-default  ">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
