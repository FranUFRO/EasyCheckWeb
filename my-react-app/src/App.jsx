import { useState } from 'react'
import { getSession, saveSession, clearSession } from './api/client'
import LoginPage from './pages/LoginPage'
import ProfessorPanel from './pages/ProfessorPanel'
import AdminPanel from './pages/AdminPanel'
import DirectorPanel from './pages/DirectorPanel'

const ROLE_LABELS = {
  profesor: 'Profesor',
  director: 'Director de carrera',
  administrador: 'Administrador',
}

function App() {
  const [session, setSession] = useState(getSession)

  const handleLogin = (newSession) => {
    saveSession(newSession)
    setSession(newSession)
  }

  const handleLogout = () => {
    clearSession()
    setSession(null)
  }

  if (!session) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <div>
          <strong>EasyCheck</strong>
          <span className="header-sub">Panel web · UFRO</span>
        </div>
        <div className="header-user">
          <span>
            {ROLE_LABELS[session.role] ?? session.role} ·{' '}
            {session.fullName ?? session.rut}
          </span>
          <button className="secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="app-main">
        {session.role === 'profesor' && <ProfessorPanel session={session} />}
        {session.role === 'administrador' && <AdminPanel />}
        {session.role === 'director' && <DirectorPanel />}
      </main>
    </div>
  )
}

export default App
