
import React, { useState } from 'react';
import BottomNavigation from '../components/layout/BottomNavigation';
import Map from '../components/map/Map';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventsFilter from '../components/events/EventsFilter';
import { mockEvents } from '@/data/mockEvents';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    type: string | null;
    difficulty: string | null;
    date: string | null;
  }>({
    type: null,
    difficulty: null,
    date: null,
  });
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would filter events based on search query
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filterType: string, value: string | null) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value === activeFilters[filterType as keyof typeof activeFilters] ? null : value,
    };
    
    setActiveFilters(newFilters);
    // Here we would filter events based on the new filters
    // This is just a placeholder, the actual filtering would depend on your implementation
  };

  return (
    <div className="min-h-screen bg-forest-50">
      {/* Search Bar */}
      <div className="fixed top-0 left-0 right-0 p-4 bg-white bg-opacity-90 backdrop-blur-lg z-40">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
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
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-2 top-1.5 h-9 w-9 rounded-full"
                onClick={toggleFilters}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </form>
          
          {showFilters && (
            <div className="bg-white rounded-lg p-4 shadow-md mt-2 animate-in fade-in">
              <EventsFilter
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Interactive Map */}
      <main className="pt-28 pb-20 px-4">
        <div className="w-full h-[calc(100vh-12rem)]">
          <Map filteredEvents={filteredEvents} />
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;
