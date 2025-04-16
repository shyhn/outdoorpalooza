
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Check if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client if environment variables are not set
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      console.error('Supabase client could not be initialized. Missing environment variables.');
      setLoading(false);
      return;
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Configuration Supabase manquante. Impossible de s'inscrire.",
      });
      throw new Error('Supabase client not initialized');
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Configuration Supabase manquante. Impossible de se connecter.",
      });
      throw new Error('Supabase client not initialized');
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    if (!supabase) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Configuration Supabase manquante. Impossible de se connecter avec Google.",
      });
      throw new Error('Supabase client not initialized');
    }
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (!supabase) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Configuration Supabase manquante. Impossible de se déconnecter.",
      });
      throw new Error('Supabase client not initialized');
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    isConfigured: !!supabase,
  };
};
