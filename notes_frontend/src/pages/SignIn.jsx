import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * SignIn
 * Simple email/password sign-in form. Uses Supabase when configured; otherwise, local demo session.
 */
export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const { error } = await signIn(email, password);
    if (error) setErr(error.message || String(error));
    else navigate("/notes");
  };

  return (
    <div className="app-shell" style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>Welcome back</h1>
      <p style={{ color: "var(--text-muted)", marginTop: 0 }}>Sign in to continue</p>
      <form onSubmit={onSubmit} className="editor-form">
        <label style={{ fontSize: 12, color: "var(--text-muted)" }}>Email</label>
        <input
          className="input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <label style={{ fontSize: 12, color: "var(--text-muted)" }}>Password</label>
        <input
          className="input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {err ? <div style={{ color: "crimson", fontSize: 12 }}>{err}</div> : null}
        <div className="form-actions" style={{ justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            New here? <Link to="/signup">Create an account</Link>
          </span>
          <button className="primary-btn" type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
}
