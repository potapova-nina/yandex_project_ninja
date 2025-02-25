import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.scss';
import { useRef, useState } from 'react';

function Profile() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null); // Указываем тип

  const [value2, setValue2] = useState('');
  const inputRef2 = useRef<HTMLInputElement | null>(null); // Указываем тип

  const onIconClick2 = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    alert('Icon Click Callback');
  };

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
            onChange={(e) => setValue(e.target.value)}
            icon="EditIcon"
            value={value}
            ref={inputRef}
            size="default"
            extraClass="ml-1 mb-4"
          />
          <Input
            type="text"
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Логин"
            icon="EditIcon"
            value={value2}
            ref={inputRef2}
            onIconClick={onIconClick2}
            size="default"
            extraClass="ml-1 mb-4"
          />
          <Input
            type="text"
            onChange={(e) => setValue2(e.target.value)}
            icon="EditIcon"
            placeholder="Пароль"
            value={value2}
            ref={inputRef2}
            onIconClick={onIconClick2}
            size="default"
            extraClass="ml-1 mb-4"
          />
          <Button htmlType="button" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </>
  );
}

export default Profile;
