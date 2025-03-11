
import React, { useState } from 'react';
import useMapbox from './useMapbox';
import MapPOIFilters from './MapPOIFilters';

interface MapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
}

const Map: React.FC<MapProps> = ({
  initialCenter,
  initialZoom,
}) => {
  const [activePOIFilter, setActivePOIFilter] = useState<string | null>(null);
  const { mapContainer, loading, map } = useMapbox({ 
    initialCenter, 
    initialZoom 
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
    </div>
  );
};

export default Map;
