import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/asistenciaAsignatura";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      {/* Navbar siempre visible */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
