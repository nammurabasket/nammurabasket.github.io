// src/components/CategoryNav.js
import React from 'react';

const CategoryNav = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <nav className="bg-gray-200 p-4 overflow-auto whitespace-nowrap">
      <ul className="flex space-x-4">
        {Object.keys(categories).map((category) => (
          <li key={category}>
            <button
              className={`text-lg font-semibold py-2 px-4 rounded ${
                selectedCategory === category ? 'bg-blue-500 text-white' : 'text-blue-600'
              } hover:bg-blue-300`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNav;
