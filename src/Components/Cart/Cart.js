import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemovehandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddhandler = item => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          items={item}
          onRemove={cartItemRemovehandler.bind(null, item.id)}
          onAdd={cartItemAddhandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={props.onClose}>
              Order
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
