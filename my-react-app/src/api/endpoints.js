// Endpoints del backend EasyCheck, agrupados por caso de uso.
import { apiFetch } from './client'

const enc = encodeURIComponent

// CU-01 — inicio de sesión
export function login(rut, password) {
  return apiFetch('/api/v1/auth/login', {
    method: 'POST',
    body: { rut, password },
    auth: false,
  })
}

// CU-02 — registro de nuevo usuario (administrativo)
export function registerUser(dto) {
  return apiFetch('/api/v1/users/register', { method: 'POST', body: dto })
}

// CU-09 — registro de nueva asignatura (administrativo)
export function createSubject(dto) {
  return apiFetch('/api/v1/subjects', { method: 'POST', body: dto })
}

// CU-03 — asistencia de un estudiante por asignatura (director / administrador)
export function getStudentAttendance(rut) {
  return apiFetch(`/api/v1/students/${enc(rut)}/attendance`)
}

// CU-05 — asistencia de los estudiantes de una asignatura (profesor)
export function getSubjectAssistance(professorRut, subjectCode) {
  return apiFetch(
    `/api/v1/professors/${enc(professorRut)}/subjects/${enc(subjectCode)}/assistance`,
  )
}

// CU-07 / CU-08 — deshabilitar / habilitar el registro de una clase (profesor)
export function setClassRegistration(professorRut, classId, status) {
  return apiFetch(
    `/api/v1/professors/${enc(professorRut)}/classes/${enc(classId)}/registration`,
    { method: 'PATCH', body: { status } },
  )
}

// CU-08 — editar un registro de asistencia (profesor)
export function editAssistanceRecord(professorRut, recordId, present) {
  return apiFetch(
    `/api/v1/professors/${enc(professorRut)}/assistance/${enc(recordId)}`,
    { method: 'PATCH', body: { present } },
  )
}

// Apoyo a CU-08: registros de un estudiante en una asignatura (con sus ids).
export function getStudentSubjectRecords(studentRut, subjectCode) {
  return apiFetch(
    `/api/v1/students/${enc(studentRut)}/assistance?subject=${enc(subjectCode)}`,
  )
}
