import { useState } from "react";
import Calculator from "./components/Calculator/Calculator";
import RegistrationForm from "./components/Registration/RegistrationForm";
import ProductGrid from "./components/ProductGrid";
import { products } from "./data/products";
import { CartProvider } from "./components/CartContext";
import CartIcon from "./components/CartIcon";
import CartDropdown from "./components/CartDropdown";


const countryList = ["Vietnam", "United States", "Japan", "France", "Other"];
const hobbyList = ["Reading", "Traveling", "Cooking", "Other"];

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h2>1. Build a Calculator with React + TypeScript</h2>
      <Calculator />
      <h2>2. User Registration Form in React + TypeScript</h2>
      <RegistrationForm countryList={countryList} hobbyList={hobbyList} />
      <h2>3. Build a Simple Shopping Cart in React + TypeScript</h2>
      <CartProvider>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24, position: "relative" }}>
          <header style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ flex: 1 }}>Shopping Cart Example</h2>
            <CartIcon onClick={() => setOpen((o) => !o)} />
          </header>
          {open && <CartDropdown onClose={() => setOpen(false)} />}
          <ProductGrid products={products} />
        </div>
      </CartProvider>
    </div>
  );
}
export default App;