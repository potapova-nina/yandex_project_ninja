import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthChecked, getUser } from '../services/login-slice';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component,
}: TProtectedProps): React.JSX.Element => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <p>Загрузка...</p>;
  }

  // Для страниц, доступных только для неавторизованных пользователей
  if (onlyUnAuth && user?.accessToken) {
    const from = location.state?.from || { pathname: '/ingredients' };
    return <Navigate to={from} />;
  }

  // Для защищённых страниц, если нет accessToken — редирект на логин
  if (!onlyUnAuth && !user?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component,
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <Protected onlyUnAuth={true} component={component} />;
