import React from "react";
import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/Sidebar";
import NoteList from "../components/notes/NoteList.jsx";
import NoteEditorForm from "../components/notes/NoteEditorForm.jsx";
import { useNotes } from "../context/NotesContext";
import "../styles/notes-app.css";

/**
 * PUBLIC_INTERFACE
 * NotesApp
 * Main notes application page styled to reflect the Figma Home Screen:
 * - Top bar with title and icon buttons (search/info)
 * - Sidebar list and main editor area
 * - Floating Action Button (mobile) to create a new note
 * Functionality remains unchanged.
 */
export default function NotesApp() {
  const { createNote } = useNotes();

  const onCreate = () => createNote({ title: "New note" });

  return (
    <div className="app-shell">
      <TopBar onNewNote={onCreate} />
      <div className="main-area">
        <Sidebar>
          <NoteList />
        </Sidebar>
        <main className="content" role="main">
          <NoteEditorForm />
        </main>
      </div>

      {/* Mobile FAB for new note */}
      <button className="fab-add" onClick={onCreate} aria-label="Create new note">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
}
