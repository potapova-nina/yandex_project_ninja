import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.scss';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
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
      <div className={styles.form}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          ref={inputRef}
          size="default"
          extraClass="ml-1 mb-4"
        />
        <Input
          type="text"
          onChange={(e) => setValue2(e.target.value)}
          placeholder="E-mail"
          value={value2}
          ref={inputRef2}
          onIconClick={onIconClick2}
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
          Зарегистрироваться
        </Button>
        <div className="mt-10">
          <div className={styles.text}>
            <p className="text text_type_main-default ">
              Уже зарегистрированы?
            </p>
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

export default RegisterPage;
