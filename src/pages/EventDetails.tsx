
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Mountain, 
  MessageCircle, 
  User, 
  Download, 
  ArrowLeft, 
  Share2 
} from 'lucide-react';
import { mockEvents, EventData } from '@/data/mockEvents';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Map from '@/components/map/Map';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const event = mockEvents.find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-forest-800 mb-4">Événement non trouvé</h1>
        <p className="text-gray-600 mb-6">L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
        <Button asChild>
          <Link to="/events"><ArrowLeft className="mr-2 h-4 w-4" /> Retour aux événements</Link>
        </Button>
      </div>
    );
  }
  
  // Génère des événements similaires
  const similarEvents = mockEvents
    .filter(e => e.id !== event.id && e.type === event.type)
    .slice(0, 3);
  
  // Simule un nombre de places disponibles
  const totalSpots = Math.floor(Math.random() * 10) + 5; // Entre 5 et 15 places
  const takenSpots = Math.floor(Math.random() * totalSpots);
  const spotsLeft = totalSpots - takenSpots;
  const isFull = spotsLeft === 0;
  
  // Simule un organisateur
  const organizer = {
    name: "Jean Dupont",
    image: "https://i.pravatar.cc/150?img=68",
    events: 12,
    rating: 4.8
  };
  
  const getDifficultyLabel = (difficulty: string) => {
    switch(difficulty) {
      case 'easy':
        return 'Facile';
      case 'moderate':
        return 'Modéré';
      case 'hard':
        return 'Difficile';
      default:
        return difficulty;
    }
  };
  
  return (
    <div className="min-h-screen bg-forest-50 pb-20">
      {/* Bannière de l'événement */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(https://source.unsplash.com/featured/1200x600/?nature,${event.type})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex flex-col justify-end p-6">
          <Link to="/events" className="absolute top-4 left-4 bg-white/90 rounded-full p-2 hover:bg-white transition-colors">
            <ArrowLeft className="h-5 w-5 text-forest-800" />
          </Link>
          <Button size="icon" variant="outline" className="absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white transition-colors">
            <Share2 className="h-5 w-5 text-forest-800" />
          </Button>
          <h1 className="text-2xl md:text-4xl font-bold text-white">{event.title}</h1>
          <div className="flex items-center mt-2">
            <Badge className="bg-white/90 text-forest-800 hover:bg-white">
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
            <Badge className="ml-2 bg-white/90 text-forest-800 hover:bg-white">
              {getDifficultyLabel(event.difficulty)}
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-forest-800 mb-4">Détails de l'événement</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-forest-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Date</p>
                      <p className="text-gray-600">
                        {format(new Date(event.date), 'PPP', { locale: fr })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-forest-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Lieu</p>
                      <p className="text-gray-600">
                        {`Lat: ${event.coords[1].toFixed(4)}, Lon: ${event.coords[0].toFixed(4)}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 mr-3 text-forest-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Durée</p>
                      <p className="text-gray-600">
                        {event.duration ? `${event.duration} heures` : 'Non spécifiée'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="w-5 h-5 mr-3 text-forest-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Participants</p>
                      <p className="text-gray-600">
                        {`${takenSpots}/${totalSpots} inscrits`}
                        {spotsLeft > 0 && ` (${spotsLeft} places restantes)`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mountain className="w-5 h-5 mr-3 text-forest-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Distance</p>
                      <p className="text-gray-600">
                        {event.distance ? `${event.distance} km` : 'Non spécifiée'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-forest-800 mb-2">Description</h3>
                <p className="text-gray-700 mb-6">{event.description}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className={cn(
                      "flex-1",
                      isFull ? "bg-gray-500 hover:bg-gray-600" : ""
                    )}
                    disabled={isFull}
                  >
                    {isFull ? 'Complet' : "S'inscrire"}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Contacter l'organisateur
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Carte du parcours */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-forest-800">Parcours</h2>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Télécharger GPX
              </Button>
            </div>
            <div className="h-64 rounded-lg overflow-hidden">
              <Map filteredEvents={[event]} initialCenter={event.coords} initialZoom={12} />
            </div>
          </CardContent>
        </Card>
        
        {/* Organisateur */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-forest-800 mb-4">Organisateur</h2>
            <div className="flex items-center">
              <div 
                className="w-16 h-16 rounded-full bg-center bg-cover mr-4"
                style={{ backgroundImage: `url(${organizer.image})` }}
              />
              <div>
                <h3 className="text-lg font-medium text-forest-800">{organizer.name}</h3>
                <p className="text-gray-600">{organizer.events} événements organisés</p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < Math.floor(organizer.rating) ? "text-yellow-500" : "text-gray-300"}>★</span>
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-600">{organizer.rating}/5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Événements similaires */}
        {similarEvents.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-forest-800 mb-4">Événements similaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {similarEvents.map(similarEvent => (
                  <Link 
                    key={similarEvent.id} 
                    to={`/events/${similarEvent.id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div 
                        className="h-32 bg-center bg-cover"
                        style={{
                          backgroundImage: `url(https://source.unsplash.com/featured/300x200/?nature,${similarEvent.type})`,
                        }}
                      />
                      <div className="p-3">
                        <h3 className="font-medium text-forest-800 group-hover:text-forest-600 transition-colors line-clamp-2">{similarEvent.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {format(new Date(similarEvent.date), 'P', { locale: fr })}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default EventDetails;
