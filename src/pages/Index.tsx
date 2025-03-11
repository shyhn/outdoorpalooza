
import React, { useState } from 'react';
import BottomNavigation from '../components/layout/BottomNavigation';
import { Search } from 'lucide-react';
import Map from '../components/map/Map';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Here we would typically filter events or locations based on the search
  };

  return (
    <div className="min-h-screen bg-forest-50">
      {/* Search Bar */}
      <div className="fixed top-0 left-0 right-0 p-4 bg-white bg-opacity-90 backdrop-blur-lg z-40">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Find outdoor events near you..."
                className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 focus:outline-none focus:border-forest-500 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </form>
        </div>
      </div>

      {/* Main Content - Interactive Map */}
      <main className="pt-20 pb-20 px-4">
        <div className="w-full h-[calc(100vh-8rem)]">
          <Map />
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;
