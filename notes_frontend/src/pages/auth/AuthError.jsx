import React from "react";
import { Link } from "react-router-dom";

export default function AuthError() {
  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>Authentication error</h1>
      <p style={{ color: "var(--text-muted)" }}>
        Something went wrong while processing the authentication callback. Ensure the redirect URL is allow-listed in your Supabase project settings and try again.
      </p>
      <div style={{ marginTop: 16 }}>
        <Link to="/signin">Back to Sign in</Link>
      </div>
    </div>
  );
}
