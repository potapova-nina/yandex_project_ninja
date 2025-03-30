import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';
import { useRef, useState } from 'react';
import { AppDispatch } from '../../services/store';
import { fetchLoginUser } from '../../services/login-slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordHidden = useRef<HTMLInputElement | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch: AppDispatch = useAppDispatch();

  const onClickPasswordToggle = () => {
    setIsPasswordVisible((prev) => !prev); // Переключение состояния
    setTimeout(() => {
      passwordHidden.current?.focus(); // Оставляем фокус на поле
    }, 0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Проверяем, чтобы не отправлять пустые данные
    if (!email || !password) {
      alert('Введите email и пароль');
      return;
    }

    dispatch(
      fetchLoginUser({
        email: email,
        password: password,
      }),
    );
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          size="default"
          extraClass="ml-1 mb-4"
        />

        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          icon={isPasswordVisible ? 'ShowIcon' : 'HideIcon'}
          placeholder="Пароль"
          value={password}
          ref={passwordHidden}
          onIconClick={onClickPasswordToggle}
          size="default"
          extraClass="ml-1 mb-4"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      {/* Дополнительные ссылки */}
      <div className="mt-10">
        <div className={styles.text}>
          <p className="text text_type_main-default">
            Вы - новый пользователь?
          </p>
          <p
            className="text text_type_main-default text_color_inactive ml-3"
            onClick={() => navigate('/register')}
          >
            Зарегистрироваться
          </p>
        </div>
        <div className={styles.text}>
          <p className="text text_type_main-default">Забыли пароль?</p>
          <p
            className="text text_type_main-default text_color_inactive ml-3"
            onClick={() => navigate('/forgot-password')}
          >
            Восстановить пароль
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
