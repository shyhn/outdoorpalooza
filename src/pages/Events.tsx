
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Users, ChevronDown, ChevronUp, List, Map as MapIcon } from 'lucide-react';
import Map from '../components/map/Map';
import BottomNavigation from '../components/layout/BottomNavigation';
import EventCard from '../components/events/EventCard';
import EventsFilter from '../components/events/EventsFilter';
import { mockEvents, EventData } from '@/data/mockEvents';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>(mockEvents);
  const [activeFilters, setActiveFilters] = useState<{
    type: string | null;
    difficulty: string | null;
    date: string | null;
  }>({
    type: null,
    difficulty: null,
    date: null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'split'>('split');

  // Handle search
  useEffect(() => {
    if (!searchQuery.trim()) {
      applyFilters(activeFilters);
      return;
    }

    const searchResults = mockEvents.filter(event => {
      const query = searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.type.toLowerCase().includes(query)
      );
    });

    setFilteredEvents(applyActiveFilters(searchResults, activeFilters));
  }, [searchQuery, activeFilters]);

  const applyActiveFilters = (events: EventData[], filters: typeof activeFilters) => {
    return events.filter(event => {
      // Type filter
      if (filters.type && event.type !== filters.type) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty && event.difficulty !== filters.difficulty) {
        return false;
      }

      // Very basic date filter (just checking if the event is in the future)
      if (filters.date === 'upcoming') {
        const eventDate = new Date(event.date);
        return eventDate > new Date();
      }

      return true;
    });
  };

  const applyFilters = (filters: typeof activeFilters) => {
    setFilteredEvents(applyActiveFilters(mockEvents, filters));
  };

  const handleFilterChange = (filterType: string, value: string | null) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value === activeFilters[filterType as keyof typeof activeFilters] ? null : value,
    };
    
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled by the useEffect above
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
          
          {/* View mode toggle */}
          <div className="flex justify-center mt-2">
            <div className="bg-white rounded-full shadow p-1 inline-flex">
              <button 
                onClick={() => setViewMode('list')}
                className={cn(
                  "px-4 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium transition-colors",
                  viewMode === 'list' ? "bg-forest-100 text-forest-800" : "text-gray-600 hover:text-forest-700"
                )}
              >
                <List className="h-4 w-4" />
                List
              </button>
              <button 
                onClick={() => setViewMode('split')}
                className={cn(
                  "px-4 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium transition-colors",
                  viewMode === 'split' ? "bg-forest-100 text-forest-800" : "text-gray-600 hover:text-forest-700"
                )}
              >
                <List className="h-4 w-4" />
                <MapIcon className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={cn(
                  "px-4 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium transition-colors",
                  viewMode === 'map' ? "bg-forest-100 text-forest-800" : "text-gray-600 hover:text-forest-700"
                )}
              >
                <MapIcon className="h-4 w-4" />
                Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-36 pb-20 px-4">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-4">
          {/* Map View (hidden on small screens when in list mode) */}
          {(viewMode === 'map' || viewMode === 'split') && (
            <div className={cn(
              "w-full transition-all",
              viewMode === 'map' ? 'h-[calc(100vh-12rem)]' : 'lg:w-1/2 h-[400px] lg:h-[calc(100vh-12rem)]'
            )}>
              <Map filteredEvents={filteredEvents} />
            </div>
          )}

          {/* List View */}
          {(viewMode === 'list' || viewMode === 'split') && (
            <div className={cn(
              "flex-1 flex flex-col gap-4",
              viewMode === 'split' ? 'lg:w-1/2' : 'w-full'
            )}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-forest-800">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select 
                    className="text-sm border-0 bg-transparent focus:ring-0"
                    defaultValue="date"
                  >
                    <option value="date">Date</option>
                    <option value="proximity">Proximity</option>
                    <option value="participants">Participants</option>
                  </select>
                </div>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-lg p-8 shadow text-center">
                  <p className="text-gray-500">No events found matching your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Events;
