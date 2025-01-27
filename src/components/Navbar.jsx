import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useCartStore from "../StateMangamentLogic/Store"; // Adjust the import path as necessary

const Navbar = () => {
  // Access cart from Zustand store
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="sticky top-0 z-50 bg-black"> {/* Ensure sticky and background color */}
      <nav className="flex justify-between items-center h-16 max-w-6xl mx-auto">
        <NavLink to="/">
          <div className="ml-4"> {/* Add left margin for padding */}
            <img src="../logo.png" className="h-14" alt="Logo" />
          </div>
        </NavLink>
        <div className="flex items-center font-medium text-slate-100 ml-auto mr-7 space-x-6">
          {/* <NavLink to="/" className='bg-richblack-800 text-white py-[6px] px-[12px] rounded-[8px]'>
            Home
          </NavLink> */}
          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl" aria-label="Shopping Cart" />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                  justify-center items-center animate-bounce rounded-full text-white"
                  aria-label={`You have ${cart.length} items in your cart`}
                >
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
