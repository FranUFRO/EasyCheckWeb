import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const Asistencia = () => {
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const courseID = localStorage.getItem("course_id");
  const selectedSchedule = localStorage.getItem("selected_schedule"); // Fecha seleccionada (YYYY-MM-DD)

  const fetchAttendances = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No se encontró un token de autenticación.");

      const headers = { Authorization: `Bearer ${token}` };

      // Obtener todas las asistencias del curso
      const attendanceResponse = await axios.get(
        `http://localhost:3000/attendance/course/${courseID}`,
        { headers }
      );
      console.log("Asistencias recibidas del servidor:", attendanceResponse.data);

      // Filtrar asistencias por fecha seleccionada
      const filteredAttendances = attendanceResponse.data.filter(
        (attendance) => attendance.date.split("T")[0] === selectedSchedule
      );
      console.log("Asistencias filtradas por la fecha seleccionada:", filteredAttendances);

      // Obtener los IDs únicos de estudiantes
      const uniqueStudentIds = [
        ...new Set(filteredAttendances.map((attendance) => attendance.studentId)),
      ];
      console.log("IDs únicos de estudiantes:", uniqueStudentIds);

      // Obtener información de los estudiantes únicos
      const studentsData = await Promise.all(
        uniqueStudentIds.map(async (studentId) => {
          try {
            const studentResponse = await axios.get(
              `http://localhost:3000/students/${studentId}`,
              { headers }
            );
            const studentAttendances = filteredAttendances.filter(
              (attendance) => attendance.studentId === studentId
            );
            const presentState = studentAttendances[0]?.present || false;
            return {
              ...studentResponse.data,
              present: presentState,
              attendanceId: studentAttendances[0]?._id, // ID de la asistencia para actualizar
            };
          } catch (error) {
            console.error(`Error al obtener datos del estudiante ${studentId}:`, error);
            return { id: studentId, name: "Desconocido", email: "Desconocido", present: false };
          }
        })
      );

      console.log("Información de los estudiantes:", studentsData);

      setStudentsInfo(studentsData);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar las asistencias o estudiantes:", err);
      setError("No se pudieron cargar las asistencias.");
      setLoading(false);
    }
  };

  const handleAttendanceChange = (attendanceId, presentState) => {
    // Actualizar solo el estado local para cambios temporales
    setStudentsInfo((prevStudents) =>
      prevStudents.map((student) =>
        student.attendanceId === attendanceId
          ? { ...student, present: presentState }
          : student
      )
    );
    console.log(`Estado de asistencia cambiado localmente para ID ${attendanceId}`);
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Asistencias del Curso
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Fecha: {selectedSchedule}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">N°</TableCell>
              <TableCell>Nombre del Alumno</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Asistencia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Cargando asistencias...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {error}
                </TableCell>
              </TableRow>
            ) : studentsInfo.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No se encontraron estudiantes para la fecha seleccionada.
                </TableCell>
              </TableRow>
            ) : (
              studentsInfo.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{student.name || "Desconocido"}</TableCell>
                  <TableCell>{student.email || "Desconocido"}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={student.present}
                      onChange={(e) =>
                        handleAttendanceChange(student.attendanceId, e.target.checked)
                      }
                    />
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

export default Asistencia;
