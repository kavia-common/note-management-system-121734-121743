import React, { useEffect, useMemo, useState } from "react";
import { useNotes } from "../../context/NotesContext";

/**
 * PUBLIC_INTERFACE
 * NoteEditorForm
 * Controlled form for editing a selected note. If no note is selected, shows a friendly prompt.
 */
export default function NoteEditorForm() {
  const { filteredNotes, selectedNoteId, createNote, updateNote, deleteNote } = useNotes();
  const selected = useMemo(
    () => filteredNotes.find((n) => n.id === selectedNoteId) || null,
    [filteredNotes, selectedNoteId]
  );

  const [title, setTitle] = useState(selected?.title || "");
  const [content, setContent] = useState(selected?.content || "");

  useEffect(() => {
    setTitle(selected?.title || "");
    setContent(selected?.content || "");
  }, [selected?.id]);

  if (!selected) {
    return (
      <div style={{ padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Welcome 👋</h3>
        <p style={{ color: "var(--text-muted)" }}>Select a note from the list or create a new one.</p>
        <button className="primary-btn" onClick={() => createNote({ title: "New note" })}>
          Create your first note
        </button>
      </div>
    );
  }

  const onSave = async () => {
    await updateNote(selected.id, { title, content });
  };

  const onDelete = async () => {
    // eslint-disable-next-line no-alert
    const ok = window.confirm("Delete this note?");
    if (ok) await deleteNote(selected.id);
  };

  return (
    <form className="editor-form" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
      <label htmlFor="note-title-input" style={{ fontSize: 12, color: "var(--text-muted)" }}>
        Title
      </label>
      <input
        id="note-title-input"
        className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="off"
      />
      <label htmlFor="note-body-input" style={{ fontSize: 12, color: "var(--text-muted)" }}>
        Body
      </label>
      <textarea
        id="note-body-input"
        className="textarea"
        placeholder="Type your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={12}
      />
      <div className="form-actions">
        <button type="button" className="ghost-btn" onClick={onDelete} aria-label="Delete note">
          Delete
        </button>
        <button type="submit" className="primary-btn" aria-label="Save note">
          Save
        </button>
      </div>
    </form>
  );
}
