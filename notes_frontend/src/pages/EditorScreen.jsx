import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/common.css';
import '../assets/styles/editor.css';

/** PUBLIC_INTERFACE
 * EditorScreen
 * A contenteditable-based rich text editor screen converted from the Figma HTML.
 * - Back button navigates back
 * - Visibility toggles preview (read-only)
 * - Save shows captured HTML content (placeholder)
 * - Toolbar applies document.execCommand formatting
 */
function EditorScreen() {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(false);

  /** PUBLIC_INTERFACE
   * goBack
   * Navigate to previous page or fallback to Home.
   */
  const goBack = () => {
    if (window.history && window.history.length > 1) navigate(-1);
    else navigate('/home');
  };

  /** PUBLIC_INTERFACE
   * togglePreview
   * Toggle between read-only preview and editable mode.
   */
  const togglePreview = () => {
    const body = bodyRef.current;
    const title = titleRef.current;
    if (!body || !title) return;

    const next = !preview;
    setPreview(next);

    body.setAttribute('contenteditable', next ? 'false' : 'true');
    title.setAttribute('contenteditable', next ? 'false' : 'true');
    body.classList.toggle('preview-mode', next);
  };

  /** PUBLIC_INTERFACE
   * saveNote
   * Placeholder: capture title text and body HTML.
   */
  const saveNote = () => {
    const title = titleRef.current ? titleRef.current.innerText.trim() : '';
    const content = bodyRef.current ? bodyRef.current.innerHTML : '';
    // eslint-disable-next-line no-alert
    alert(`Saved! (placeholder)\n\nTitle:\n${title}\n\nContent (HTML):\n${content}`);
  };

  function focusBody() {
    const body = bodyRef.current;
    if (!body) return;
    if (body.getAttribute('contenteditable') === 'true') body.focus();
  }

  function exec(cmd, value) {
    try {
      // document.execCommand is deprecated but still works across modern browsers for simple formatting
      document.execCommand(cmd, false, value);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('execCommand failed:', cmd, value, e);
    }
  }

  const onFormatClick = (e) => {
    const btn = e.target.closest('button.fmt-btn');
    if (!btn) return;

    e.preventDefault();
    focusBody();

    const cmd = btn.getAttribute('data-cmd');
    const val = btn.getAttribute('data-value');
    const insert = btn.getAttribute('data-insert');

    if (insert) {
      exec('insertText', insert);
      return;
    }

    if (!cmd) return;

    if (cmd === 'createLink') {
      // eslint-disable-next-line no-alert
      const url = prompt('Enter URL:', 'https://');
      if (url && url.trim()) exec('createLink', url.trim());
      return;
    }

    if (cmd === 'formatBlock') {
      exec('formatBlock', val || 'p');
      return;
    }

    exec(cmd);
  };

  return (
    <main className="screen editor-screen" aria-label="Editor Screen">
      <button className="note-btn btn-back" aria-label="Back" onClick={goBack}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9a5c81d6-c53a-4587-9de4-e53764fa23d7"
          alt=""
          aria-hidden="true"
        />
      </button>

      <button
        className="note-btn btn-visibility"
        aria-label="Toggle preview"
        aria-pressed={preview ? 'true' : 'false'}
        onClick={togglePreview}
      >
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/64b6cfa1-b0e6-4fb5-987f-a7e3c2a106a6"
          alt=""
          aria-hidden="true"
        />
      </button>

      <button className="note-btn btn-save" aria-label="Save note" onClick={saveNote}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/ae207402-53d9-4985-8d90-dd68f48feade"
          alt=""
          aria-hidden="true"
        />
      </button>

      <h1
        ref={titleRef}
        className="typo-18 editor-title editable"
        contentEditable={!preview}
        spellCheck="false"
        data-placeholder="Title"
      />

      <div
        ref={bodyRef}
        className="typo-19 editor-body editable"
        contentEditable={!preview}
        spellCheck="true"
        data-placeholder="Type something..."
      />

      <div
        className="format-bar"
        role="toolbar"
        aria-label="Formatting options"
        onClick={onFormatClick}
      >
        <button className="fmt-btn" type="button" data-cmd="bold" aria-label="Bold">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3f18ab88-545d-404a-a7f9-0a070fdfb69d" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-cmd="italic" aria-label="Italic">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7d6890b0-e8ef-4d74-93f5-cd32dc008c73" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-cmd="underline" aria-label="Underline">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b8cd93f7-c9ec-4d47-b280-70d2225e5f8f" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-cmd="createLink" aria-label="Insert link">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f131d149-a827-47e2-a7fb-df6b2936054f" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-cmd="strikeThrough" aria-label="Strikethrough">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/aa030221-0ef8-4458-a84d-c8b05d782582" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-cmd="insertOrderedList" aria-label="Numbered list">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c6ee942d-2d99-4867-a558-623e537438a1" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-cmd="insertUnorderedList" aria-label="Bulleted list">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a44f1e20-c90d-4dfb-bea7-ad33ebc7dc20" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-cmd="formatBlock" data-value="pre" aria-label="Code block">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8a785a0f-a524-4b7e-9963-7c37c7eebca1" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-cmd="formatBlock" data-value="h1" aria-label="Title">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/39a12ddc-334f-4c66-803f-46ebd2482945" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-insert="()" aria-label="Functions">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a1e4792c-cb51-44be-886e-4b10cbb9fb76" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-insert="- [ ] " aria-label="Checkbox">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/b488cc34-1981-48ed-8186-8192dbf9e90d" alt="" />
        </button>
        <button className="fmt-btn" type="button" data-cmd="formatBlock" data-value="blockquote" aria-label="Quote">
          <img className="icon-24" src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/8dbb31c5-7156-4b99-9687-cf32b9a62765" alt="" />
        </button>
      </div>
    </main>
  );
}

export default EditorScreen;
