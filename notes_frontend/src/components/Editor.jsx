import React, { useState } from 'react';

/** PUBLIC_INTERFACE
 * Editor
 * A minimal note editor with a title input and body textarea to support text entry on all devices.
 * - Shows native on-screen keyboard on mobile when focusing either field.
 * - Includes basic Save button (placeholder handler).
 */
function Editor() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  /** PUBLIC_INTERFACE
   * handleSave
   * Placeholder save handler that demonstrates capturing the current editor state.
   */
  const handleSave = () => {
    // In a real app, integrate with backend (e.g., Supabase) to persist the note.
    // Avoid logging sensitive data in production.
    // eslint-disable-next-line no-alert
    alert(`Saved! (placeholder)\n\nTitle:\n${title}\n\nBody:\n${body}`);
  };

  return (
    <section className="editor" aria-labelledby="editor-heading">
      <h2 id="editor-heading" className="visually-hidden">Note Editor</h2>

      <label htmlFor="note-title" className="editor-label">
        Title
      </label>
      <input
        id="note-title"
        name="title"
        type="text"
        className="editor-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="off"
        // Autofocus helps immediately bring up the keypad on some devices
        autoFocus
      />

      <label htmlFor="note-body" className="editor-label">
        Body
      </label>
      <textarea
        id="note-body"
        name="body"
        className="editor-textarea"
        placeholder="Type your note..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={10}
      />

      <div className="editor-actions">
        <button type="button" className="btn" onClick={handleSave} aria-label="Save note">
          Save
        </button>
      </div>
    </section>
  );
}

export default Editor;
