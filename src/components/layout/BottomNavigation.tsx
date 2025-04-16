
import React from 'react';
import { MapPin, Plus, Users, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const BottomNavigation = () => {
  const { user, signInWithGoogle, signOut, isConfigured } = useAuth();

  const handleSignInClick = () => {
    if (!isConfigured) {
      toast.error('Authentication is not configured. Please check your Supabase configuration.');
      return;
    }
    signInWithGoogle();
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-lg border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
        <NavItem icon={<MapPin className="w-6 h-6" />} label="Explore" to="/" />
        <CreateEventButton />
        <NavItem icon={<Users className="w-6 h-6" />} label="Events" to="/events" />
        
        {user ? (
          <Link to="/profile" className="flex flex-col items-center justify-center w-12" onClick={signOut}>
            <div className="text-forest-600"><User className="w-6 h-6" /></div>
            <span className="text-xs mt-1 text-forest-800">Profile</span>
          </Link>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex flex-col items-center justify-center w-12">
                <div className="text-forest-600"><LogIn className="w-6 h-6" /></div>
                <span className="text-xs mt-1 text-forest-800">Login</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign In</DialogTitle>
              </DialogHeader>
              {isConfigured ? (
                <GoogleSignInButton onSignIn={handleSignInClick} />
              ) : (
                <div className="text-center p-4 text-red-500">
                  <p>Authentication is not configured.</p>
                  <p className="text-sm mt-2">Please check your Supabase settings.</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
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
