import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { storageGet, storageSet, storageRemove } from "../utils/storage";
import { getSupabase } from "../services/supabase";

const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * useAuth
 * Hook to access authentication state and actions.
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * PUBLIC_INTERFACE
 * AuthProvider
 * Provides user session state and authentication actions to the app.
 * Offline mode: stores a faux session in localStorage. When Supabase is configured,
 * switches to real auth.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storageGet("auth:user", null));
  const [loading, setLoading] = useState(false);

  // Subscribe to Supabase auth state changes if Supabase is available.
  useEffect(() => {
    let unsub = null;
    (async () => {
      const supabase = await getSupabase();
      if (!supabase) return;

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || "" });
          storageSet("auth:user", { id: session.user.id, email: session.user.email || "" });
        } else {
          setUser(null);
          storageRemove("auth:user");
        }
      });
      unsub = () => subscription.unsubscribe();
    })();

    return () => {
      if (unsub) unsub();
    };
  }, []);

  /**
   * PUBLIC_INTERFACE
   * signIn
   * Sign in with email/password. Uses Supabase if available; otherwise, creates a local demo session.
   */
  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const supabase = await getSupabase();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const u = { id: data.user.id, email: data.user.email || email };
        setUser(u);
        storageSet("auth:user", u);
        return { user: u };
      }
      // Offline fallback: accept any non-empty email/password
      if (!email || !password) throw new Error("Email and password required");
      const u = { id: "local-" + Date.now(), email };
      setUser(u);
      storageSet("auth:user", u);
      return { user: u };
    } catch (e) {
      return { error: e };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * PUBLIC_INTERFACE
   * signUp
   * Sign up with email/password. Uses Supabase if available; otherwise, creates a local demo session.
   */
  const signUp = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const supabase = await getSupabase();
      if (supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // In real deployment, REACT_APP_SITE_URL should point to your app URL
            emailRedirectTo: process.env.REACT_APP_SITE_URL || window.location.origin,
          },
        });
        if (error) throw error;
        const u = data?.user ? { id: data.user.id, email: data.user.email || email } : null;
        if (u) {
          setUser(u);
          storageSet("auth:user", u);
        }
        return { user: u };
      }
      if (!email || !password) throw new Error("Email and password required");
      const u = { id: "local-" + Date.now(), email };
      setUser(u);
      storageSet("auth:user", u);
      return { user: u };
    } catch (e) {
      return { error: e };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * PUBLIC_INTERFACE
   * signOut
   * Signs out of the session. Uses Supabase if available, otherwise clears local session.
   */
  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = await getSupabase();
      if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }
      setUser(null);
      storageRemove("auth:user");
      return {};
    } catch (e) {
      return { error: e };
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, signIn, signUp, signOut }),
    [user, loading, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
