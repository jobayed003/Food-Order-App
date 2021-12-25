import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = props => {
  const price = `$${props.meals.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meals.name}</h3>
        <div className={classes.description}>{props.meals.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm />
      </div>
    </li>
  );
};

export default MealItem;
