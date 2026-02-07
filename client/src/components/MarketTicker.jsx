import React from 'react';

const MarketTicker = () => {
  return (
    <div className="bg-primary text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4">Wheat: $320 ▲</span>
        <span className="mx-4">Rice: $410 ▼</span>
        <span className="mx-4">Corn: $250 ▲</span>
        <span className="mx-4">Soybean: $380 ▼</span>
        <span className="mx-4">Cotton: $150 ▲</span>
      </div>
    </div>
  );
};

export default MarketTicker;
