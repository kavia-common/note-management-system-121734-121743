import React, { useState, useMemo, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotes } from "../../context/NotesContext";

/**
 * PUBLIC_INTERFACE
 * TopBar
 * Header bar with app title, Figma-style icon buttons (search/info), responsive search,
 * desktop New button, and auth actions. Maintains existing search functionality.
 *
 * Accepts optional controlled props to integrate with mobile hero:
 * - showSearch: boolean | undefined
 * - onToggleSearch: () => void
 * - onInfo: () => void
 */
export default function TopBar({ onNewNote, showSearch: showSearchProp, onToggleSearch, onInfo: onInfoProp }) {
  const { user, signOut } = useAuth();
  const { search, setSearch } = useNotes();

  // Uncontrolled fallback when parent doesn't control search popover
  const [showSearchUncontrolled, setShowSearchUncontrolled] = useState(false);
  const isControlled = typeof showSearchProp === "boolean";
  const showSearch = isControlled ? showSearchProp : showSearchUncontrolled;

  const toggleSearch = useCallback(() => {
    if (onToggleSearch) onToggleSearch();
    else setShowSearchUncontrolled((s) => !s);
  }, [onToggleSearch]);

  const onInfo = useCallback(() => {
    if (onInfoProp) return onInfoProp();
    // eslint-disable-next-line no-alert
    alert("Information (placeholder)");
  }, [onInfoProp]);

  const title = useMemo(() => "Notes", []);

  return (
    <header className="topbar" role="banner">
      <div className="topbar-title">{title}</div>

      {/* Desktop inline search */}
      <input
        type="search"
        className="search-input search-inline"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search notes"
      />

      <div className="topbar-actions">
        {/* Square Search button (mobile toggler, available on all sizes) */}
        <button className="square-btn" onClick={toggleSearch} aria-label="Toggle search">
          {/* search icon */}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
          </svg>
        </button>

        {/* Square Info button */}
        <button className="square-btn" onClick={onInfo} aria-label="Information">
          {/* info icon */}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9"></circle>
            <line x1="12" y1="10" x2="12" y2="16"></line>
            <circle cx="12" cy="7" r="1.25" fill="currentColor" stroke="none"></circle>
          </svg>
        </button>

        {/* Desktop-only New button; hidden on narrow screens via CSS */}
        <button className="primary-btn new-btn-desktop" onClick={onNewNote} aria-label="Create new note">
          + New
        </button>

        {user ? (
          <>
            <span
              aria-label="Signed in user"
              title={user.email}
              style={{ fontSize: 12, color: "var(--text-muted)" }}
            >
              {user.email}
            </span>
            <button className="ghost-btn" onClick={signOut} aria-label="Sign out">
              Sign out
            </button>
          </>
        ) : null}
      </div>

      {/* Mobile search popover */}
      {showSearch && (
        <div className="search-popover" role="dialog" aria-label="Search notes popover">
          <input
            autoFocus
            type="search"
            className="search-input"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search notes"
          />
        </div>
      )}
    </header>
  );
}
