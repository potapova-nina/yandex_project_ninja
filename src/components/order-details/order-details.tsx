import React from "react";
import styles from "./order-details.module.scss";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";


const OrderDetails: React.FC = () => {
  return (
    <div className={styles.orderDetails}>
      <div>
      
   <p className="text text_type_digits-large">034536</p>
        <p className="text text_type_main-default text_color_inactive">идентификатор заказа</p>
        </div>

         <CheckMarkIcon type="primary" />
      <div>
    <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
      </div>
    </div>
  );
};

export default OrderDetails;
