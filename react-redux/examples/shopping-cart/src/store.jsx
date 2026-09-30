import cartItems from "./cart-items.json";
import { legacy_createStore as createStore } from "redux";
import { reducer } from "./reducer";

const initialState = {
  cart: cartItems,
  totalAmount: 0,
  totalItems: 0,
};

export const store = createStore(reducer, initialState);
