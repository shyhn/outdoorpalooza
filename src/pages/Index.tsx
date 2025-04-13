
import React from 'react';
import BottomNavigation from '../components/layout/BottomNavigation';
import Map from '../components/map/Map';

const Index = () => {
  return (
    <div className="min-h-screen bg-forest-50">
      {/* Main Content - Interactive Map */}
      <main className="pt-4 pb-20 px-4">
        <div className="w-full h-[calc(100vh-6rem)]">
          <Map />
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;
