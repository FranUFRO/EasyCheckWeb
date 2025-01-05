import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AsistenciaAsignatura from "./views/asistenciaAsignatura";
import AsistenciaCurso from "./views/AsistenciaCurso"; // Importa la nueva vista
import Home from "./views/home";
import Login from "./views/Login";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta principal para Login (sin Navbar) */}
        <Route path="/" element={<Login />} />

        {/* Rutas con Navbar */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/asistencia-asignatura"
          element={
            <>
              <Navbar />
              <AsistenciaAsignatura />
            </>
          }
        />
        <Route
          path="/asistencia-curso"
          element={
            <>
              <Navbar />
              <AsistenciaCurso />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
