"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en">
      <body className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
        <div className="container py-3">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <h2>📝 Premium Todo App</h2>
            <button
              className={`btn ${darkMode ? "btn-light" : "btn-dark"}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
