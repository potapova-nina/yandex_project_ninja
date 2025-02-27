import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';
import { useNavigate } from 'react-router-dom';

function AppHeader() {
  const navigate = useNavigate();
  return (
    <header className={styles.appheader}>
      <div className={styles.links}>
        <div className={styles.menuItem}>
          <BurgerIcon type="primary" />
          <p
            className="text text_type_main-default"
            onClick={() => {
              navigate('/');
            }}
          >
            Конструктор
          </p>
        </div>
        <div className={styles.menuItem}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default">Лента заказов</p>
        </div>
      </div>
      <div>
        <Logo />
      </div>

      <div
        className={styles.login}
        onClick={() => {
          navigate('/profile');
        }}
      >
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default">Личный кабинет</p>
      </div>
    </header>
  );
}

export default AppHeader;
