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

// CU-05 — asistencia de los estudiantes de una asignatura (profesor).
// El RUT del profesor sale del token (ruta /me).
export function getSubjectAssistance(subjectCode) {
  return apiFetch(
    `/api/v1/professors/me/subjects/${enc(subjectCode)}/attendance`,
  )
}

// CU-07 / CU-08 — deshabilitar / habilitar el registro de una clase (profesor).
// La ruta legacy /:rut acepta ambos estados; el backend verifica rut === token.
export function setClassRegistration(professorRut, classId, status) {
  return apiFetch(
    `/api/v1/professors/${enc(professorRut)}/classes/${enc(classId)}/registration`,
    { method: 'PATCH', body: { status } },
  )
}

// CU-08 — habilitar / deshabilitar la ventana de edición de una clase.
// Requiere que el registro esté DISABLED antes de habilitar la edición.
export function setClassEditing(classId, status) {
  return apiFetch(`/api/v1/professors/me/classes/${enc(classId)}/editing`, {
    method: 'PATCH',
    body: { status },
  })
}

// CU-08 — editar un registro de asistencia (profesor, ruta /me)
export function editAssistanceRecord(recordId, present) {
  return apiFetch(`/api/v1/professors/me/assistance/${enc(recordId)}`, {
    method: 'PATCH',
    body: { present },
  })
}

// Apoyo a CU-08: registros de un estudiante en una asignatura (con sus ids).
export function getStudentSubjectRecords(studentRut, subjectCode) {
  return apiFetch(
    `/api/v1/students/${enc(studentRut)}/assistance?subject=${enc(subjectCode)}`,
  )
}
