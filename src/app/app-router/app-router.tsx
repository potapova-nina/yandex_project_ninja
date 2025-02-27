import { FC, ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../../pages/login/login';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import ForgotPassword from '../../pages/login/forgot-password/forgot-password';
import ResetPassword from '../../pages/login/reset-password/reset-password';
import RegisterPage from '../../pages/register/register';
import Profile from '../../pages/profile/profile';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

export const AppRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
      <Route
        path="/forgot-password"
        element={<OnlyUnAuth component={<ForgotPassword />} />}
      />
      <Route
        path="/reset-password"
        element={<OnlyUnAuth component={<ResetPassword />} />}
      />
      <Route
        path="/register"
        element={<OnlyUnAuth component={<RegisterPage />} />}
      />
      <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />

      {/* Маршрут для ингредиентов с вложенным модальным окном */}
      <Route path="/ingredients" element={<BurgerIngredients />}>
        <Route path=":ingredientId" element={<IngredientDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
