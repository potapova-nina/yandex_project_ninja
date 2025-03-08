import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { setUser } from '../../services/login-slice';
import UserAuthAPI from '../../api/auth.api';
import { string } from 'prop-types';

function Profile() {
  const { user } = useSelector((state: RootState) => state.login);
  const dispatch: AppDispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const accessToken = localStorage.getItem('accessToken') || '';

  //для сброса
  const nameDefault = user.user.name;
  const emailDefault = user.user.email;

  const [password, setPassword] = useState('');
  const startEditUser = useRef<HTMLInputElement | null>(null); // Указываем тип

  const logoutUser = async () => {
    const response = await UserAuthAPI.postLogoutRequest(refreshToken);
    dispatch(
      setUser({
        success: false,
        user: { email: '', name: '' },
        accessToken: '',
        refreshToken: '',
      }),
    );

    localStorage.clear();

    return response;
  };

  const getUserInfo = async () => {
    const response = await UserAuthAPI.getDataAboutUser(accessToken);
    setName(response.user.name);
    setEmail(response.user.email);
    return response;
  };
  const updateUserInfo = async () => {
    const data = {
      name: name,
      email: email,
    };
    const response = await UserAuthAPI.updateDataAboutUser(accessToken, data);
    setName(response.user.name);
    setEmail(response.user.email);
    return response;
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const onClickEditUser = () => {
    setIsEdit(!isEdit);
  };

  const cancelUserData = () => {
    dispatch(
      setUser({
        ...user,
        user: {
          ...user.user,
          name: nameDefault,
          email: emailDefault,
        },
      }),
    );
    setName(nameDefault);
    setEmail(emailDefault);
    setIsEdit(!isEdit);
  };

  const saveUserData = () => {
    updateUserInfo();
    dispatch(
      setUser({
        ...user,
        user: {
          ...user.user,
          name: name,
          email: email,
        },
      }),
    );
    setIsEdit(!isEdit);
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.menu}>
          <p className="text text_type_main-medium">Профиль</p>
          <p className="text text_type_main-medium text_color_inactive">
            История заказов
          </p>
          <p
            className="text text_type_main-medium text_color_inactive"
            onClick={logoutUser}
          >
            Выход
          </p>
        </div>
        <div className={styles.form}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => {
              setName(e.target.value);
            }}
            icon="EditIcon"
            value={name}
            ref={startEditUser}
            onIconClick={onClickEditUser}
            size="default"
            extraClass="ml-1 mb-4"
          />
          <Input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Логин"
            icon="EditIcon"
            ref={startEditUser}
            onIconClick={onClickEditUser}
            value={email}
            size="default"
            extraClass="ml-1 mb-4"
          />
          <Input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            icon="EditIcon"
            placeholder="Пароль"
            value={password}
            ref={startEditUser}
            onIconClick={onClickEditUser}
            size="default"
            extraClass="ml-1 mb-4"
          />
          {isEdit && (
            <div className={styles.editButtons}>
              <Button
                htmlType="button"
                type="primary"
                size="medium"
                onClick={cancelUserData}
              >
                Отменить
              </Button>
              <Button
                htmlType="button"
                type="primary"
                size="medium"
                onClick={saveUserData}
              >
                Сохранить
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
