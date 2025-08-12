import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Home from './Home.js';
import About from "./About.js";
import LoginPage from "./pages/LoginPage.js";
import PizzaBuilder from "./pages/PizzaBuilder.js";
import ConfirmPage from "./pages/ConfirmPage.js"
import { CartProvider } from "./context/CartContext.js";
import "./App.css";

function App() {
  console.log("App called");
  return (
    <div className="app-container">
      <BrowserRouter>
        <nav>
          <Link to='/login'> Log In</Link>
        </nav>
        <CartProvider>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/pizzaBuilder' element={<PizzaBuilder />} />
            <Route path='/about' element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/confirm" element={<ConfirmPage />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>

  );
}

export default App;
/* 
 */