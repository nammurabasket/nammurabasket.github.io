import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import BentoCardLayout from "../components/BentoCardLayout"; 
import Footer from "../components/BottomNavbar"; 
import CategoryNav from "../components/CategoryNav"; 

const Home = ({ isLoggedIn }) => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

  async function fetchProductData() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      // Organize products by category
      const categorizedProducts = data.reduce((acc, product) => {
        const category = product.category || "Other"; 
        if (!acc[category]) {
          acc[category] = []; 
        }
        acc[category].push(product); 
        return acc;
      }, {});

      setCategories(categorizedProducts); 
    } catch (error) {
      console.log(error);
      setCategories({}); 
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="p-4">
        {loading ? (
          <Spinner />
        ) : Object.keys(categories).length > 0 ? (
          <>
            <CategoryNav 
              categories={categories} 
              onSelectCategory={handleSelectCategory} 
              selectedCategory={selectedCategory} 
            />
            <BentoCardLayout products={selectedCategory ? categories[selectedCategory] : []} />
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[80vh]">
            <p className="text-lg">No Data Found</p>
          </div>
        )}
      </div>
      <Footer /> 
    </div>
  );
};

export default Home;
