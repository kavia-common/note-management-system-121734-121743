import React, { useCallback, useMemo, useState } from "react";
import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/Sidebar";
import NoteList from "../components/notes/NoteList.jsx";
import NoteEditorForm from "../components/notes/NoteEditorForm.jsx";
import { useNotes } from "../context/NotesContext";
import "../styles/notes-app.css";

/**
 * PUBLIC_INTERFACE
 * NotesApp
 * Main notes application page with a desktop layout (sidebar + editor) and a
 * mobile "home-fidelity" mode that matches the Figma Home Screen:
 * - Dark hero area with large "Notes" title
 * - Top-right square icon buttons (search/info)
 * - Colored rectangular note cards
 * - Prominent FAB
 */
export default function NotesApp() {
  const { createNote, filteredNotes, selectNote } = useNotes();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const onCreate = useCallback(() => createNote({ title: "New note" }), [createNote]);
  const toggleMobileSearch = useCallback(() => setMobileSearchOpen((s) => !s), []);
  const onInfo = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert("Information (placeholder)");
  }, []);

  const cards = useMemo(() => filteredNotes, [filteredNotes]);

  return (
    <div className="app-shell home-fidelity">
      {/* TopBar kept for search popover and desktop usage; controlled search for mobile */}
      <TopBar onNewNote={onCreate} showSearch={mobileSearchOpen} onToggleSearch={toggleMobileSearch} onInfo={onInfo} />

      {/* Mobile hero + card list (hidden on desktop via CSS) */}
      <section className="home-hero" aria-label="Home hero for mobile">
        <h1 className="home-hero-title">Notes</h1>
        <div className="hero-actions" role="group" aria-label="Hero actions">
          <button className="square-btn hero-btn" onClick={toggleMobileSearch} aria-label="Toggle search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
            </svg>
          </button>
          <button className="square-btn hero-btn" onClick={onInfo} aria-label="Information">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9"></circle>
              <line x1="12" y1="10" x2="12" y2="16"></line>
              <circle cx="12" cy="7" r="1.25" fill="currentColor" stroke="none"></circle>
            </svg>
          </button>
        </div>
      </section>

      <section className="note-list-mobile" role="list" aria-label="Notes list (mobile cards)">
        {cards.length === 0 ? (
          <p className="mobile-empty">No notes yet. Tap + to create your first note!</p>
        ) : (
          cards.map((n) => (
            <button
              key={n.id}
              role="listitem"
              className="mobile-note-card"
              onClick={() => selectNote(n.id)}
              aria-label={`Open note: ${n.title || "Untitled"}`}
              title={n.title || "Untitled"}
            >
              <span className="mobile-note-title">{n.title || "Untitled"}</span>
            </button>
          ))
        )}
      </section>

      {/* Desktop layout preserved */}
      <div className="main-area">
        <Sidebar>
          <NoteList />
        </Sidebar>
        <main className="content" role="main">
          <NoteEditorForm />
        </main>
      </div>

      {/* FAB */}
      <button className="fab-add" onClick={onCreate} aria-label="Create new note">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
}
