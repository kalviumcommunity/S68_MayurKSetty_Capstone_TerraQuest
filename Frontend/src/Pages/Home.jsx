import React from 'react';

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-gray-800">Welcome Home</h1>
        <p className="mt-2 text-gray-600">This is my home page.</p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
