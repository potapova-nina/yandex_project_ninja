import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';
import { useRef, useState } from 'react';
import { AppDispatch } from '../../services/store';
import { useDispatch } from 'react-redux';
import { fetchLoginUser } from '../../services/login-slice';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordHidden = useRef<HTMLInputElement | null>(null);

  const dispatch: AppDispatch = useDispatch();

  const onCkickPasswordHidden = () => {
    setTimeout(() => {
      passwordHidden.current?.focus();
    }, 0);
    alert('Icon Click Callback');
  };

  const onClickLogin = () => {
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
      <Input
        type="text"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        size="default"
        extraClass="ml-1 mb-4"
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        icon="HideIcon"
        placeholder="Пароль"
        value={password}
        ref={passwordHidden}
        onIconClick={onCkickPasswordHidden}
        size="default"
        extraClass="ml-1 mb-4"
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        onClick={onClickLogin}
      >
        Войти
      </Button>
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
          <p className="text text_type_main-default text_color_inactive ml-3">
            Восстановить пароль
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
