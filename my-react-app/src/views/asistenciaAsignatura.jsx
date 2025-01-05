import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button
} from '@mui/material';

//despyes se borra es por mientras
const asistenciaAsignatura = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [data, setData] = useState([
    { id: 1, date: '20-03-2024', percentage: '100%', enabled: true },
    { id: 2, date: '22-03-2024', percentage: '90%', enabled: false },
    { id: 3, date: '25-03-2024', percentage: '80%', enabled: true },
  ]);

  const subjects = ['Asignatura 1-1', 'Asignatura 1-2', 'Asignatura 1-3'];

  //conectar con base de datos
  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    // Aquí puedes cargar datos dinámicos basados en la asignatura seleccionada
  };

  const handleViewAttendance = (id) => {
    // Redirigir a otra pantalla o manejar la lógica para ver la asistencia
    console.log(`Ver asistencia para la clase con ID: ${id}`);
  };

  return (
    <Box
      sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
     
      {/* Título */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        {selectedSubject || 'Asignatura x'}
      </Typography>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Porcentaje Asistencia</TableCell>
              <TableCell>Habilitada</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.percentage}</TableCell>
                <TableCell>
                  <Checkbox checked={row.enabled} disabled />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewAttendance(row.id)}
                  >
                    Ver Asistencia
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default asistenciaAsignatura;
