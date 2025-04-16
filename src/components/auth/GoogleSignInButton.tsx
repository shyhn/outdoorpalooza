
import React from 'react';
import { Button } from '@/components/ui/button';
import { Google } from 'lucide-react';

interface GoogleSignInButtonProps {
  onSignIn: () => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onSignIn }) => {
  return (
    <Button 
      onClick={onSignIn} 
      variant="outline" 
      className="w-full flex items-center justify-center gap-2"
    >
      <Google className="h-5 w-5" />
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
