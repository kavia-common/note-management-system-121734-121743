import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/common.css';
import '../assets/styles/home-screen.css';

/** PUBLIC_INTERFACE
 * HomeScreen
 * React component rendering the Figma "Home Screen" with cards and actions.
 * - Preserves design tokens via common.css
 * - FAB navigates to the Editor screen
 */
function HomeScreen() {
  const navigate = useNavigate();

  const handleSearch = () => {
    // Placeholder action
    // eslint-disable-next-line no-alert
    alert('Search action (placeholder)');
  };

  const handleInfo = () => {
    // Placeholder action
    // eslint-disable-next-line no-alert
    alert('Information (placeholder)');
  };

  const handleAdd = () => {
    navigate('/editor');
  };

  return (
    <main className="screen home-screen" aria-label="Notes Home Screen">
      <h1 className="typo-14 hero-title">Notes</h1>

      <button className="note-btn btn-search" aria-label="Search" onClick={handleSearch}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/cbb8a0c1-92fc-4e41-a53c-6bd4bc6de921"
          alt=""
          aria-hidden="true"
        />
      </button>

      <button className="note-btn btn-info" aria-label="Information" onClick={handleInfo}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d1c4e80b-f784-487b-80c0-6a70ae26371f"
          alt=""
          aria-hidden="true"
        />
      </button>

      <div className="shape card-1" role="img" aria-label="Card: Book Review" />
      <p className="typo-13 text-card-1">
        Book Review : The Design of Everyday Things by Don Norman
      </p>

      <div className="shape card-2" role="img" aria-label="Card: Animes produced by Ufotable" />
      <p className="typo-13 text-card-2">
        Animes produced by Ufotable
      </p>

      <div className="shape card-3" role="img" aria-label="Card: Mangas planned to read" />
      <p className="typo-13 text-card-3">
        Mangas planned to read
      </p>

      <div className="shape card-4" role="img" aria-label="Card: Awesome tweets collection" />
      <p className="typo-13 text-card-4">
        Awesome tweets collection
      </p>

      <div className="shape card-5" role="img" aria-label="Card: List of free and open source apps" />
      <p className="typo-13 text-card-5">
        List of free &amp; open source apps
      </p>

      <button className="fab fab-add" aria-label="Add new note" onClick={handleAdd}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/25c2e668-b159-4189-b06f-7da9b7ccfbe9"
          alt=""
          aria-hidden="true"
        />
      </button>
    </main>
  );
}

export default HomeScreen;
