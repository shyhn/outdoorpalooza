
import React, { useState, useEffect } from 'react';
import BottomNavigation from '../components/layout/BottomNavigation';
import Map from '../components/map/Map';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventsFilter from '../components/events/EventsFilter';
import { mockEvents, EventData } from '@/data/mockEvents';
import LocationAutocomplete, { LocationData } from '../components/search/LocationAutocomplete';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [activeFilters, setActiveFilters] = useState<{
    type: string | null;
    difficulty: string | null;
    date: string | null;
  }>({
    type: null,
    difficulty: null,
    date: null,
  });
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>(mockEvents);

  // Effect to filter events when search query, location, or active filters change
  useEffect(() => {
    let results = [...mockEvents];
    
    // Filter by text search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected location
    if (selectedLocation) {
      results = results.filter(event => {
        // Match par pays
        if (selectedLocation.type === 'country') {
          return event.location.country === selectedLocation.name;
        }
        // Match par région
        else if (selectedLocation.type === 'region') {
          return event.location.region === selectedLocation.name;
        }
        // Match par ville
        else if (selectedLocation.type === 'city') {
          return event.location.city === selectedLocation.name;
        }
        return true;
      });
    }
    
    // Filter by type
    if (activeFilters.type) {
      results = results.filter(event => event.type === activeFilters.type);
    }
    
    // Filter by difficulty
    if (activeFilters.difficulty) {
      results = results.filter(event => event.difficulty === activeFilters.difficulty);
    }
    
    // Filter by date
    if (activeFilters.date) {
      const today = new Date();
      const weekend = new Date(today);
      weekend.setDate(today.getDate() + (6 - today.getDay())); // Next Saturday
      
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      results = results.filter(event => {
        const eventDate = new Date(event.date);
        
        switch (activeFilters.date) {
          case 'upcoming':
            return eventDate >= today;
          case 'weekend':
            return eventDate >= today && eventDate <= weekend;
          case 'month':
            return eventDate >= today && eventDate <= endOfMonth;
          default:
            return true;
        }
      });
    }
    
    setFilteredEvents(results);
  }, [searchQuery, selectedLocation, activeFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Le filtrage est géré par l'useEffect ci-dessus
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
  };

  const handleLocationSelect = (location: LocationData | null) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-forest-50">
      {/* Search Bar */}
      <div className="fixed top-0 left-0 right-0 p-4 bg-white bg-opacity-90 backdrop-blur-lg z-40">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <LocationAutocomplete
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
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
