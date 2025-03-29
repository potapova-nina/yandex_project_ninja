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
import ProfileOrderHistory from '../../components/profile-order-history/profile-order-history';

type TabType = 'profile' | 'orders';

function Profile() {
  const { user } = useSelector((state: RootState) => state.login);
  const dispatch: AppDispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const startEditUser = useRef<HTMLInputElement | null>(null);

  const refreshToken = localStorage.getItem('refreshToken') || '';
  const accessToken = localStorage.getItem('accessToken') || '';
  const nameDefault = user.user.name;
  const emailDefault = user.user.email;

  const logoutUser = async () => {
    await UserAuthAPI.postLogoutRequest(refreshToken);
    dispatch(
      setUser({
        success: false,
        user: { email: '', name: '' },
        accessToken: '',
        refreshToken: '',
      }),
    );
    localStorage.clear();
  };

  const getUserInfo = async () => {
    const response = await UserAuthAPI.getDataAboutUser(accessToken);
    setName(response.user.name);
    setEmail(response.user.email);
  };

  const updateUserInfo = async () => {
    const data = { name, email };
    const response = await UserAuthAPI.updateDataAboutUser(accessToken, data);
    setName(response.user.name);
    setEmail(response.user.email);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onClickEditUser = () => setIsEdit(!isEdit);
  const cancelUserData = () => {
    setName(nameDefault);
    setEmail(emailDefault);
    setIsEdit(false);
  };
  const saveUserData = () => {
    updateUserInfo();
    dispatch(
      setUser({
        ...user,
        user: { ...user.user, name, email },
      }),
    );
    setIsEdit(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.menu}>
        <p
          className={`text text_type_main-medium ${activeTab === 'profile' ? '' : 'text_color_inactive'}`}
          onClick={() => setActiveTab('profile')}
        >
          Профиль
        </p>
        <p
          className={`text text_type_main-medium ${activeTab === 'orders' ? '' : 'text_color_inactive'}`}
          onClick={() => setActiveTab('orders')}
        >
          История заказов
        </p>
        <p
          className="text text_type_main-medium text_color_inactive"
          onClick={logoutUser}
        >
          Выход
        </p>
        <p className="text text_type_main-default text_color_inactive mt-20">
          {activeTab === 'orders'
            ? 'В этом разделе вы можете просмотреть свою историю заказов'
            : 'В этом разделе вы можете изменить свои персональные данные'}
        </p>
      </div>

      <div className={styles.form}>
        <RenderProfileContent
          activeTab={activeTab}
          name={name}
          email={email}
          password={password}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          isEdit={isEdit}
          startEditUser={startEditUser}
          onClickEditUser={onClickEditUser}
          cancelUserData={cancelUserData}
          saveUserData={saveUserData}
        />
      </div>
    </div>
  );
}

export default Profile;

type ContentProps = {
  activeTab: TabType;
  name: string;
  email: string;
  password: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  isEdit: boolean;
  startEditUser: React.RefObject<HTMLInputElement>;
  onClickEditUser: () => void;
  cancelUserData: () => void;
  saveUserData: () => void;
};

const RenderProfileContent = ({
  activeTab,
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  isEdit,
  startEditUser,
  onClickEditUser,
  cancelUserData,
  saveUserData,
}: ContentProps) => {
  switch (activeTab) {
    case 'orders':
      return <ProfileOrderHistory />;
    case 'profile':
    default:
      return (
        <>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            icon="EditIcon"
            value={name}
            ref={startEditUser}
            onIconClick={onClickEditUser}
            size="default"
            extraClass="ml-1 mb-4"
          />
          <Input
            type="text"
            placeholder="Логин"
            onChange={(e) => setEmail(e.target.value)}
            icon="EditIcon"
            value={email}
            ref={startEditUser}
            onIconClick={onClickEditUser}
            size="default"
            extraClass="ml-1 mb-4"
          />
          <Input
            type="text"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            icon="EditIcon"
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
        </>
      );
  }
};
