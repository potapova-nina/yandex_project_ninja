import IngredientsDetails from "../ingredients-details/ingredients-details";
import styles from './ingredient-items.module.scss';

interface IIngredientsItemsProps {
  image: string;
  name: string;
  price: number;
}

function IngredientsItems({ image, name, price }: IIngredientsItemsProps) {
  return (
    <>
    <div className={styles.burger_item}>
      <img src={image} alt={name} />
      <IngredientsDetails name={name} price={price} />
    </div>
    </>
  );
}

export default IngredientsItems;
