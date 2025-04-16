
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface UseProtectedRouteOptions {
  redirectTo?: string;
  message?: string;
}

/**
 * Hook to protect routes that require authentication
 * @param options Configuration options
 * @returns Object containing authentication state
 */
export const useProtectedRoute = (options: UseProtectedRouteOptions = {}) => {
  const { 
    redirectTo = '/auth', 
    message = 'Vous devez être connecté pour accéder à cette page.'
  } = options;
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Only redirect if loading is complete and user is null
    if (!loading && !user) {
      toast({
        title: "Connexion requise",
        description: message,
        variant: "destructive",
      });
      navigate(redirectTo);
    }
  }, [user, loading, navigate, toast, redirectTo, message]);

  return {
    isAuthenticated: !!user,
    isLoading: loading,
    user
  };
};
