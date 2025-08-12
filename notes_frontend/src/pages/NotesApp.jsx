import React from "react";
import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/Sidebar";
import NoteList from "../components/notes/NoteList.jsx";
import NoteEditorForm from "../components/notes/NoteEditorForm.jsx";
import { useNotes } from "../context/NotesContext";

/**
 * PUBLIC_INTERFACE
 * NotesApp
 * Main notes application page with TopBar, Sidebar (list), and Editor content.
 * Mobile-first: sidebar collapses automatically on small screens; search is in the top bar.
 */
export default function NotesApp() {
  const { createNote } = useNotes();

  return (
    <div className="app-shell">
      <TopBar onNewNote={() => createNote({ title: "New note" })} />
      <div className="main-area">
        <Sidebar>
          <NoteList />
        </Sidebar>
        <main className="content" role="main">
          <NoteEditorForm />
        </main>
      </div>
    </div>
  );
}
