import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.scss';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { setUser } from '../../services/login-slice';

function Profile() {
  const { user } = useSelector((state: RootState) => state.login);
  const dispatch: AppDispatch = useDispatch();

  const [password, setPassword] = useState('');
  const inputRef2 = useRef<HTMLInputElement | null>(null); // Указываем тип

  const onIconClick2 = () => {
    setTimeout(() => {
      inputRef2.current?.focus();
    }, 0);
    alert('Icon Click Callback');
  };

  const saveUserData = () => {};
  const cancelUserData = () => {};

  return (
    <>
      <div className={styles.page}>
        <div className={styles.menu}>
          <p className="text text_type_main-medium">Профиль</p>
          <p className="text text_type_main-medium text_color_inactive">
            История заказов
          </p>
          <p className="text text_type_main-medium text_color_inactive">
            Выход
          </p>
        </div>
        <div className={styles.form}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => {
              dispatch(
                setUser({
                  ...user,
                  user: {
                    ...user.user,
                    name: e.target.value,
                  },
                }),
              );
            }}
            icon="EditIcon"
            value={user.user.name}
            ref={inputRef2}
            size="default"
            extraClass="ml-1 mb-4"
          />
          <Input
            type="text"
            onChange={(e) => {
              dispatch(
                setUser({
                  ...user,
                  user: {
                    ...user.user,
                    email: e.target.value,
                  },
                }),
              );
            }}
            placeholder="Логин"
            icon="EditIcon"
            value={user.user.email}
            size="default"
            extraClass="ml-1 mb-4"
          />
          <Input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            icon="EditIcon"
            placeholder="Пароль"
            value={password}
            ref={inputRef2}
            onIconClick={onIconClick2}
            size="default"
            extraClass="ml-1 mb-4"
          />
          <div className={styles.editButtons}>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={cancelUserData}
            >
              Отменить
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={saveUserData}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
