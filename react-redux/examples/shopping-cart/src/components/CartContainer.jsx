import { useEffect } from "react";
import { connect } from "react-redux";

import CartItem from "./CartItem";
import { CLEAR_CART, GET_TOTALS } from "../actions";

function CartContainer({ cart = [], totalAmount, dispatch }) {
  useEffect(() => {
    dispatch({ type: GET_TOTALS });
  });

  return (
    <section className="cart">
      <header className="">
        <h2>your bag</h2>
      </header>

      {cart.length === 0 ? (
        <h4 className="empty-cart">is currently empty</h4>
      ) : (
        <>
          <div className="">
            {cart.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
          </div>

          <footer className="">
            <hr />

            <div className="cart-total">
              <h4 className="">
                <span className="">total</span>
                <span>${parseFloat(totalAmount.toFixed(2))}</span>
              </h4>
            </div>

            <button
              onClick={() => dispatch({ type: CLEAR_CART })}
              className="btn clear-btn"
            >
              clear cart
            </button>
          </footer>
        </>
      )}
    </section>
  );
}

function mapStateToProps(state) {
  return { cart: state.cart, totalAmount: state.totalAmount };
}

export default connect(mapStateToProps)(CartContainer);
