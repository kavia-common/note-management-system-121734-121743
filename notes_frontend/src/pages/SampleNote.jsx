import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/common.css';
import '../assets/styles/sample-note.css';

/** PUBLIC_INTERFACE
 * SampleNote
 * Static sample note screen converted from Figma HTML.
 */
function SampleNote() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history && window.history.length > 1) navigate(-1);
    else navigate('/home');
  };

  const handleMode = () => {
    // eslint-disable-next-line no-alert
    alert('Mode action (placeholder)');
  };

  return (
    <main className="screen sample-note-screen" aria-label="Sample Note Screen">
      <button className="note-btn btn-back" aria-label="Back" onClick={goBack}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/7747ca84-f99d-4806-b6fb-dbdb963b38a0"
          alt=""
          aria-hidden="true"
        />
      </button>

      <button className="note-btn btn-mode" aria-label="Mode" onClick={handleMode}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2c1dbdce-b843-4849-a71a-43b53d24e831"
          alt=""
          aria-hidden="true"
        />
      </button>

      <h1 className="typo-22 sample-title">
        Book Review : The Design of Everyday Things by Don Norman
      </h1>

      <div className="typo-23 sample-body">
        The Design of Everyday Things is required reading for anyone who is interested in the user experience. I personally like to reread it every year or two.<br /><br />
        Norman is aware of the durability of his work and the applicability of his principles to multiple disciplines. <br /><br />
        If you know the basics of design better than anyone else, you can apply them flawlessly anywhere.
      </div>
    </main>
  );
}

export default SampleNote;
