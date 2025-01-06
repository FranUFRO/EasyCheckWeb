import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import logoUFRO from "../assets/logoAzulUfro.png";
import LoginForm from "../components/LoginForm"; // Importamos el componente LoginForm

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#cfcfcf", // Color de fondo gris
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        {/* Título del Login con el logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Inicio de sesión
          </Typography>
          <img
            src={logoUFRO}
            alt="Logo Universidad de La Frontera"
            style={{ width: 180, height: 60 }}
          />
        </Box>

        {/* Componente de formulario de inicio de sesión */}
        <LoginForm />
      </Paper>
    </Box>
  );
};

export default Login;
