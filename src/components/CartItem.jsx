import { AiFillDelete } from "react-icons/ai";
import useCartStore from "../StateMangamentLogic/Store"; // Adjust the import path as necessary
import { toast } from "react-hot-toast";

const CartItem = ({ item }) => {
  // Access Zustand store functions
  const remove = useCartStore((state) => state.remove);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);

  const removeFromCart = () => {
    remove(item.id);
    toast.success("Item Removed");
  };

  return (
    <div className="flex items-center p-2 md:p-5 justify-between mt-2 mb-2 md:mx-5 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row p-0 md:p-3 gap-5 items-center w-full">
        <div className="w-[30%]">
          <img className="object-cover" src={item.image} alt={item.title} />
        </div>
        <div className="md:ml-10 self-start space-y-5 w-[100%] md:w-[70%]">
          <h1 className="text-xl text-slate-700 font-semibold">{item.title}</h1>
          <h1 className="text-base text-slate-700 font-medium">{item.description}</h1>
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg text-green-600">₹{item.price.toFixed(2)}</p>
            <div className="flex items-center">
              {/* Decrease Button */}
              <button
                onClick={() => decrease(item.id)}
                className="bg-yellow-200 hover:bg-yellow-400 transition-transform duration-300 rounded-full p-2 mx-1"
              >
                -
              </button>
              {/* Quantity Display */}
              <span className="font-bold text-lg text-gray-800">{item.quantity || 1}</span>
              {/* Increase Button */}
              <button
                onClick={() => increase(item.id)}
                className="bg-green-200 hover:bg-green-400 transition-transform duration-300 rounded-full p-2 mx-1"
              >
                +
              </button>
              {/* Remove Button */}
              <div
                className="text-red-800 bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-2 mx-1"
                onClick={removeFromCart}
              >
                <AiFillDelete />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
