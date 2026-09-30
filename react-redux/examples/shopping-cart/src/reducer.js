import { CLEAR_CART, REMOVE, TOGGLE_QUANTITY, GET_TOTALS } from "./actions";

export function reducer(state, action) {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload.id),
    };
  }

  if (action.type === TOGGLE_QUANTITY) {
    const newCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        if (action.payload.type === "inc") {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
      }

      return cartItem;
    });
    return { ...state, cart: newCart };
  }

  if (action.type === GET_TOTALS) {
    const { totalAmount, totalItems } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, quantity } = cartItem;
        cartTotal.totalItems += quantity;
        cartTotal.totalAmount += price * quantity;

        return cartTotal;
      },

      {
        totalAmount: 0,
        totalItems: 0,
      },
    );

    return { ...state, totalAmount, totalItems };
  }

  return state;
}
