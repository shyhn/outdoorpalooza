
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react';
import { EventData } from '@/data/mockEvents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Fonction qui renvoie la bonne icône pour chaque type d'activité
const getEventTypeIcon = (type: string) => {
  switch (type) {
    case 'hiking':
      return '🥾';
    case 'biking':
      return '🚵‍♂️';
    case 'water':
      return '🚣‍♀️';
    case 'camping':
      return '⛺';
    case 'climbing':
      return '🧗‍♀️';
    default:
      return '🏞️';
  }
};

// Fonction qui renvoie la bonne couleur pour chaque type d'activité
const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'hiking':
      return 'bg-emerald-100 text-emerald-800';
    case 'biking':
      return 'bg-amber-100 text-amber-800';
    case 'water':
      return 'bg-blue-100 text-blue-800';
    case 'camping':
      return 'bg-purple-100 text-purple-800';
    case 'climbing':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Fonction qui renvoie la bonne couleur pour chaque niveau de difficulté
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'moderate':
      return 'bg-yellow-100 text-yellow-800';
    case 'hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface EventCardProps {
  event: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  
  // Simule un nombre de places disponibles
  const totalSpots = Math.floor(Math.random() * 10) + 5; // Entre 5 et 15 places
  const takenSpots = Math.floor(Math.random() * totalSpots);
  const spotsLeft = totalSpots - takenSpots;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Image placeholder - in a real app, this would be a dynamic image */}
        <div 
          className="md:w-1/3 h-40 md:h-auto bg-forest-100 relative"
          style={{
            backgroundImage: 'url(https://source.unsplash.com/featured/300x200/?nature,' + event.type + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Badge 
            className={cn(
              "absolute top-2 left-2",
              getEventTypeColor(event.type)
            )}
          >
            {getEventTypeIcon(event.type)} {event.type}
          </Badge>
          
          <Badge 
            className={cn(
              "absolute top-2 right-2",
              getDifficultyColor(event.difficulty)
            )}
          >
            {event.difficulty}
          </Badge>
        </div>
        
        {/* Event details */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex flex-1 flex-col">
            <h3 className="text-lg font-semibold text-forest-800 mb-2">
              {event.title}
            </h3>
            
            <div className="flex flex-wrap gap-y-2 text-sm text-gray-600 mb-3">
              <div className="flex items-center mr-4">
                <Calendar className="w-4 h-4 mr-1" />
                <span>
                  {format(eventDate, 'PPP', { locale: fr })}
                </span>
              </div>
              
              <div className="flex items-center mr-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>
                  {/* Simulate a location name based on coordinates */}
                  {`Lat: ${event.coords[1].toFixed(2)}, Lon: ${event.coords[0].toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>
                  {`${takenSpots}/${totalSpots} participants`}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
              {event.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
            <Badge variant={isUpcoming ? "secondary" : "outline"}>
              {isUpcoming ? 'Ouvert' : 'Terminé'}
            </Badge>
            
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/events/${event.id}`} className="flex items-center">
                Voir Détails
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
