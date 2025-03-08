import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import styles from './burder-ingredients.module.scss';
import { IBurgerIngredient } from './dto';
import { selectIngedient } from '../../services/select-ingredients-slice';
import DraggableIngredient from './draggable-ingredient/draggable-ingredient';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

//всем привет! мой проект уже был прослосью типизирован TS, не знаю, что пушить :)))

function BurgerIngredients() {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState<string>('one');

  const dispatch: AppDispatch = useDispatch();
  const { list: dataIngredients } = useSelector(
    (state: RootState) => state.ingredients,
  );

  const handleIngredientClick = (ingredient: IBurgerIngredient) => {
    dispatch(selectIngedient(ingredient));

    // Передаём текущий location как background, чтобы знать, что нужно открыть модалку
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  // Логика переключения табов и скролла остается без изменений
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const fillingsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (value: string) => {
    setCurrent(value);
    if (value === 'one' && bunsRef.current) {
      bunsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (value === 'two' && saucesRef.current) {
      saucesRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (value === 'three' && fillingsRef.current) {
      fillingsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = useCallback(() => {
    if (
      !bunsRef.current ||
      !saucesRef.current ||
      !fillingsRef.current ||
      !containerRef.current
    ) {
      return;
    }

    const saucesTop = saucesRef.current.getBoundingClientRect().top;
    const fillingsTop = fillingsRef.current.getBoundingClientRect().top;
    const containerTop = containerRef.current.getBoundingClientRect().top;
    const offset = 50;

    if (fillingsTop - containerTop < offset) {
      setCurrent('three');
    } else if (saucesTop - containerTop < offset) {
      setCurrent('two');
    } else {
      setCurrent('one');
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <>
      <div className={styles.burger_page}>
        <div className={styles.container_select_burger}>
          <p className="text text_type_main-large mb-5">Соберите бургер</p>
          <div className={styles.tab_component}>
            <Tab
              value="one"
              active={current === 'one'}
              onClick={() => handleTabClick('one')}
            >
              Булки
            </Tab>
            <Tab
              value="two"
              active={current === 'two'}
              onClick={() => handleTabClick('two')}
            >
              Соусы
            </Tab>
            <Tab
              value="three"
              active={current === 'three'}
              onClick={() => handleTabClick('three')}
            >
              Начинки
            </Tab>
          </div>
          <div className={styles.scrollable} ref={containerRef}>
            <div ref={bunsRef}>
              <p className="text text_type_main-medium mb-4 mt-4">Булки</p>
              <div className={styles.burger_items}>
                {dataIngredients
                  .filter((ingredient) => ingredient.type === 'bun')
                  .map((ingredient) => (
                    <DraggableIngredient
                      key={ingredient._id}
                      ingredient={ingredient}
                      onClick={handleIngredientClick}
                    />
                  ))}
              </div>
            </div>
            <div ref={saucesRef}>
              <p className="text text_type_main-medium mb-4 mt-4">Соусы</p>
              <div className={styles.burger_items}>
                {dataIngredients
                  .filter((ingredient) => ingredient.type === 'sauce')
                  .map((ingredient) => (
                    <DraggableIngredient
                      key={ingredient._id}
                      ingredient={ingredient}
                      onClick={handleIngredientClick}
                    />
                  ))}
              </div>
            </div>
            <div ref={fillingsRef}>
              <p className="text text_type_main-medium mb-4 mt-4">Начинки</p>
              <div className={styles.burger_items}>
                {dataIngredients
                  .filter((ingredient) => ingredient.type === 'main')
                  .map((ingredient) => (
                    <DraggableIngredient
                      key={ingredient._id}
                      ingredient={ingredient}
                      onClick={handleIngredientClick}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <BurgerConstructor />
      </div>
      <Outlet />
    </>
  );
}

export default BurgerIngredients;
