import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotes } from "../../context/NotesContext";

/**
 * PUBLIC_INTERFACE
 * TopBar
 * Header bar with app title, search input, new note button, and auth actions.
 */
export default function TopBar({ onNewNote }) {
  const { user, signOut } = useAuth();
  const { search, setSearch } = useNotes();

  return (
    <header className="topbar" role="banner">
      <div className="topbar-title">Notes</div>
      <input
        type="search"
        className="search-input"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search notes"
      />
      <div className="topbar-actions">
        <button className="primary-btn" onClick={onNewNote} aria-label="Create new note">
          + New
        </button>
        {user ? (
          <>
            <span aria-label="Signed in user" title={user.email} style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {user.email}
            </span>
            <button className="ghost-btn" onClick={signOut} aria-label="Sign out">
              Sign out
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
}
