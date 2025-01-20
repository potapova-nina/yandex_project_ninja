import styles from './App.module.scss'
import AppHeader from './components/app-header/app-header'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'

function App() {
  return (
    <>
    
    <AppHeader />
    <main>
    <div className={styles.mainApp}>
    <BurgerIngredients />
    <BurgerConstructor />
    </div>
    </main>
    </>
  )
}

export default App
