import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAuthAPI from '../../../api/auth.api';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [succes, setSuccess] = useState<boolean>(false);

  const forgotPassword = async (emailData: string) => {
    console.log(emailData, 'email for reset');
    const response = await UserAuthAPI.postForgotPasswordRequest(emailData);
    console.log(response, 'response');
    setSuccess(response.success);
    return response;
  };

  useEffect(() => {
    if (succes) {
      navigate('/reset-password');
    }
  }, [succes]);

  return (
    <>
      <div className={styles.form}>
        <p className="text text_type_main-medium mb-4">Восстановление пароля</p>
        <Input
          type="text"
          placeholder="Укажите e-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          size="default"
          extraClass="ml-1 mb-4"
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            forgotPassword(email);
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
