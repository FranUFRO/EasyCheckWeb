import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate(); // Hook para navegar entre vistas

  const handleLogin = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    navigate("/home"); // Navega a la vista Home
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
      onSubmit={handleLogin} // Asocia el evento al formulario
    >
      <TextField
        label="Username"
        variant="outlined"
       
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        required
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{
          textTransform: "none",
          width: "100%",
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
