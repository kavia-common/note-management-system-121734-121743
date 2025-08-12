import React from "react";
import { useNotes } from "../../context/NotesContext";

/**
 * PUBLIC_INTERFACE
 * NoteList
 * Displays a list of notes filtered by search with selection support.
 */
export default function NoteList() {
  const { filteredNotes, selectedNoteId, selectNote } = useNotes();

  if (!filteredNotes.length) {
    return <div style={{ color: "var(--text-muted)", fontSize: 14 }}>No notes yet. Create one!</div>;
  }

  return (
    <div className="note-list" role="list" aria-label="Notes list">
      {filteredNotes.map((n) => (
        <button
          key={n.id}
          role="listitem"
          className={`note-card ${selectedNoteId === n.id ? "active" : ""}`}
          onClick={() => selectNote(n.id)}
          aria-current={selectedNoteId === n.id ? "true" : "false"}
        >
          <h4>{n.title || "Untitled"}</h4>
          <p>
            {new Date(n.updatedAt).toLocaleString()} — {trimExcerpt(n.content)}
          </p>
        </button>
      ))}
    </div>
  );
}

function trimExcerpt(htmlOrText) {
  const text = String(htmlOrText || "").replace(/<[^>]+>/g, "");
  if (text.length <= 80) return text;
  return text.slice(0, 80) + "…";
}
