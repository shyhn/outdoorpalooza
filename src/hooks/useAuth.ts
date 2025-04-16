
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Note: Replace with your actual Supabase URL and Anon Key
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!, 
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) console.error('Error logging in with Google', error);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { 
    user, 
    loading, 
    signInWithGoogle, 
    signOut 
  };
};
