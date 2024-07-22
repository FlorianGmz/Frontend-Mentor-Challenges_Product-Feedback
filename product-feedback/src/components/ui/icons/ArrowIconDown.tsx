import React from "react";

interface ArrowIconDownProps {
  color: string;
}

const ArrowIconDown: React.FC<ArrowIconDownProps> = ({ color }) => {
  return (
    <div>
      <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1l4 4 4-4"
          stroke={color}
          stroke-width="3"
          fill="none"
          fill-rule="evenodd"
        />
      </svg>
    </div>
  );
};

export default ArrowIconDown;
