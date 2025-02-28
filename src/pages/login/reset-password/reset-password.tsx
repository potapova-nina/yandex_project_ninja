import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.scss';
import { useState } from 'react';
import UserAuthAPI from '../../../api/auth.api';
import { IResetPassword } from '../../../api/api.dto';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const resetPassword = async (resetPasswordData: IResetPassword) => {
    const response =
      await UserAuthAPI.postResetPasswordRequest(resetPasswordData);

    return response;
  };

  return (
    <>
      <div className={styles.form}>
        <p className="text text_type_main-medium mb-4">Восстановление пароля</p>
        <Input
          type="text"
          placeholder="Введите новый пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          size="default"
          extraClass="ml-1 mb-4"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={(e) => setToken(e.target.value)}
          value={token}
          size="default"
          extraClass="ml-1 mb-4"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            resetPassword({ password, token });
            navigate('/login');
          }}
        >
          Сохранить
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

export default ResetPassword;
