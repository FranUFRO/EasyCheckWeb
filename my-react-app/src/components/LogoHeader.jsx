import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const LogoHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
      }}
    >
      <Typography variant="h5" component="h1">
        Login
      </Typography>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/UFRO.svg/1200px-UFRO.svg.png"
        alt="Logo Universidad de La Frontera"
        style={{ height: "40px" }}
      />
    </Box>
  );
};

export default LogoHeader;
