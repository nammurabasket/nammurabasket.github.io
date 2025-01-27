import React from 'react';

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-around shadow-lg">
      <a 
        href="https://merchant.razorpay.com/policy/PgPXlHURcIQ35N/terms" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:underline"
      >
        Terms
      </a>
      <a 
        href="https://merchant.razorpay.com/policy/PgPXlHURcIQ35N/refund" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:underline"
      >
        Refund
      </a>
      <a 
        href="https://merchant.razorpay.com/policy/PgPXlHURcIQ35N/shipping" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:underline"
      >
        Shipping
      </a>
    </div>
  );
};

export default BottomNavbar;
