
import React from 'react';
import { MapPin, Plus, Users, User } from 'lucide-react';
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

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-lg border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
        <NavItem icon={<MapPin className="w-6 h-6" />} label="Explorer" to="/" />
        <CreateEventButton />
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
              <DropdownMenuItem onClick={handleSignOut}>
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

const CreateEventButton = () => (
  <Link 
    to="/create-event"
    className="w-14 h-14 bg-forest-600 rounded-full flex items-center justify-center -mt-6 shadow-lg hover:bg-forest-700 transition-colors"
  >
    <Plus className="w-8 h-8 text-white" />
  </Link>
);

export default BottomNavigation;
