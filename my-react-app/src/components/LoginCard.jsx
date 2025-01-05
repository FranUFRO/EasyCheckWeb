import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LogoHeader from "./LogoHeader";
import LoginForm from "./LoginForm";

const LoginCard = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        borderRadius: 2,
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <LogoHeader />
      <LoginForm />
    </Paper>
  );
};

export default LoginCard;
