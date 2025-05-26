
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-600">
          <p>© {currentYear} WuDe TaijiQuan SA™. All rights reserved.</p>
          <p className="mt-1">
            WuDe™ and WuDe TaijiQuan™ are registered trademarks. 
            Unauthorized use is strictly prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
