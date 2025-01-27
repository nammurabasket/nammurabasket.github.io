import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar here
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} /> {/* Only render Navbar here */}
      <Routes>
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
