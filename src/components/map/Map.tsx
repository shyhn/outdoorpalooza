
import React, { useState, useEffect } from 'react';
import useMapbox from './useMapbox';
import MapPOIFilters from './MapPOIFilters';
import { EventData } from '@/data/mockEvents';
import { Globe } from 'lucide-react';

interface MapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  filteredEvents?: EventData[];
}

const Map: React.FC<MapProps> = ({
  initialCenter,
  initialZoom,
  filteredEvents,
}) => {
  const [activePOIFilter, setActivePOIFilter] = useState<string | null>(null);
  const { mapContainer, loading, map } = useMapbox({ 
    initialCenter, 
    initialZoom,
    eventsToShow: filteredEvents
  });

  // Function to toggle POI filters
  const togglePOIFilter = (poiType: string) => {
    setActivePOIFilter(activePOIFilter === poiType ? null : poiType);
    // Here we would update the map to show/hide POIs based on the filter
    console.log(`Toggled POI filter: ${poiType}`);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-earth-100 z-10">
          <p className="text-earth-800 text-lg">Chargement de la carte...</p>
        </div>
      )}
      
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* POI Filter Toggles */}
      <MapPOIFilters
        activePOIFilter={activePOIFilter}
        togglePOIFilter={togglePOIFilter}
      />

      {/* Empty state for no filtered events */}
      {filteredEvents && filteredEvents.length === 0 && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-20">
          <div className="text-center p-6 rounded-lg">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Aucun événement trouvé</h3>
            <p className="text-sm text-gray-600 mt-1">Essayez d'autres filtres ou une autre localisation</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
