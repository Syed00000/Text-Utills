import React, { useState, useEffect } from "react";
import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const body = document.body;
    if (mode === "dark") {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
      showAlert("Dark mode has been enabled", "success");
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
      showAlert("Light mode has been enabled", "success");
    }

    // Clean up classes on unmount
    return () => {
      body.classList.remove("dark-mode");
      body.classList.remove("light-mode");
    };
  }, [mode]);

  return (
    <Router>
      <Navbar
        title="TextUtils"
        aboutText="About us"
        mode={mode}
        toggleMode={toggleMode}
      />
      <Alert alert={alert} />
      <div className="container my-3">
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/"
            element={
              <TextForm
                showAlert={showAlert}
                heading="Enter the text to analyze"
                mode={mode}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
