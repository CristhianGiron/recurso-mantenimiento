import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Module from './pages/Limpieza';
import Autoevaluacion from './pages/ActividadLimpieza';
import Respaldo from './pages/Respaldo';
import Limpieza from './pages/Limpieza';
import Diagnostico from './pages/Diagnostico';
import Reparacion from './pages/Reparacion';
import ActividadLimpieza from './pages/ActividadLimpieza';
import ActividadReparacion from './pages/ActividadRewparacion';
import ActividadRespaldoAvanzada from './pages/ActividadRespaldo';
import DiagnosticoProblemas from './pages/ActividadDiagnostico';
import Desisntalacion from './pages/Desisntalacion';
import EvaluacionDesinstalacion from './pages/ActividadDesinstalacion';
import EvaluacionFinal from './pages/EvaluacionFinal';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modulo/respaldo" element={<Respaldo />} />
        <Route path="/modulo/limpieza" element={<Limpieza />} />
        <Route path="/modulo/diagnostico" element={<Diagnostico />} />
        <Route path="/modulo/reparacion" element={<Reparacion />} />
        <Route path="/modulo/desinstalacion" element={<Desisntalacion />} />
        <Route path="/modulo/evaluacion-limpieza" element={<ActividadLimpieza />} />
        <Route path="/modulo/evaluacion-reparacion" element={<ActividadReparacion />} />
        <Route path="/modulo/evaluacion-respaldo" element={<ActividadRespaldoAvanzada />} />
        <Route path="/modulo/evaluacion-diagnostico" element={<DiagnosticoProblemas />} />
        <Route path="/modulo/evaluacion-desinstalacion" element={<EvaluacionDesinstalacion />} />
        <Route path="/modulo/evaluacion" element={<EvaluacionFinal />} />

      </Routes>
    </Router>
  );
}










/* Instalación necesaria: React Router, Tailwind */
// npm install react-router-dom
// Tailwind CSS según la documentación oficial
