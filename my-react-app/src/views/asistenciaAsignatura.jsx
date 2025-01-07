import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const AsistenciaAsignatura = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedules = async () => {
    try {
      const courseID = localStorage.getItem("course_id"); // Obtén el ID del curso desde localStorage
      if (!courseID) {
        throw new Error("No se encontró un curso seleccionado.");
      }

      console.log(localStorage.getItem("course"));
      const token = localStorage.getItem("token"); // Obtén el token desde localStorage
      if (!token) {
        throw new Error("No se encontró un token.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Solicitar los registros de asistencia para el curso
    const response = await axios.get(`http://localhost:3000/attendance/course/${courseID}`, {
      headers,
    });

    if (response.data) {
      console.log("Datos obtenidos:");
      console.log(response.data);

      // Extraer las fechas únicas
      const uniqueDates = [
        ...new Set(
          response.data.map((attendance) => 
            new Date(attendance.date).toISOString().split('T')[0] // Extraer solo la parte de la fecha (YYYY-MM-DD)
          )
        ),
      ];

      console.log("Fechas únicas:", uniqueDates);

      // Guardar las fechas únicas en el estado
      setSchedules(uniqueDates);
      } else {
        throw new Error("La respuesta del servidor no contiene clases válidas.");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error al cargar los horarios:", err);
      setError("No se pudieron cargar las clases.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules(); // Llama a la función para obtener los horarios cuando el componente se monta
  }, []);

  const navigate = useNavigate(); // Si usas v6 de react-router-dom
  
  const handleViewAttendance = (schedule) => {
    // Guardamos la fecha de la clase seleccionada en localStorage
    localStorage.setItem('selected_schedule', schedule);
    navigate('/asistencia-curso');
  };

  return (
    <Box sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {localStorage.getItem("course_name")}
      </Typography>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Habilitada</TableCell>
              <TableCell>Acción</TableCell> {/* Columna para el botón */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Cargando clases...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4}>{error}</TableCell>
              </TableRow>
            ) : schedules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No hay clases registradas</TableCell>
              </TableRow>
            ) : (
              schedules.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{schedule}</TableCell> {/* Mostramos directamente el horario (sin convertirlo) */}
                  <TableCell>Sí</TableCell> {/* Aquí puedes agregar lógica de habilitación si es necesario */}
                  <TableCell>
                    {/* Botón "Ver asistencia" */}
                    <Button variant="contained" onClick={() => handleViewAttendance(schedule)}>
                      Ver asistencia
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AsistenciaAsignatura;
