import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-primary h-96">
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Unifying Global Agriculture</h1>
          <p className="text-xl md:text-2xl mb-8">Connect, Learn, and Grow with UniField</p>
          <button className="bg-primary text-white px-8 py-3 rounded-md text-lg hover:bg-primary/80">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
