
import React, { useRef, useEffect } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, MapPin, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LocationBadge from './LocationBadge';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { LocationData } from '@/types/location';

interface LocationAutocompleteProps {
  onLocationSelect: (location: LocationData | null) => void;
  selectedLocation: LocationData | null;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  onLocationSelect,
  selectedLocation
}) => {
  const [open, setOpen] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    searchValue,
    setSearchValue,
    groupedLocations,
    recentSelections,
    updateRecentSelections
  } = useLocationSearch();

  useEffect(() => {
    if (selectedLocation) {
      setSearchValue(selectedLocation.name);
    } else {
      setSearchValue('');
    }
  }, [selectedLocation, setSearchValue]);

  const handleSelect = (location: LocationData) => {
    onLocationSelect(location);
    setOpen(false);
    inputRef.current?.blur();
    updateRecentSelections(location);
  };

  const handleClear = () => {
    onLocationSelect(null);
    setSearchValue('');
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!open) {
      setOpen(true);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Rechercher un pays, une région ou une ville..."
            className="w-full h-12 pl-10 pr-10 rounded-full border border-gray-200 focus:outline-none focus:border-forest-500 bg-white"
            value={searchValue}
            onChange={handleInputChange}
            onClick={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setOpen(false);
              }
            }}
          />
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          {searchValue && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1.5 h-9 w-9 rounded-full p-0"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          {selectedLocation && (
            <div className="mt-2">
              <LocationBadge location={selectedLocation} onClear={handleClear} />
            </div>
          )}
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
            
            {recentSelections.length > 0 && searchValue.trim() === '' && (
              <CommandGroup heading="Récent">
                {recentSelections.map((location) => (
                  <CommandItem
                    key={`recent-${location.id}`}
                    value={`recent-${location.id}`}
                    onSelect={() => handleSelect(location)}
                    className="flex items-center gap-2 py-2"
                  >
                    {location.type === 'country' ? (
                      <Globe className="h-4 w-4 opacity-70" />
                    ) : (
                      <MapPin className="h-4 w-4 opacity-70" />
                    )}
                    <span>{location.name}</span>
                    {location.country && location.type !== 'country' && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {location.country}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {groupedLocations.countries.length > 0 && (
              <CommandGroup heading="Pays">
                {groupedLocations.countries.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.id}
                    onSelect={() => handleSelect(location)}
                    className="flex items-center gap-2 py-2"
                  >
                    <Globe className="h-4 w-4 opacity-70" />
                    <span>{location.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {groupedLocations.regions.length > 0 && (
              <CommandGroup heading="Régions">
                {groupedLocations.regions.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.id}
                    onSelect={() => handleSelect(location)}
                    className="flex items-center gap-2 py-2"
                  >
                    <MapPin className="h-4 w-4 opacity-70" />
                    <span>{location.name}</span>
                    {location.country && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {location.country}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {groupedLocations.cities.length > 0 && (
              <CommandGroup heading="Villes">
                {groupedLocations.cities.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.id}
                    onSelect={() => handleSelect(location)}
                    className="flex items-center gap-2 py-2"
                  >
                    <MapPin className="h-4 w-4 opacity-70" />
                    <span>{location.name}</span>
                    {location.country && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {location.country}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationAutocomplete;
