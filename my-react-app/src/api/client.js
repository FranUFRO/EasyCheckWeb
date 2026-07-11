// Cliente HTTP mínimo para la API EasyCheck.
// Las rutas relativas (/api/...) pasan por el proxy de Vite hacia el backend.

const SESSION_KEY = 'easycheck.session'

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export async function apiFetch(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (auth) {
    const session = getSession()
    // Auth de desarrollo del backend: los guards exigen un header Authorization
    // (cualquier valor) y leen el rol desde x-user-role (middleware de main.ts).
    headers.Authorization = 'Bearer dev-token'
    if (session?.role) headers['x-user-role'] = session.role
  }

  let response
  try {
    response = await fetch(path, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(
      'No se pudo conectar con el backend. ¿Está corriendo en http://localhost:3000?',
      0,
      null,
    )
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    // respuestas sin body JSON
  }

  if (!response.ok) {
    // El backend usa `message` (auth/subject/guards) o `error` (assistance/users).
    const raw = data?.message ?? data?.error ?? `Error ${response.status}`
    const message = Array.isArray(raw) ? raw.join(', ') : raw
    throw new ApiError(message, response.status, data)
  }

  return data
}
