import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../services/store';
import { fetchIngredients } from '../services/ingredients-slice';
import AppHeader from '../components/app-header/app-header';
import { AppRouter } from './app-router/app-router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const dispatch: AppDispatch = useAppDispatch();
  const { status } = useAppSelector((state: RootState) => state.ingredients);

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
