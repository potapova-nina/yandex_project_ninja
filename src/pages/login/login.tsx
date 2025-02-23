import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginUser } from '../../services/login-slice';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordHidden = useRef<HTMLInputElement | null>(null); // Указываем тип

  const dispatch: AppDispatch = useDispatch();
  const { success } = useSelector((state: RootState) => state.login);

  const onCkickPasswordHidden = () => {
    setTimeout(() => {
      passwordHidden.current?.focus();
    }, 0);
    alert('Icon Click Callback');
  };

  useEffect(() => {
    if (success) {
      setEmail('');
      setPassword('');
      navigate('/burgers');
    }
  }, [success, navigate]); // Отслеживаем изменения success

  const onClickLogin = () => {
    dispatch(
      fetchLoginUser({
        email: email,
        password: password,
      }),
    );
  };

  return (
    <>
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
          type="text"
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
