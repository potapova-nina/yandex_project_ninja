import { FC } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import LoginPage from '../../pages/login/login';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import ForgotPassword from '../../pages/login/forgot-password/forgot-password';
import ResetPassword from '../../pages/login/reset-password/reset-password';
import RegisterPage from '../../pages/register/register';
import Profile from '../../pages/profile/profile';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Modal from '../../components/modal/modal';
import Feed from '../../components/feed/feed';
import FeedCard from '../../components/feed-card/feed-card';

export const AppRouter: FC = () => {
  const location = useLocation();
  const background = location.state?.background; // Фон для модального окна

  return (
    <>
      <Routes location={background || location}>
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
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
        <Route path="/feed" element={<Feed />} />

        <Route path="/feed/:orderId" element={<FeedCard />} />

        {/* Главная страница ингредиентов */}
        <Route path="/ingredients" element={<BurgerIngredients />} />

        {/* Детальная страница ингредиента (без модалки, отображается при прямом переходе) */}
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Отдельное рендеринг модального окна, если есть background */}
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal
                onClose={() => window.history.back()}
                title="Детали ингредиента"
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/feed/:orderId"
            element={
              <Modal
                onClose={() => window.history.back()}
                title="Детали заказа"
              >
                <FeedCard />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
