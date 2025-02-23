import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegistration } from '../../services/register-slice';

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordHidden = useRef<HTMLInputElement | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const { success } = useSelector((state: RootState) => state.register);

  const onClickPasswordHidden = () => {
    setTimeout(() => {
      passwordHidden.current?.focus();
    }, 0);
    // alert('Icon Click Callback');
  };
  useEffect(() => {
    if (success) {
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');
    }
  }, [success, navigate]); // Отслеживаем изменения success

  const onClickRegistration = () => {
    dispatch(
      fetchRegistration({
        email: email,
        password: password,
        name: name,
      }),
    );
  };

  return (
    <>
      <div className={styles.form}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          size="default"
          extraClass="ml-1 mb-4"
        />
        <Input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
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
          onIconClick={onClickPasswordHidden}
          size="default"
          extraClass="ml-1 mb-4"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            onClickRegistration();
          }}
        >
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
