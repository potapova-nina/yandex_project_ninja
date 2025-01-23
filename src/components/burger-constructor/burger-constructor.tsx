import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import styles from "./burger-constructor.module.scss";
import ingredientService from '../../service/burger-ingredients.service'
import { IBurgerIngredient } from "../burger-ingredients/dto";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ModalOverlay from "../modal-overlay/modal-overlay";

function BurgerConstructor() {
  const [dataIngredients, setDataIngredients] = useState<IBurgerIngredient[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  

  const getIngredients= async()=>{
    try {
      const response = await ingredientService.getIngredients();
      console.log(response?.data)
      setDataIngredients(response?.data)
    } catch (error) {
        console.error('Failed to fetch ingredients:', error);
    }
  }
  
    useEffect(()=>{
      getIngredients();
    },[])

    const handleOpenOrderModal = () => {
    setIsOrderModalOpen(true); // Открыть модалку
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false); // Закрыть модалку
  };

  return (
    <>
    <div className={styles.container}>
      {/* Верхняя фиксированная часть */}
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${dataIngredients[0]?.name} (верх)`}
        price={dataIngredients[0]?.price}
        thumbnail={dataIngredients[0]?.image}
        extraClass="ml-8"
      />

      {/* Список с прокруткой */}
      <div className={styles.scrollable}>
        {dataIngredients?.map((ingredient) => (
          <div key={ingredient._id} className={styles.ingredient}>
            {ingredient.type!=="bun" && (
              <>
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
            </>)}
          </div>
        ))}
      </div>
     
      {/* Нижняя фиксированная часть */}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${dataIngredients[0]?.name} (низ)`}
        price={dataIngredients[0]?.price}
        thumbnail={dataIngredients[0]?.image}
        extraClass="ml-9"
      />
       <div className={styles.order}>
        <p className="text text_type_digits-default mr-3">
              81460 
         </p>
         <CurrencyIcon type="primary" className="mr-10"/>
      <Button htmlType={"button"}  onClick={handleOpenOrderModal}>Оформить заказ</Button>
       
      </div>
    </div>
    {isOrderModalOpen && (
      <>
        <Modal onClose={handleCloseOrderModal} title=" ">
          <OrderDetails />
        </Modal>
        <ModalOverlay onClose={handleCloseOrderModal} />
        </>
      )}
    
    
    </>
  );
}

export default BurgerConstructor;
