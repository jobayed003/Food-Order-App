import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numOfItems = items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const btnClasses = `${classes.button}  ${btnHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighlighted(true);
    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfItems}</span>
    </button>
  );
};
export default HeaderCartButton;
