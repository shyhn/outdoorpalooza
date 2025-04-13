
import React, { useState, useEffect, useRef } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Liste des régions et grandes villes de France
const frenchLocations = [
  // Régions
  { id: 'auvergne-rhone-alpes', name: 'Auvergne-Rhône-Alpes', type: 'region' },
  { id: 'bourgogne-franche-comte', name: 'Bourgogne-Franche-Comté', type: 'region' },
  { id: 'bretagne', name: 'Bretagne', type: 'region' },
  { id: 'centre-val-de-loire', name: 'Centre-Val de Loire', type: 'region' },
  { id: 'corse', name: 'Corse', type: 'region' },
  { id: 'grand-est', name: 'Grand Est', type: 'region' },
  { id: 'hauts-de-france', name: 'Hauts-de-France', type: 'region' },
  { id: 'ile-de-france', name: 'Île-de-France', type: 'region' },
  { id: 'normandie', name: 'Normandie', type: 'region' },
  { id: 'nouvelle-aquitaine', name: 'Nouvelle-Aquitaine', type: 'region' },
  { id: 'occitanie', name: 'Occitanie', type: 'region' },
  { id: 'pays-de-la-loire', name: 'Pays de la Loire', type: 'region' },
  { id: 'provence-alpes-cote-azur', name: 'Provence-Alpes-Côte d\'Azur', type: 'region' },
  
  // Grandes villes
  { id: 'paris', name: 'Paris', type: 'city', region: 'Île-de-France' },
  { id: 'marseille', name: 'Marseille', type: 'city', region: 'Provence-Alpes-Côte d\'Azur' },
  { id: 'lyon', name: 'Lyon', type: 'city', region: 'Auvergne-Rhône-Alpes' },
  { id: 'toulouse', name: 'Toulouse', type: 'city', region: 'Occitanie' },
  { id: 'nice', name: 'Nice', type: 'city', region: 'Provence-Alpes-Côte d\'Azur' },
  { id: 'nantes', name: 'Nantes', type: 'city', region: 'Pays de la Loire' },
  { id: 'strasbourg', name: 'Strasbourg', type: 'city', region: 'Grand Est' },
  { id: 'montpellier', name: 'Montpellier', type: 'city', region: 'Occitanie' },
  { id: 'bordeaux', name: 'Bordeaux', type: 'city', region: 'Nouvelle-Aquitaine' },
  { id: 'lille', name: 'Lille', type: 'city', region: 'Hauts-de-France' },
  { id: 'rennes', name: 'Rennes', type: 'city', region: 'Bretagne' },
  { id: 'reims', name: 'Reims', type: 'city', region: 'Grand Est' },
  { id: 'saint-etienne', name: 'Saint-Étienne', type: 'city', region: 'Auvergne-Rhône-Alpes' },
  { id: 'toulon', name: 'Toulon', type: 'city', region: 'Provence-Alpes-Côte d\'Azur' },
  { id: 'le-havre', name: 'Le Havre', type: 'city', region: 'Normandie' },
  { id: 'grenoble', name: 'Grenoble', type: 'city', region: 'Auvergne-Rhône-Alpes' },
  { id: 'dijon', name: 'Dijon', type: 'city', region: 'Bourgogne-Franche-Comté' },
  { id: 'angers', name: 'Angers', type: 'city', region: 'Pays de la Loire' },
  { id: 'nimes', name: 'Nîmes', type: 'city', region: 'Occitanie' },
  { id: 'clermont-ferrand', name: 'Clermont-Ferrand', type: 'city', region: 'Auvergne-Rhône-Alpes' },
  { id: 'chamonix', name: 'Chamonix', type: 'city', region: 'Auvergne-Rhône-Alpes' },
  { id: 'quiberon', name: 'Quiberon', type: 'city', region: 'Bretagne' },
  { id: 'fontainebleau', name: 'Fontainebleau', type: 'city', region: 'Île-de-France' },
  { id: 'gavarnie', name: 'Gavarnie', type: 'city', region: 'Occitanie' },
  { id: 'la-roque-gageac', name: 'La Roque-Gageac', type: 'city', region: 'Nouvelle-Aquitaine' },
  { id: 'mont-saint-michel', name: 'Mont-Saint-Michel', type: 'city', region: 'Normandie' },
];

export interface LocationData {
  id: string;
  name: string;
  type: 'region' | 'city';
  region?: string;
}

interface LocationAutocompleteProps {
  onLocationSelect: (location: LocationData | null) => void;
  selectedLocation: LocationData | null;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  onLocationSelect,
  selectedLocation
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<LocationData[]>(frenchLocations);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Filter locations based on search input
    if (searchValue.trim() === '') {
      setFilteredLocations(frenchLocations);
      return;
    }

    const query = searchValue.toLowerCase();
    const filtered = frenchLocations.filter(location => 
      location.name.toLowerCase().includes(query) || 
      (location.region && location.region.toLowerCase().includes(query))
    );
    setFilteredLocations(filtered);
  }, [searchValue]);

  // Update searchValue when selectedLocation changes
  useEffect(() => {
    if (selectedLocation) {
      setSearchValue(selectedLocation.name);
    } else {
      setSearchValue('');
    }
  }, [selectedLocation]);

  const handleSelect = (location: LocationData) => {
    onLocationSelect(location);
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onLocationSelect(null);
    setSearchValue('');
    inputRef.current?.focus();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Rechercher une région ou ville..."
            className="w-full h-12 pl-10 pr-10 rounded-full border border-gray-200 focus:outline-none focus:border-forest-500 bg-white"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setOpen(true)}
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
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
            <CommandGroup heading="Régions">
              {filteredLocations
                .filter(location => location.type === 'region')
                .map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.id}
                    onSelect={() => handleSelect(location)}
                    className="flex items-center gap-2 py-2"
                  >
                    <MapPin className="h-4 w-4 opacity-70" />
                    <span>{location.name}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
            
            <CommandGroup heading="Villes">
              {filteredLocations
                .filter(location => location.type === 'city')
                .map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.id}
                    onSelect={() => handleSelect(location)}
                    className="flex items-center gap-2 py-2"
                  >
                    <MapPin className="h-4 w-4 opacity-70" />
                    <span>{location.name}</span>
                    {location.region && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        {location.region}
                      </span>
                    )}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationAutocomplete;
