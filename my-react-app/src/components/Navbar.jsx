import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#1976d2",
        top: 0,
        left: 0,
        width: "100%",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/UFRO.svg/1200px-UFRO.svg.png"
            alt="Logo"
            style={{ height: "40px", width: "auto", marginRight: "16px" }}
          />
          UFRO
        </Typography>

        {/* Menú desplegable */}
        <Button
          color="inherit"
          onClick={handleMenuOpen}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          Asignaturas
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Asignatura 1 - 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Asignatura 2 - 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Asignatura 3 - 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Asignatura 3 - 4</MenuItem>
        </Menu>

        {/* Campo de búsqueda */}
        <TextField
          variant="outlined"
          placeholder="Buscar"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            width: "250px",
            marginRight: "16px",
          }}
        />

        {/* Avatar */}
        <IconButton>
          <Avatar
            alt="User"
            src="https://i.pravatar.cc/300"
            sx={{ marginLeft: "16px" }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
