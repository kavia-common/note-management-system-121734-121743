import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/common.css';
import '../assets/styles/home-screen-empty.css';

/** PUBLIC_INTERFACE
 * HomeScreenEmpty
 * React component rendering the "Home Screen Empty" design.
 * - Preserves design system tokens via common.css
 * - FAB navigates to the Editor screen
 */
function HomeScreenEmpty() {
  const navigate = useNavigate();

  const handleSearch = () => {
    // eslint-disable-next-line no-alert
    alert('Search action (placeholder)');
  };

  const handleInfo = () => {
    // eslint-disable-next-line no-alert
    alert('Information (placeholder)');
  };

  const handleAdd = () => {
    navigate('/editor');
  };

  return (
    <main className="screen home-screen-empty" aria-label="Notes Home Screen (Empty)">
      <h1 className="typo-14 hero-title">Notes</h1>

      <button className="note-btn btn-search" aria-label="Search" onClick={handleSearch}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d0b016cf-48de-4d55-bc7c-3b1b2fed0b5a"
          alt=""
          aria-hidden="true"
        />
      </button>

      <button className="note-btn btn-info" aria-label="Information" onClick={handleInfo}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6767b783-6727-4712-85d2-cdf5ab15a36d"
          alt=""
          aria-hidden="true"
        />
      </button>

      <img
        className="illustration"
        src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/58b26374-5e73-4002-8242-71adf6f5c23a"
        alt="Notebook illustration (Storyset)"
      />

      <p className="typo-15 empty-prompt">Create your first note !</p>

      <button className="fab fab-add" aria-label="Add new note" onClick={handleAdd}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6325aa39-0849-4803-9d73-a0caca1c01a8"
          alt=""
          aria-hidden="true"
        />
      </button>
    </main>
  );
}

export default HomeScreenEmpty;
