
import React from 'react';
import { MapPin, Plus, Users, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

const BottomNavigation = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        description: "Déconnexion réussie",
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erreur lors de la déconnexion",
      });
    }
  };

  const handleCreateEvent = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour créer un événement.",
        variant: "destructive",
      });
      navigate('/auth');
    } else {
      navigate('/create-event');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-lg border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
        <NavItem icon={<MapPin className="w-6 h-6" />} label="Explorer" to="/" />
        
        <Button 
          variant="ghost" 
          className="flex flex-col items-center justify-center w-12 h-12"
          onClick={handleCreateEvent}
        >
          <Plus className="w-6 h-6 text-forest-600" />
          <span className="text-xs mt-1 text-forest-800">Créer</span>
        </Button>
        
        <NavItem icon={<Users className="w-6 h-6" />} label="Événements" to="/events" />
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex flex-col items-center justify-center w-12 h-12">
                <User className="w-6 h-6 text-forest-600" />
                <span className="text-xs mt-1 text-forest-800">Profil</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                Voir mon profil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <NavItem icon={<User className="w-6 h-6" />} label="Connexion" to="/auth" />
        )}
      </div>
    </nav>
  );
};

const NavItem = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => (
  <Link to={to} className="flex flex-col items-center justify-center w-12">
    <div className="text-forest-600">{icon}</div>
    <span className="text-xs mt-1 text-forest-800">{label}</span>
  </Link>
);

export default BottomNavigation;
