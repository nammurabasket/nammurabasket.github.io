import { toast } from "react-hot-toast";
import useCartStore from "../StateMangamentLogic/Store"; // Adjust the import path as necessary
import { AiFillDelete } from "react-icons/ai";

const Product = ({ post }) => {
  const cart = useCartStore((state) => state.cart);
  const add = useCartStore((state) => state.add);
  const remove = useCartStore((state) => state.remove);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);

  const addToCart = () => {
    add(post);
    toast.success("Item added to Cart");
  };

  const handleRemoveFromCart = () => {
    remove(post.id);
    toast.error("Item removed from Cart");
  };

  return (
    <div className="flex flex-col justify-between p-4 mt-5 rounded-lg border border-gray-300 shadow-md transition-transform transform hover:scale-105 h-full bg-white relative">
      {/* Badge for discounts or new products */}
      {post.discount && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
          {post.discount} OFF
        </span>
      )}
      <div className="flex-grow relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="h-[180px] w-full object-cover rounded-md mb-2" 
          onError={(e) => { e.target.src = 'path/to/placeholder/image.jpg'; }} // Ensure this points to a valid placeholder
        />
        <h3 className="text-gray-800 font-semibold text-lg truncate">{post.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{post.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
        <p className="text-green-600 font-bold mt-2 text-xl">₹{post.price}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        {cart.some((p) => p.id === post.id) ? (
          <div className="flex items-center">
            <button
              onClick={() => {
                const itemInCart = cart.find((item) => item.id === post.id);
                if (itemInCart && itemInCart.quantity > 1) {
                  decrease(post.id); // Decrease quantity
                } else {
                  handleRemoveFromCart(); // Remove item if quantity is zero or less
                }
              }}
              className="text-gray-700 border border-gray-700 rounded-full font-semibold text-sm p-1 px-3 hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
              aria-label={`Decrease quantity of ${post.title}`}
            >
              -
            </button>
            <span className="mx-2 text-sm">
              {cart.find((item) => item.id === post.id)?.quantity || 1}
            </span>
            <button
              onClick={() => increase(post.id)}
              className="text-gray-700 border border-gray-700 rounded-full font-semibold text-sm p-1 px-3 hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
              aria-label={`Increase quantity of ${post.title}`}
            >
              +
            </button>
            <button
              onClick={handleRemoveFromCart}
              className="text-red-600 border border-red-600 rounded-full font-semibold text-sm p-1 px-3 ml-2 hover:bg-red-600 hover:text-white transition duration-300 ease-in"
              aria-label={`Remove ${post.title} from cart`}
            >
             <AiFillDelete />
            </button>
          </div>
        ) : (
          <button
            onClick={addToCart}
            className="w-full bg-blue-600 text-white rounded-full font-semibold text-sm p-2 hover:bg-blue-700 transition duration-300 ease-in"
            aria-label={`Add ${post.title} to cart`}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
