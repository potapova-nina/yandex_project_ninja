import styles from './feed.module.scss';
import OrderCard from './order-card/order-card';

const orders = [
  {
    id: '034535',
    name: 'Death Star Starship Main бургер',
    time: 'Сегодня, 16:20',
    price: 480,
    ingredients: [1, 2, 3, 4, 5, 6],
  },
  {
    id: '034534',
    name: 'Interstellar бургер',
    time: 'Сегодня, 13:20',
    price: 560,
    ingredients: [1, 2, 3, 4, 5, '...'],
  },
  {
    id: '034533',
    name: 'Black Hole Singularity острый бургер',
    time: 'Вчера, 13:50',
    price: 510,
    ingredients: [1, 2, 3, 4],
  },
  {
    id: '034532',
    name: 'Supernova Infinity бургер',
    time: '2 дня назад, 21:53',
    price: 370,
    ingredients: [1, 2, 3],
  },
  {
    id: '034531',
    name: 'Cosmic Melt бургер',
    time: 'Сегодня, 11:12',
    price: 490,
    ingredients: [1, 2, 3, 4, 5, 6],
  },
  {
    id: '034530',
    name: 'Galaxy Flame бургер',
    time: 'Сегодня, 09:42',
    price: 520,
    ingredients: [1, 2, 3, 4, 5],
  },
];

const Feed = () => {
  return (
    <div className={styles.feed_main}>
      <div className={styles.scrollable_column}>
        {orders.map((order) => (
          <OrderCard key={order.id} {...order} />
        ))}
      </div>

      <div>
        <div className={styles.done}>
          <div className={styles.done_list}>
            <p className="text text_type_main-medium mb-3">Готовы:</p>
            <div className={styles.text_blue}>
              <p className="text text_type_digits-default">28732</p>
              <p className="text text_type_digits-default">12872</p>
            </div>
          </div>
          <div className={styles.done_list}>
            <p className="text text_type_main-medium mb-3">В работе:</p>
            <p className="text text_type_digits-default">72369</p>
            <p className="text text_type_digits-default">28732</p>
            <p className="text text_type_digits-default">12872</p>
          </div>
        </div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large text_color_inactive">
          28 752
        </p>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large text_color_inactive">138</p>
      </div>
    </div>
  );
};

export default Feed;
