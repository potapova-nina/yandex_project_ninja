import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.scss';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../services/store';
import { fetchIngredients } from '../services/ingredients-slice';
import AppHeader from '../components/app-header/app-header';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { AppRouter } from './app-router/app-router';
import { BrowserRouter, Router } from 'react-router-dom';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIngredients());
    }
  }, [dispatch, status]);
  return (
    //выполнено
    <>
      <BrowserRouter>
        <AppHeader />
        <main>
          <AppRouter />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
