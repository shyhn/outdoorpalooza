
import { useState, useEffect } from 'react';
import { LocationData } from '@/types/location';
import { locationData } from '@/data/locationData';

export const useLocationSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<LocationData[]>(locationData);
  const [recentSelections, setRecentSelections] = useState<LocationData[]>([]);

  useEffect(() => {
    try {
      const savedSelections = localStorage.getItem('recentLocationSelections');
      if (savedSelections) {
        const parsed = JSON.parse(savedSelections);
        setRecentSelections(parsed.slice(0, 5));
      }
    } catch (error) {
      console.warn('Error loading recent selections', error);
    }
  }, []);

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredLocations(locationData);
      return;
    }

    const query = searchValue.toLowerCase();
    const filtered = locationData.filter(location => 
      location.name.toLowerCase().includes(query) || 
      (location.region && location.region.toLowerCase().includes(query)) ||
      (location.country && location.country.toLowerCase().includes(query))
    );
    setFilteredLocations(filtered);
  }, [searchValue]);

  const updateRecentSelections = (location: LocationData) => {
    const newRecentSelections = [
      location,
      ...recentSelections.filter(item => item.id !== location.id)
    ].slice(0, 5);
    
    setRecentSelections(newRecentSelections);
    try {
      localStorage.setItem('recentLocationSelections', JSON.stringify(newRecentSelections));
    } catch (error) {
      console.warn('Error saving recent selections', error);
    }
  };

  const groupedLocations = {
    countries: filteredLocations.filter(location => location.type === 'country'),
    regions: filteredLocations.filter(location => location.type === 'region'),
    cities: filteredLocations.filter(location => location.type === 'city')
  };

  return {
    searchValue,
    setSearchValue,
    groupedLocations,
    recentSelections,
    updateRecentSelections
  };
};
