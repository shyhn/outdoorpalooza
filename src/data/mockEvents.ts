
export interface EventData {
  id: string;
  title: string;
  description: string;
  type: 'hiking' | 'biking' | 'water' | 'camping' | 'climbing';
  coords: [number, number]; // [longitude, latitude]
  date: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  distance?: number; // distance in km
  duration?: number; // duration in hours
  location: {
    city: string;
    region: string;
    country: string;
  };
}

// Coordonnées en France et pays voisins
export const mockEvents: EventData[] = [
  {
    id: '1',
    title: 'Randonnée au Mont Blanc',
    description: 'Explorez le plus haut sommet des Alpes avec un guide expérimenté',
    type: 'hiking',
    coords: [6.8651, 45.8326], // Chamonix
    date: '2023-08-15',
    difficulty: 'hard',
    distance: 22,
    duration: 12,
    location: {
      city: 'Chamonix',
      region: 'Auvergne-Rhône-Alpes',
      country: 'France'
    }
  },
  {
    id: '2',
    title: 'Descente en kayak dans les Gorges du Verdon',
    description: 'Une journée rafraîchissante dans le plus grand canyon d\'Europe',
    type: 'water',
    coords: [6.3289, 43.7559], // Gorges du Verdon
    date: '2023-07-20',
    difficulty: 'moderate',
    duration: 5,
    location: {
      city: 'Castellane',
      region: 'Provence-Alpes-Côte d\'Azur',
      country: 'France'
    }
  },
  {
    id: '3',
    title: 'VTT dans le Parc du Luberon',
    description: 'Parcours technique à travers les forêts et vignobles',
    type: 'biking',
    coords: [5.3698, 43.7965], // Luberon
    date: '2023-09-05',
    difficulty: 'moderate',
    distance: 35,
    duration: 4,
    location: {
      city: 'Apt',
      region: 'Provence-Alpes-Côte d\'Azur',
      country: 'France'
    }
  },
  {
    id: '4',
    title: 'Camping sauvage en Bretagne',
    description: 'Week-end en pleine nature sur la côte bretonne',
    type: 'camping',
    coords: [-2.5142, 47.8566], // Quiberon
    date: '2023-08-25',
    difficulty: 'easy',
    duration: 48,
    location: {
      city: 'Quiberon',
      region: 'Bretagne',
      country: 'France'
    }
  },
  {
    id: '5',
    title: 'Escalade à Fontainebleau',
    description: 'Journée bloc dans le site d\'escalade légendaire',
    type: 'climbing',
    coords: [2.6987, 48.4047], // Fontainebleau
    date: '2023-07-18',
    difficulty: 'moderate',
    duration: 6,
    location: {
      city: 'Fontainebleau',
      region: 'Île-de-France',
      country: 'France'
    }
  },
  {
    id: '6',
    title: 'Randonnée dans les Pyrénées',
    description: 'Découverte du Cirque de Gavarnie et ses cascades',
    type: 'hiking',
    coords: [0.0083, 42.7362], // Gavarnie
    date: '2023-09-12',
    difficulty: 'moderate',
    distance: 14,
    duration: 6,
    location: {
      city: 'Gavarnie',
      region: 'Occitanie',
      country: 'France'
    }
  },
  {
    id: '7',
    title: 'Sortie canoë sur la Dordogne',
    description: 'Balade fluviale avec vue sur les châteaux',
    type: 'water',
    coords: [1.2157, 44.8360], // La Roque-Gageac
    date: '2023-07-30',
    difficulty: 'easy',
    duration: 3,
    location: {
      city: 'La Roque-Gageac',
      region: 'Nouvelle-Aquitaine',
      country: 'France'
    }
  },
  {
    id: '8',
    title: 'Tour du Mont-Saint-Michel à vélo',
    description: 'Circuit cycliste autour de la baie',
    type: 'biking',
    coords: [-1.5114, 48.6359], // Mont-Saint-Michel
    date: '2023-08-05',
    difficulty: 'easy',
    distance: 45,
    duration: 5,
    location: {
      city: 'Mont-Saint-Michel',
      region: 'Normandie',
      country: 'France'
    }
  },
  {
    id: '9',
    title: 'Escalade à Montserrat',
    description: 'Escalade sur les formations rocheuses uniques de Montserrat',
    type: 'climbing',
    coords: [1.8351, 41.5908], // Montserrat
    date: '2023-09-20',
    difficulty: 'hard',
    duration: 8,
    location: {
      city: 'Barcelone',
      region: 'Catalogne',
      country: 'Espagne'
    }
  },
  {
    id: '10',
    title: 'Randonnée dans les Dolomites',
    description: 'Découverte des paysages spectaculaires des Dolomites',
    type: 'hiking',
    coords: [11.8735, 46.4102], // Dolomites
    date: '2023-07-25',
    difficulty: 'moderate',
    distance: 18,
    duration: 7,
    location: {
      city: 'Cortina d\'Ampezzo',
      region: 'Vénétie',
      country: 'Italie'
    }
  }
];
