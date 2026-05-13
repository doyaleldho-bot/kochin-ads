
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Profile fetch exception:', err);
    }
  };

  const handleSession = useCallback(async (currentSession) => {
    setSession(currentSession);
    setUser(currentSession?.user ?? null);
    
    if (currentSession?.user) {
      await fetchProfile(currentSession.user.id);
    } else {
      setProfile(null);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signUp = useCallback(async (formData) => {
    const { email, password, full_name, company_name, phone, address } = formData;
    
    // 1. Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      toast({ variant: "destructive", title: "Sign up Failed", description: authError.message });
      return { error: authError };
    }

    if (authData?.user) {
      // 2. Create profile
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: authData.user.id,
          full_name,
          company_name,
          phone,
          address,
          role: 'user' // Default role
        }
      ]);

      if (profileError) {
        console.error('Profile creation failed:', profileError);
        // We don't block sign up success, but warn
        toast({ title: "Account created", description: "Profile details might be incomplete." });
      } else {
        toast({ title: "Success!", description: "Account created successfully. Please verify your email." });
      }
    }

    return { data: authData, error: null };
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ variant: "destructive", title: "Sign in Failed", description: error.message });
      return { error };
    }
    
    // Log activity
    if (data.user) {
      await supabase.from('activity_logs').insert([{
        user_id: data.user.id,
        action: 'LOGIN',
        details: { method: 'password' },
        ip_address: 'client-side'
      }]);
    }

    toast({ title: "Welcome back!", description: "Signed in successfully." });
    return { data, error: null };
  }, [toast]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      setProfile(null);
      setUser(null);
      setSession(null);
    }
  }, [toast]);

  const isAdmin = useMemo(() => profile?.role === 'admin' || profile?.role === 'super_admin', [profile]);
  const isSuperAdmin = useMemo(() => profile?.role === 'super_admin', [profile]);

  const value = useMemo(() => ({
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin,
    isSuperAdmin
  }), [user, profile, session, loading, signUp, signIn, signOut, isAdmin, isSuperAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
