import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home.js';
import About from "./About.js";
import LoginPage from "./pages/LoginPage.js";

function App() {
  console.log("App called");
  return (
    <BrowserRouter>
      <nav>
       <Link to='/'>Home</Link> | <Link to="/about">About</Link> | <Link to='/login'> Log In</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
/* 
 */