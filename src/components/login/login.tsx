import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
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
      <div className={styles.login}>
        <Input
          type="text"
          placeholder="Логин"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          ref={inputRef}
          size="default"
          extraClass="ml-1 mb-4"
        />
        <Input
          type="text"
          onChange={(e) => setValue2(e.target.value)}
          icon="HideIcon"
          placeholder="Пароль"
          value={value2}
          ref={inputRef2}
          onIconClick={onIconClick2}
          size="default"
          extraClass="ml-1 mb-4"
        />
        <Button htmlType="button" type="primary" size="medium">
          Войти
        </Button>
        <div className="mt-10">
          <div className={styles.text}>
            <p className="text text_type_main-default ">
              Вы - новый пользователь?
            </p>
            <p
              className="text text_type_main-default text_color_inactive ml-3"
              onClick={() => {
                navigate('/register');
              }}
            >
              Зарегистрироваться
            </p>
          </div>
          <div className={styles.text}>
            <p className="text text_type_main-default ">Забыли пароль?</p>
            <p
              className="text text_type_main-default text_color_inactive ml-3"
              onClick={() => {
                navigate('/forgot-password');
              }}
            >
              Восстановить пароль
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
