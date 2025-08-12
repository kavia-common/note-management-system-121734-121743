import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Editor from './components/Editor';
import HomeScreen from './pages/HomeScreen';
import HomeScreenEmpty from './pages/HomeScreenEmpty';
import EditorScreen from './pages/EditorScreen';
import SampleNote from './pages/SampleNote';

/** PUBLIC_INTERFACE
 * App
 * Main application component. Provides theme toggle and client-side routing
 * to the Figma-based pages while keeping the original simple Editor as the
 * default route for compatibility with existing tests.
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
    <BrowserRouter>
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
            <nav className="app-nav" aria-label="Pages" style={{ marginBottom: 12 }}>
              <Link className="App-link" to="/" style={{ marginRight: 8 }}>Editor (Simple)</Link>
              <Link className="App-link" to="/home" style={{ marginRight: 8 }}>Home</Link>
              <Link className="App-link" to="/home-empty" style={{ marginRight: 8 }}>Home Empty</Link>
              <Link className="App-link" to="/editor" style={{ marginRight: 8 }}>Editor</Link>
              <Link className="App-link" to="/sample">Sample Note</Link>
            </nav>

            <Routes>
              <Route path="/" element={
                <>
                  <h1 className="app-title">Notes</h1>
                  <Editor />
                </>
              } />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/home-empty" element={<HomeScreenEmpty />} />
              <Route path="/editor" element={<EditorScreen />} />
              <Route path="/sample" element={<SampleNote />} />
            </Routes>
          </div>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
