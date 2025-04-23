
import React from 'react';

interface IKhokhaButtonProps {
  merchantUrl: string;
  amount?: string;
  className?: string;
}

const IKhokhaButton: React.FC<IKhokhaButtonProps> = ({ merchantUrl, amount, className = '' }) => {
  return (
    <div className={`w-40 ${className}`}>
      <h6 className="m-2.5 p-0 font-sans text-sm text-[#1d1d1b]">ZenForce</h6>
      
      <a href={merchantUrl} className="no-underline">
        <div className="overflow-hidden flex justify-center items-center w-full h-12 bg-[#0BB3BF] text-white border border-[#e5e5e5] shadow-sm rounded-2xl font-medium">
          Pay Now
        </div>
      </a>
      
      <h6 className="m-1 p-0 text-[8px] font-sans text-center">
        Powered by iKhokha
      </h6>
    </div>
  );
};

export default IKhokhaButton;
