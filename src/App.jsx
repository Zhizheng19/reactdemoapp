import  { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import About from "./About";
import LoginPage from "./pages/LoginPage";
import PizzaBuilder from "./pages/PizzaBuilder";
import ConfirmPage from "./pages/ConfirmPage";
import { CartProvider } from "./context/CartContext";


function App() {
  console.log("App called");
  return (
     <div className="app-container">
      <BrowserRouter>
        <nav className="w-full p-4">
          <Link to='/login'className="text-blue-900 font-semibold hover:underline"> Log In</Link>
        </nav>
        <CartProvider>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/pizza-builder' element={<PizzaBuilder />} />
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
