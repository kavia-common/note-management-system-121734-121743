import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSupabase } from "../../services/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Processing authentication...");

  useEffect(() => {
    const handle = async () => {
      const supabase = await getSupabase();
      if (!supabase) {
        // Offline or SDK not installed yet
        setMessage("Supabase not available. Redirecting to sign in...");
        setTimeout(() => navigate("/signin", { replace: true }), 1000);
        return;
      }

      try {
        // Newer SDKs use getSessionFromUrl; older used exchangeCodeForSession
        if (supabase.auth.getSessionFromUrl) {
          const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
          if (error) throw error;
          if (data?.session) {
            navigate("/notes", { replace: true });
            return;
          }
        } else if (supabase.auth.exchangeCodeForSession) {
          const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          if (error) throw error;
          navigate("/notes", { replace: true });
          return;
        }
        // Default fallback
        navigate("/notes", { replace: true });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Auth callback error:", e);
        navigate("/auth/error", { replace: true });
      }
    };
    handle();
  }, [navigate]);

  return <div style={{ padding: 16 }}>{message}</div>;
}
