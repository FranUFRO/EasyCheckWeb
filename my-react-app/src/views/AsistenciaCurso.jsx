import React from "react";
import Asistencia from "../components/Asistencia"; // Ruta al componente
import { Container, Typography } from "@mui/material";

const AsistenciaCurso = () => {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Asistencia del Curso
      </Typography>
      <Asistencia />
    </Container>
  );
};

export default AsistenciaCurso;
