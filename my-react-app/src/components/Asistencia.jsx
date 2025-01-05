import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Paper,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const Asistencia = () => {
  const alumnos = [
    { id: 1, nombre: "Sebastian Torres Ulloa", asistio: false },
    { id: 2, nombre: "Sebastian Torres Ulloa", asistio: true },
    { id: 3, nombre: "Sebastian Torres Ulloa", asistio: false },
    { id: 4, nombre: "Sebastian Torres Ulloa", asistio: true },
    { id: 5, nombre: "Sebastian Torres Ulloa", asistio: false },
    { id: 6, nombre: "Sebastian Torres Ulloa", asistio: true },
    { id: 7, nombre: "Sebastian Torres Ulloa", asistio: false },
    { id: 8, nombre: "Sebastian Torres Ulloa", asistio: true },
    { id: 9, nombre: "Sebastian Torres Ulloa", asistio: false },
    { id: 10, nombre: "Sebastian Torres Ulloa", asistio: true },
    { id: 11, nombre: "Sebastian Torres Ulloa", asistio: false },
  ];

  const handleCheckboxChange = (id) => {
    console.log(`Se cambió el estado de asistencia del alumno con ID: ${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">N°</TableCell>
            <TableCell>Nombre del alumno</TableCell>
            <TableCell align="center">Asistencia</TableCell>
            <TableCell align="center">Detalles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alumnos.map((alumno, index) => (
            <TableRow key={alumno.id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell>{alumno.nombre}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={alumno.asistio}
                  onChange={() => handleCheckboxChange(alumno.id)}
                />
              </TableCell>
              <TableCell align="center">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Asistencia;
