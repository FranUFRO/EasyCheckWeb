import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Ocupa toda la pantalla
        padding: "20px",
        marginTop: "-64px", // Evita superposición con el Navbar
      }}
    >
      <Typography variant="h3" gutterBottom>
        Bienvenido a la Plataforma
      </Typography>
      <Typography variant="body1">
        Aquí podrás gestionar tus asignaturas y acceder a todas las
        funcionalidades.
      </Typography>
    </Box>
  );
};

export default Home;
