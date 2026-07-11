// Panel del profesor: CU-05 (asistencia de su asignatura), CU-07 (deshabilitar
// registro), CU-08 (habilitar registro y editar registros de asistencia).
// El RUT del profesor sale de la sesión iniciada en CU-01.
import { useState } from 'react'
import {
  getSubjectAssistance,
  setClassRegistration,
  editAssistanceRecord,
  getStudentSubjectRecords,
} from '../api/endpoints'
import Feedback from '../components/Feedback'

// CU-05 — roster de asistencia de una asignatura que dicta el profesor.
function SubjectAssistance({ professorRut }) {
  const [subjectCode, setSubjectCode] = useState('')
  const [rows, setRows] = useState(null)
  const [queriedCode, setQueriedCode] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFeedback(null)
    setRows(null)
    setLoading(true)
    try {
      const data = await getSubjectAssistance(professorRut, subjectCode.trim())
      setRows(data)
      setQueriedCode(subjectCode.trim())
    } catch (e) {
      setFeedback({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2>Asistencia de mi asignatura</h2>
      <p className="hint">
        Muestra el porcentaje de asistencia de cada estudiante inscrito. Seed: el
        profesor 22222222-2 dicta ICC-101 y ICC-202.
      </p>
      <form className="inline-form" onSubmit={handleSubmit}>
        <input
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          placeholder="Código de asignatura (ICC-101)"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Consultando…' : 'Consultar'}
        </button>
      </form>
      <Feedback feedback={feedback} />

      {rows && rows.length === 0 && (
        <p className="hint">No hay estudiantes inscritos en {queriedCode}.</p>
      )}
      {rows && rows.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>RUT</th>
              <th>Estudiante</th>
              <th>Clases asistidas</th>
              <th>Total de clases</th>
              <th>% asistencia</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.rut}>
                <td>{row.rut}</td>
                <td>{row.name}</td>
                <td>{row.classesAttended}</td>
                <td>{row.totalClasses}</td>
                <td>
                  <span className={`badge ${row.assistancePercentage >= 75 ? 'ok' : 'warn'}`}>
                    {row.assistancePercentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

// CU-07 / CU-08 — deshabilitar o habilitar el registro de asistencia de una clase.
function RegistrationToggle({ professorRut }) {
  const [classId, setClassId] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [lastStatus, setLastStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const apply = async (status) => {
    setFeedback(null)
    setLoading(true)
    try {
      const result = await setClassRegistration(professorRut, Number(classId), status)
      setLastStatus(result.registrationStatus)
      setFeedback({
        type: 'success',
        text: `Clase ${result.classId}: registro ${
          result.registrationStatus === 'DISABLED' ? 'deshabilitado' : 'habilitado'
        }.`,
      })
    } catch (e) {
      setFeedback({ type: 'error', text: e.message })
      setLastStatus(null)
    } finally {
      setLoading(false)
    }
  }

  const invalidId = classId.trim() === '' || Number.isNaN(Number(classId))

  return (
    <section className="card">
      <h2>Registro de asistencia por clase</h2>
      <p className="hint">
        Deshabilita (CU-07) o habilita (CU-08) que los estudiantes marquen
        asistencia en una clase. Seed: clases 1 y 2 (ICC-101), 3 (ICC-202); la
        clase 2 parte deshabilitada.
      </p>
      <div className="inline-form">
        <input
          type="number"
          min="1"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          placeholder="ID de la clase (1)"
        />
        <button
          className="danger"
          disabled={loading || invalidId}
          onClick={() => apply('DISABLED')}
        >
          Deshabilitar registro
        </button>
        <button disabled={loading || invalidId} onClick={() => apply('ENABLED')}>
          Habilitar registro
        </button>
      </div>
      {lastStatus && (
        <p>
          Estado actual:{' '}
          <span className={`badge ${lastStatus === 'ENABLED' ? 'ok' : 'warn'}`}>
            {lastStatus === 'ENABLED' ? 'HABILITADO' : 'DESHABILITADO'}
          </span>
        </p>
      )}
      <Feedback feedback={feedback} />
    </section>
  )
}

// CU-08 — editar registros de asistencia (presente/ausente) de un estudiante.
function EditAssistance({ professorRut }) {
  const [studentRut, setStudentRut] = useState('')
  const [subjectCode, setSubjectCode] = useState('')
  const [result, setResult] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)

  const search = async (event) => {
    event?.preventDefault()
    setFeedback(null)
    setLoading(true)
    try {
      const data = await getStudentSubjectRecords(studentRut.trim(), subjectCode.trim())
      setResult(data)
      if (data.records.length === 0) {
        setFeedback({
          type: 'error',
          text: `Sin registros de asistencia para ${studentRut.trim()} en ${subjectCode.trim()}.`,
        })
      }
    } catch (e) {
      setResult(null)
      setFeedback({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }

  const toggle = async (record) => {
    setFeedback(null)
    setLoading(true)
    try {
      const updated = await editAssistanceRecord(professorRut, record.id, !record.present)
      setFeedback({
        type: 'success',
        text: `Registro ${updated.recordId} de ${updated.studentRut} marcado como ${
          updated.present ? 'presente' : 'ausente'
        }.`,
      })
      // refresca la tabla con el nuevo estado
      const data = await getStudentSubjectRecords(studentRut.trim(), subjectCode.trim())
      setResult(data)
    } catch (e) {
      setFeedback({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2>Editar registros de asistencia</h2>
      <p className="hint">
        Busca los registros de un estudiante en una asignatura que dictas y
        corrige presente/ausente (CU-08). Seed: 11111111-1 y 55555555-5 tienen
        registros en ICC-101.
      </p>
      <form className="inline-form" onSubmit={search}>
        <input
          value={studentRut}
          onChange={(e) => setStudentRut(e.target.value)}
          placeholder="RUT del estudiante (11111111-1)"
        />
        <input
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          placeholder="Asignatura (ICC-101)"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando…' : 'Buscar registros'}
        </button>
      </form>
      <Feedback feedback={feedback} />

      {result && result.records.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID registro</th>
              <th>Clase</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {result.records.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.classId}</td>
                <td>{new Date(record.date).toLocaleDateString('es-CL')}</td>
                <td>
                  <span className={`badge ${record.present ? 'ok' : 'warn'}`}>
                    {record.present ? 'Presente' : 'Ausente'}
                  </span>
                </td>
                <td>
                  <button
                    className="secondary"
                    disabled={loading}
                    onClick={() => toggle(record)}
                  >
                    Marcar {record.present ? 'ausente' : 'presente'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

const TABS = [
  { id: 'roster', label: 'Asistencia de asignatura' },
  { id: 'registration', label: 'Habilitar / deshabilitar registro' },
  { id: 'edit', label: 'Editar registros' },
]

export default function ProfessorPanel({ session }) {
  const [tab, setTab] = useState('roster')

  return (
    <>
      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? 'tab active' : 'tab'}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      {tab === 'roster' && <SubjectAssistance professorRut={session.rut} />}
      {tab === 'registration' && <RegistrationToggle professorRut={session.rut} />}
      {tab === 'edit' && <EditAssistance professorRut={session.rut} />}
    </>
  )
}
