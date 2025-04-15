
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, MapPin, X } from 'lucide-react';
import { LocationData } from '@/types/location';

interface LocationBadgeProps {
  location: LocationData;
  onClear: () => void;
}

const LocationBadge: React.FC<LocationBadgeProps> = ({ location, onClear }) => {
  return (
    <Badge 
      variant="outline" 
      className="bg-forest-50 text-forest-700 border-forest-200 flex items-center gap-1.5"
    >
      {location.type === 'country' ? (
        <Globe className="h-3.5 w-3.5" />
      ) : (
        <MapPin className="h-3.5 w-3.5" />
      )}
      {location.name}
      {location.country && location.type !== 'country' && (
        <span className="text-forest-500 text-xs">
          ({location.country})
        </span>
      )}
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-5 w-5 p-0.5 ml-1 rounded-full hover:bg-forest-100"
        onClick={onClear}
      >
        <X className="h-3 w-3" />
      </Button>
    </Badge>
  );
};

export default LocationBadge;
