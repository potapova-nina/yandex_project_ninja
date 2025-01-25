import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect, useRef, useState } from "react"
import IngredientsItems from "./ingredient-items/ingredient-items"
import styles from './burder-ingredients.module.scss';
import ingredientService from '../../api/burger-ingredients.api'
import { IBurgerIngredient } from "./dto";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ModalOverlay from "../modal-overlay/modal-overlay";




function BurgerIngredients() {
   const [current, setCurrent] = useState<string>('one')
   const [dataIngredients, setDataIngredients] = useState<IBurgerIngredient[]>([]);
   const [selectedIngredient, setSelectedIngredient] = useState<IBurgerIngredient | null>(null);

  const handleIngredientClick = (ingredient: IBurgerIngredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleCloseModal = () => {
    setSelectedIngredient(null);
  };

  const getIngredients= async()=>{
    try {
      const response = await ingredientService.getIngredients();
      setDataIngredients(response?.data)
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    }
  }

  useEffect(()=>{
    getIngredients();
  },[])


    // Создаем ref для каждой категории
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const fillingsRef = useRef<HTMLDivElement>(null);

  // Функция для прокрутки
  const handleTabClick = (value: string) => {
    setCurrent(value);
    if (value === "one" && bunsRef.current) {
      bunsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === "two" && saucesRef.current) {
      saucesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === "three" && fillingsRef.current) {
      fillingsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className={styles.container_select_burger}>
        <p className="text text_type_main-large mb-5">Соберите бургер</p>

        {/* Табы */}
        <div className={styles.tab_component}>
          <Tab value="one" active={current === "one"} onClick={() => handleTabClick("one")}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={() => handleTabClick("two")}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={() => handleTabClick("three")}>
            Начинки
          </Tab>
        </div>

        {/* Область с ингредиентами */}
        <div className={styles.scrollable}>
          {/* Булки */}
          <div ref={bunsRef}>
            <p className="text text_type_main-medium mb-4 mt-4">Булки</p>
            <div className={styles.burger_items}>
              {dataIngredients
                .filter((ingredient) => ingredient.type === "bun")
                .map((ingredient) => (
                  <div  key={ingredient._id} onClick={() => handleIngredientClick(ingredient)} >
                  <IngredientsItems
                    key={ingredient._id}
                    image={ingredient.image}
                    name={ingredient.name}
                    price={ingredient.price}
                  />
                  </div>
                ))}
            </div>
          </div>

          {/* Соусы */}
          <div ref={saucesRef}>
            <p className="text text_type_main-medium mb-4 mt-4">Соусы</p>
            <div className={styles.burger_items}>
              {dataIngredients
                .filter((ingredient) => ingredient.type === "sauce")
                .map((ingredient) => (
                   <div  key={ingredient._id} onClick={() => handleIngredientClick(ingredient)} >
                  <IngredientsItems
                    key={ingredient._id}
                    image={ingredient.image}
                    name={ingredient.name}
                    price={ingredient.price}
                  />
                  </div>
                ))}
            </div>
          </div>

          {/* Начинки */}
          <div ref={fillingsRef}>
            <p className="text text_type_main-medium mb-4 mt-4">Начинки</p>
            <div className={styles.burger_items}>
              {dataIngredients
                .filter((ingredient) => ingredient.type === "main")
                .map((ingredient) => (
                   <div  key={ingredient._id} onClick={() => handleIngredientClick(ingredient)} >
                  <IngredientsItems
                    key={ingredient._id}
                    image={ingredient.image}
                    name={ingredient.name}
                    price={ingredient.price}
                  />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {selectedIngredient && (
        <>
          <Modal onClose={handleCloseModal} title="Детали ингредиента">
            <IngredientDetails ingredient={selectedIngredient} />
          </Modal>
          <ModalOverlay onClose={handleCloseModal} />
        </>
      )}
    </>
  )
}

export default BurgerIngredients
