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
  }

  if (action.type === 'REMOVE') {
    // Checking which item was removed from cart
    const existingItemIndex = state.items.findIndex(
      item => item.id === action.id
    );

    // Storing the existing item in exisitingItem
    const existingItem = state.items[existingItemIndex];

    // Changing the total amount with removing items
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    // Checking the existing item if it's amount is =1 to remove it after reducing the amount
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      // Changing the amount and stoing it in updatedItem
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };

      // Copying the whole array
      updatedItems = [...state.items];

      // updating the array with updated amount item (updatedItem)
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
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
