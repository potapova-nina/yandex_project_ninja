import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.scss';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { AppDispatch, RootState } from './services/store';
import { useEffect } from 'react';
import { fetchIngredients } from './services/ingredients-slice';

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
      <AppHeader />
      <main>
        <div className={styles.mainApp}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
}

export default App;
