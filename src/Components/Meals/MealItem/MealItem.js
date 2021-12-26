import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = ({ meals }) => {
  const cartCtx = useContext(CartContext);

  const price = `$${meals.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: meals.id,
      name: meals.name,
      amount: amount,
      price: meals.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{meals.name}</h3>
        <div className={classes.description}>{meals.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={meals.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
