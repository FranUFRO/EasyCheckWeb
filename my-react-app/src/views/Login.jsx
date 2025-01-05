import React from "react";
import Box from "@mui/material/Box";
import LoginCard from "../components/LoginCard";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#e0e0e0",
        padding: 2,
      }}
    >
      <LoginCard />
    </Box>
  );
};

export default Login;
