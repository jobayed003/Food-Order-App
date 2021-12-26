import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );

    const existingItem = state.items[existingItemIndex];

    // console.log(existingItem, action.item.amount);

    let updatedItems;

    if (existingItem) {
      // Update the existing item amount
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };

      // set the whole array to updatedItems
      updatedItems = [...state.items];

      // swap the existing items to updatedItem
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === 'remove') {
    console.log('remove item');
  }
  return defaultState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemHandler = item => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
