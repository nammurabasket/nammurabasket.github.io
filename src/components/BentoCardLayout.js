import Product from './Product'; // Adjust the import path as necessary

const BentoCardLayout = ({ products }) => {
  return (
    <div>
      {products.length > 0 ? ( // Check if there are products to display
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Product key={product.id} post={product} /> // Use Product component for each product
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[80vh]">
          <p className="text-lg">No Products Available in this Category</p>
        </div>
      )}
    </div>
  );
};

export default BentoCardLayout;
