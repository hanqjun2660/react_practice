import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from "./components/Product.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  return (
    <CartContextProvider>   // children에서 Context를 사용하기 위해 CartContext.Provider를 반환하는 컴포넌트를 사용
      <Header />
      <Shop>
          {DUMMY_PRODUCTS.map((product) => (
              <li key={product.id}>
                <Product {...product} />
              </li>
          ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
