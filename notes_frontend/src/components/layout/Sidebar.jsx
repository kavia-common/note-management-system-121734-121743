import React from "react";

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Sidebar container for navigation. On desktop it shows alongside the editor.
 */
export default function Sidebar({ children }) {
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="sidebar-inner">{children}</div>
    </aside>
  );
}
