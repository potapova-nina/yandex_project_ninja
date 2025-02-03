import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';

function AppHeader() {
  return (
    <header className={styles.appheader}>
      <div className={styles.links}>
      <div className={styles.menuItem}>
        <BurgerIcon type="primary" />
        <p className="text text_type_main-default">Конструктор</p>
      </div>
      <div className={styles.menuItem}>
        <ListIcon type="secondary" />
        <p className="text text_type_main-default">Лента заказов</p>
      </div>
      </div>
      <Logo />
      <div>
      <div className={styles.login}  >
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default">Личный кабинет</p>
      </div>
      </div>
    </header>
  );
}

export default AppHeader;
