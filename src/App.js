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
import IntroModulo from './pages/Introduccion';

export default function App() {
  const speakAllText = () => {
    // Extrae todo el texto visible del body
    const text = document.body.innerText;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Voz en español
    utterance.rate = 1;
    utterance.pitch = 1;

    // Puedes elegir una voz específica si quieres
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(voice => voice.lang.includes('es'));

    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    window.speechSynthesis.speak(utterance);
  };
  return (
    <> <Router basename="/recurso-mantenimiento">
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
        <Route path="/modulo/introduccion" element={<IntroModulo />} />
      </Routes>
    </Router>
    <div className="p-8 absolute z-50 botom-2 right-2 text-xs">

      <button
        onClick={speakAllText}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-300"
      >
        Lectura
      </button>
    </div>
    </>
   
    
  );
}










/* Instalación necesaria: React Router, Tailwind */
// npm install react-router-dom
// Tailwind CSS según la documentación oficial
