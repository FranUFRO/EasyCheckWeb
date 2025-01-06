import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    setError(null); // Resetea el mensaje de error

    try {
      console.log("Intentando iniciar sesión...");
      
      // Realiza la solicitud POST al endpoint
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
        role: "teacher", // Fijamos el rol como "teacher"
      });

      // Si el servidor responde con éxito, guarda los datos y redirige
      if (response.status === 200) {
        const { token, id } = response.data;

        console.log("Login exitoso:", { id, token });

        // Guardar token e ID en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("teacherId", id);

        // Redirigir a la página principal
        navigate("/home");
      }
    } catch (err) {
      // Si hay un error, muestra el mensaje correspondiente
      console.error("Error en el login:", err.response || err);
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
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
      onSubmit={handleLogin} // Asocia la función al evento submit
    >
      <TextField
        label="Correo electrónico"
        variant="outlined"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
      />
      {error && (
        <Box sx={{ color: "red", fontSize: "0.875rem", textAlign: "center" }}>
          {error}
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{
          textTransform: "none",
          width: "100%",
        }}
      >
        Iniciar sesión
      </Button>
    </Box>
  );
};

export default LoginForm;
