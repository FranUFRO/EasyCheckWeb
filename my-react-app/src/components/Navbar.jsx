import React, { useState, useEffect } from "react";
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
import axios from "axios";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [courses, setCourses] = useState([]); // Inicializamos con un array vacío
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para indicar si estamos cargando los datos

  const fetchCourses = async () => {
    try {
      const teacherId = localStorage.getItem("teacherId"); // Obtén el ID del profesor desde localStorage
      const token = localStorage.getItem("token"); // Obtén el token desde localStorage

      if (!teacherId || !token) {
        throw new Error("No se encontraron credenciales en localStorage.");
      }

      console.log("Cargando cursos para el profesor con ID:", teacherId);

      // Configuración de los headers con el token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Solicitud al backend con el token
      const response = await axios.get(`http://localhost:3000/teachers/${teacherId}/courses`, {
        headers,
      });

      // Verificamos si los datos tienen el formato esperado
      if (response.data && Array.isArray(response.data)) {
        setCourses(response.data); // Si es un array, lo asignamos directamente
      } else if (response.data && Array.isArray(response.data.courses)) {
        setCourses(response.data.courses); // Si viene dentro de un objeto, accedemos al array
      } else {
        throw new Error("La respuesta del servidor no contiene cursos válidos.");
      }

      setLoading(false); // La carga finalizó
    } catch (err) {
      console.error("Error al cargar los cursos:", err);
      setError("No se pudieron cargar las asignaturas.");
      setLoading(false); // La carga finalizó incluso en caso de error
    }
  };

  useEffect(() => {
    fetchCourses(); // Carga los cursos cuando se monta el componente
  }, []);

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
            src="../../src/assets/logoUFRO.png"
            alt="Logo"
            style={{ height: "40px", width: "auto", marginRight: "16px" }}
          />
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
          {loading ? (
            <MenuItem disabled>Cargando asignaturas...</MenuItem>
          ) : error ? (
            <MenuItem disabled>{error}</MenuItem>
          ) : courses.length === 0 ? (
            <MenuItem disabled>No hay asignaturas disponibles</MenuItem>
          ) : (
            courses.map((course) => (
              <MenuItem key={course._id} onClick={handleMenuClose}>
                {course.name} - {course.code}
              </MenuItem>
            ))
          )}
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
