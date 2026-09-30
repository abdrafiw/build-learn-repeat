import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";

import { Provider } from "react-redux";

import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartContainer />
    </Provider>
  );
}

export default App;
