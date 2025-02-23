import { FC, ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../../pages/login/login';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import ForgotPassword from '../../pages/login/forgot-password/forgot-password';
import ResetPassword from '../../pages/login/reset-password/reset-password';
import RegisterPage from '../../pages/register/register';
import Profile from '../../pages/profile/profile';

export const AppRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/burgers" element={<BurgerIngredients />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// import { FC, ReactElement } from 'react';
// import { Navigate, Route, Router, Routes } from 'react-router-dom';
// import LoginPage from '../../components/login/login';

// export const AppRouter: FC = (): ReactElement => {
//   return (
//     <Routes>
//       {/* {auth ? (
//         <>
//           {filteredRoutes
//             .filter((element) => element.path !== '/auth')
//             .map(({ title, path, element }) => (
//               <Route
//                 key={title}
//                 path={path}
//                 element={<SuspenseRoute element={element} />}
//               />
//             ))}
//           <Route path="*" element={<Navigate to="/main" />} />
//         </>
//       ) : ( */}

//       <Route path="/login" element={<LoginPage />} />
//       {/* <Route path="/forgot-password" element={</>} /> */}
//       {/* <Route path="/reset-password" element={</>} /> */}
//       {/* <Route path="/register" element={<FeedbackPageAsync />} /> */}

//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// };
