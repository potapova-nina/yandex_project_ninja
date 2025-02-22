import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.scss';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null); // Указываем тип

  return (
    <>
      <div className={styles.form}>
        <p className="text text_type_main-medium mb-4">Восстановление пароля</p>
        <Input
          type="text"
          placeholder="Укажите e-mail"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          ref={inputRef}
          size="default"
          extraClass="ml-1 mb-4"
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            navigate('/reset-password');
          }}
        >
          Восстановить
        </Button>

        <div className="mt-10">
          <div className={styles.text}>
            <p className="text text_type_main-default ">Вспомнили пароль?</p>
            <p
              className="text text_type_main-default text_color_inactive ml-3"
              onClick={() => {
                navigate('/login');
              }}
            >
              Войти
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
