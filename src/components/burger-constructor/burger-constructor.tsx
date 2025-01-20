import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { arrayDataBurger, IBurgerIngredient } from "../burger-ingredients/dto";
import styles from "./burger-constructor.module.scss";

function BurgerConstructor() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataIngredients, setDataIngredients] = useState<IBurgerIngredient[]>(arrayDataBurger);

  return (
    <>
    <div className={styles.container}>
      {/* Верхняя фиксированная часть */}
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${dataIngredients[0].name} (верх)`}
        price={dataIngredients[0].price}
        thumbnail={dataIngredients[0].image}
        extraClass="ml-8"
      />

      {/* Список с прокруткой */}
      <div className={styles.scrollable}>
        {dataIngredients.map((ingredient) => (
          <div key={ingredient._id} className={styles.ingredient}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </div>
        ))}
      </div>
     
      {/* Нижняя фиксированная часть */}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${dataIngredients[0].name} (низ)`}
        price={dataIngredients[0].price}
        thumbnail={dataIngredients[0].image}
        extraClass="ml-9"
      />
       <div className={styles.order}>
        <p className="text text_type_digits-default mr-3">
              81460 
         </p>
         <CurrencyIcon type="primary" className="mr-10"/>
      <Button htmlType={"button"}>Оформить заказ</Button>
       
      </div>
    </div>
    
    </>
  );
}

export default BurgerConstructor;
