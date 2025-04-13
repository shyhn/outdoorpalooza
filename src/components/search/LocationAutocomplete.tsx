
import React, { useState, useEffect, useRef } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, MapPin, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export interface LocationData {
  id: string;
  name: string;
  type: 'country' | 'region' | 'city';
  region?: string;
  country?: string;
}

// Liste des pays, régions et grandes villes
const locationData: LocationData[] = [
  // Pays
  { id: 'france', name: 'France', type: 'country' },
  { id: 'espagne', name: 'Espagne', type: 'country' },
  { id: 'italie', name: 'Italie', type: 'country' },
  { id: 'allemagne', name: 'Allemagne', type: 'country' },
  { id: 'royaume-uni', name: 'Royaume-Uni', type: 'country' },
  { id: 'belgique', name: 'Belgique', type: 'country' },
  { id: 'suisse', name: 'Suisse', type: 'country' },
  
  // Régions françaises
  { id: 'auvergne-rhone-alpes', name: 'Auvergne-Rhône-Alpes', type: 'region', country: 'France' },
  { id: 'bourgogne-franche-comte', name: 'Bourgogne-Franche-Comté', type: 'region', country: 'France' },
  { id: 'bretagne', name: 'Bretagne', type: 'region', country: 'France' },
  { id: 'centre-val-de-loire', name: 'Centre-Val de Loire', type: 'region', country: 'France' },
  { id: 'corse', name: 'Corse', type: 'region', country: 'France' },
  { id: 'grand-est', name: 'Grand Est', type: 'region', country: 'France' },
  { id: 'hauts-de-france', name: 'Hauts-de-France', type: 'region', country: 'France' },
  { id: 'ile-de-france', name: 'Île-de-France', type: 'region', country: 'France' },
  { id: 'normandie', name: 'Normandie', type: 'region', country: 'France' },
  { id: 'nouvelle-aquitaine', name: 'Nouvelle-Aquitaine', type: 'region', country: 'France' },
  { id: 'occitanie', name: 'Occitanie', type: 'region', country: 'France' },
  { id: 'pays-de-la-loire', name: 'Pays de la Loire', type: 'region', country: 'France' },
  { id: 'provence-alpes-cote-azur', name: 'Provence-Alpes-Côte d\'Azur', type: 'region', country: 'France' },
  
  // Grandes villes françaises
  { id: 'paris', name: 'Paris', type: 'city', region: 'Île-de-France', country: 'France' },
  { id: 'marseille', name: 'Marseille', type: 'city', region: 'Provence-Alpes-Côte d\'Azur', country: 'France' },
  { id: 'lyon', name: 'Lyon', type: 'city', region: 'Auvergne-Rhône-Alpes', country: 'France' },
  { id: 'toulouse', name: 'Toulouse', type: 'city', region: 'Occitanie', country: 'France' },
  { id: 'nice', name: 'Nice', type: 'city', region: 'Provence-Alpes-Côte d\'Azur', country: 'France' },
  { id: 'nantes', name: 'Nantes', type: 'city', region: 'Pays de la Loire', country: 'France' },
  { id: 'strasbourg', name: 'Strasbourg', type: 'city', region: 'Grand Est', country: 'France' },
  { id: 'montpellier', name: 'Montpellier', type: 'city', region: 'Occitanie', country: 'France' },
  { id: 'bordeaux', name: 'Bordeaux', type: 'city', region: 'Nouvelle-Aquitaine', country: 'France' },
  { id: 'lille', name: 'Lille', type: 'city', region: 'Hauts-de-France', country: 'France' },
  { id: 'rennes', name: 'Rennes', type: 'city', region: 'Bretagne', country: 'France' },
  { id: 'reims', name: 'Reims', type: 'city', region: 'Grand Est', country: 'France' },
  { id: 'saint-etienne', name: 'Saint-Étienne', type: 'city', region: 'Auvergne-Rhône-Alpes', country: 'France' },
  { id: 'toulon', name: 'Toulon', type: 'city', region: 'Provence-Alpes-Côte d\'Azur', country: 'France' },
  { id: 'le-havre', name: 'Le Havre', type: 'city', region: 'Normandie', country: 'France' },
  { id: 'grenoble', name: 'Grenoble', type: 'city', region: 'Auvergne-Rhône-Alpes', country: 'France' },
  { id: 'dijon', name: 'Dijon', type: 'city', region: 'Bourgogne-Franche-Comté', country: 'France' },
  { id: 'angers', name: 'Angers', type: 'city', region: 'Pays de la Loire', country: 'France' },
  { id: 'nimes', name: 'Nîmes', type: 'city', region: 'Occitanie', country: 'France' },
  { id: 'clermont-ferrand', name: 'Clermont-Ferrand', type: 'city', region: 'Auvergne-Rhône-Alpes', country: 'France' },
  { id: 'chamonix', name: 'Chamonix', type: 'city', region: 'Auvergne-Rhône-Alpes', country: 'France' },
  { id: 'quiberon', name: 'Quiberon', type: 'city', region: 'Bretagne', country: 'France' },
  { id: 'fontainebleau', name: 'Fontainebleau', type: 'city', region: 'Île-de-France', country: 'France' },
  { id: 'gavarnie', name: 'Gavarnie', type: 'city', region: 'Occitanie', country: 'France' },
  { id: 'la-roque-gageac', name: 'La Roque-Gageac', type: 'city', region: 'Nouvelle-Aquitaine', country: 'France' },
  { id: 'mont-saint-michel', name: 'Mont-Saint-Michel', type: 'city', region: 'Normandie', country: 'France' },
  
  // Villes espagnoles
  { id: 'madrid', name: 'Madrid', type: 'city', country: 'Espagne' },
  { id: 'barcelone', name: 'Barcelone', type: 'city', country: 'Espagne' },
  { id: 'seville', name: 'Séville', type: 'city', country: 'Espagne' },
  { id: 'valence', name: 'Valence', type: 'city', country: 'Espagne' },
  { id: 'grenade', name: 'Grenade', type: 'city', country: 'Espagne' },
  
  // Villes italiennes
  { id: 'rome', name: 'Rome', type: 'city', country: 'Italie' },
  { id: 'milan', name: 'Milan', type: 'city', country: 'Italie' },
  { id: 'florence', name: 'Florence', type: 'city', country: 'Italie' },
  { id: 'venise', name: 'Venise', type: 'city', country: 'Italie' },
  { id: 'naples', name: 'Naples', type: 'city', country: 'Italie' },
];

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
  const [filteredLocations, setFilteredLocations] = useState<LocationData[]>(locationData);
  const [recentSelections, setRecentSelections] = useState<LocationData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Récupérer les sélections récentes du localStorage
    try {
      const savedSelections = localStorage.getItem('recentLocationSelections');
      if (savedSelections) {
        const parsed = JSON.parse(savedSelections);
        setRecentSelections(parsed.slice(0, 5)); // Limiter à 5 sélections récentes
      }
    } catch (error) {
      console.warn('Error loading recent selections', error);
    }
  }, []);

  useEffect(() => {
    // Filter locations based on search input
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
    
    // Sauvegarder dans les sélections récentes
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

  const handleClear = () => {
    onLocationSelect(null);
    setSearchValue('');
    inputRef.current?.focus();
  };

  // Grouper les localisations par type
  const countries = filteredLocations.filter(location => location.type === 'country');
  const regions = filteredLocations.filter(location => location.type === 'region');
  const cities = filteredLocations.filter(location => location.type === 'city');

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
          
          {selectedLocation && (
            <div className="mt-2">
              <Badge 
                variant="outline" 
                className="bg-forest-50 text-forest-700 border-forest-200 flex items-center gap-1.5"
              >
                {selectedLocation.type === 'country' ? (
                  <Globe className="h-3.5 w-3.5" />
                ) : (
                  <MapPin className="h-3.5 w-3.5" />
                )}
                {selectedLocation.name}
                {selectedLocation.country && selectedLocation.type !== 'country' && (
                  <span className="text-forest-500 text-xs">
                    ({selectedLocation.country})
                  </span>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0.5 ml-1 rounded-full hover:bg-forest-100"
                  onClick={handleClear}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            </div>
          )}
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
            
            {/* Sélections récentes */}
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
            
            {/* Pays */}
            {countries.length > 0 && (
              <CommandGroup heading="Pays">
                {countries.map((location) => (
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
            
            {/* Régions */}
            {regions.length > 0 && (
              <CommandGroup heading="Régions">
                {regions.map((location) => (
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
            
            {/* Villes */}
            {cities.length > 0 && (
              <CommandGroup heading="Villes">
                {cities.map((location) => (
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
