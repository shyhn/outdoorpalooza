
import React from 'react';
import { Compass, Layers, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapPOIFiltersProps {
  activePOIFilter: string | null;
  togglePOIFilter: (poiType: string) => void;
}

const MapPOIFilters: React.FC<MapPOIFiltersProps> = ({ activePOIFilter, togglePOIFilter }) => {
  return (
    <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
      <button
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors",
          activePOIFilter === 'water' ? "bg-sky-600 text-white" : "bg-white text-sky-600"
        )}
        onClick={() => togglePOIFilter('water')}
        title="Water sources"
      >
        <Compass className="w-5 h-5" />
      </button>
      
      <button
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors",
          activePOIFilter === 'camp' ? "bg-earth-600 text-white" : "bg-white text-earth-600" 
        )}
        onClick={() => togglePOIFilter('camp')}
        title="Camping sites"
      >
        <MapPin className="w-5 h-5" />
      </button>
      
      <button
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors",
          activePOIFilter === 'trails' ? "bg-forest-600 text-white" : "bg-white text-forest-600"
        )}
        onClick={() => togglePOIFilter('trails')}
        title="Hiking trails"
      >
        <Layers className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MapPOIFilters;
