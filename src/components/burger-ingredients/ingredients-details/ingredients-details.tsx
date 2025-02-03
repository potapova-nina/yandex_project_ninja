import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredients-details.module.scss';

interface IIngredientsDetailsProps {
  "name":string,
  "price":number,
}

function IngredientsDetails(dataBurgerIngredients : IIngredientsDetailsProps) {
  return (
    <> 
    <div className={styles.details}>
      <p className="text text_type_main-medium ml-20 mb-3">
        {dataBurgerIngredients.price} 
      </p>
      <CurrencyIcon type="primary" />
      </div>
  
      <p className="text text_type_main-default">
        {dataBurgerIngredients.name}
      </p>

    </>
  );
}

export default IngredientsDetails;
