import React, { useState, useEffect } from 'react';
import './App.css';
import Editor from './components/Editor';

/** PUBLIC_INTERFACE
 * App
 * This is the main application component. It provides a light/dark theme toggle
 * and renders the Editor screen so users can input/edit notes (title + body).
 */
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /** PUBLIC_INTERFACE
   * toggleTheme
   * Toggles the application theme between light and dark modes.
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="app-container">
          <h1 className="app-title">Notes</h1>
          <Editor />
        </div>
      </header>
    </div>
  );
}

export default App;
