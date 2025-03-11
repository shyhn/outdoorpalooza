
import React from 'react';
import BottomNavigation from '../components/layout/BottomNavigation';
import { Search } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-forest-50">
      {/* Search Bar */}
      <div className="fixed top-0 left-0 right-0 p-4 bg-white bg-opacity-90 backdrop-blur-lg z-40">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Find outdoor events near you..."
              className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 focus:outline-none focus:border-forest-500 bg-white"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-20 pb-20 px-4">
        {/* Placeholder for Map */}
        <div className="w-full h-[calc(100vh-8rem)] bg-earth-100 rounded-lg shadow-inner flex items-center justify-center">
          <p className="text-earth-600 text-lg">Interactive Map Coming Soon</p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;
