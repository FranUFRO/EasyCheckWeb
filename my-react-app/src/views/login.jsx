import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import logoUFRO from "../assets/logoAzulUfro.png";

const Login = () => {
  const navigate = useNavigate(); // Hook para navegar entre vistas

  const handleLogin = () => {
    navigate("/home"); // Navega a la vista Home
  };

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

        {/* Campos de texto */}
        <TextField
          label="RUT (sin puntos ni guión)"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="clave intranet"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
        />

        {/* Botón de inicio de sesión */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleLogin} // Lógica de navegación
        >
          Iniciar sesión
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
