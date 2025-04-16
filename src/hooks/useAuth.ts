
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Check if environment variables are defined and provide fallback for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that we have the required configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

// Create the Supabase client only if we have the required configuration
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    if (supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user || null);
          
          // Show toast message on sign in/out events
          if (event === 'SIGNED_IN') {
            toast.success('Successfully signed in');
          } else if (event === 'SIGNED_OUT') {
            toast.success('Successfully signed out');
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const signInWithGoogle = async () => {
    if (!supabase) {
      toast.error('Supabase configuration is missing');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        console.error('Error logging in with Google', error);
        toast.error('Failed to sign in with Google');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      toast.error('An error occurred during sign-in');
    }
  };

  const signOut = async () => {
    if (!supabase) {
      toast.error('Supabase configuration is missing');
      return;
    }

    try {
      await supabase.auth.signOut();
      toast.success('You have been signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  return { 
    user, 
    loading, 
    signInWithGoogle, 
    signOut,
    isConfigured: !!supabase
  };
};
