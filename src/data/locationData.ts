import { LocationData } from '@/types/location';

export const locationData: LocationData[] = [
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
