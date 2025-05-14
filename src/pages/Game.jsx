import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { InformationCircleIcon } from "@heroicons/react/outline";

// Pares de síntomas y causas
const PAIRS = [
  { id: "1", symptom: "Pantalla azul al iniciar", cause: "Fallo de RAM" },
  { id: "2", symptom: "Sistema muy lento", cause: "Disco duro casi lleno" },
  { id: "3", symptom: "No hay sonido", cause: "Driver de audio ausente" },
  { id: "4", symptom: "Se reinicia solo", cause: "Sobrecalentamiento" },
  { id: "5", symptom: "Internet intermitente", cause: "Fallo de adaptador de red" },
];

// Componente para confeti
const ParticleExplosion = ({ trigger }) => {
  const fire = (particleRatio, opts) => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  };

  useEffect(() => {
    if (trigger) {
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }, [trigger]);

  return <div className="absolute inset-0 pointer-events-none z-50" />;
};

const DiagnosticGame = () => {
  const [symptoms, setSymptoms] = useState(PAIRS);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  useEffect(() => {
    if (matched.length === PAIRS.length) {
      setCompleted(true);
      setFeedback("🎉 ¡Diagnóstico completado!");
    }
  }, [matched]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      setFeedback("⏰ ¡Tiempo agotado! Game Over.");
    }
  }, [timeLeft, gameOver]);

  const handleSelection = (pair, isSymptom) => {
    if (matched.includes(pair.id)) return;

    if (isSymptom) {
      setSelectedSymptom(pair);
    } else if (selectedSymptom) {
      setAttempts((prev) => prev + 1);
      if (pair.id === selectedSymptom.id) {
        setMatched((prev) => [...prev, pair.id]);
        setScore((prev) => prev + 10);
        setFeedback(`✅ Correcto: "${selectedSymptom.symptom}" diagnosticado.`);
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1000);
      } else {
        setScore((prev) => prev - 10);
        setFeedback(`❌ Incorrecto: "${selectedSymptom.symptom}" no corresponde.`);
      }
      setSelectedSymptom(null);
    }
  };

  const resetGame = () => {
    setMatched([]);
    setSymptoms(PAIRS);
    setScore(0);
    setFeedback("");
    setAttempts(0);
    setCompleted(false);
    setTimeLeft(60);
    setGameOver(false);
    setSelectedSymptom(null);
  };
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);
  
    // Cierra el tooltip al hacer clic fuera
    useEffect(() => {
      function handleClickOutside(event) {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
          setShowTooltip(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <div className="relative mx-auto p-4 rounded-lg shadow-lg text-black overflow-hidden bg-white max-w-2xl">
       <h1 className="text-md font-bold mb-6 flex items-center gap-2 relative">
          💻 Juego interactivo
          <span
            className="relative cursor-pointer"
            onClick={() => setShowTooltip(!showTooltip)}
            ref={tooltipRef}
          >
            <InformationCircleIcon className="w-5 text-blue-600" />
            {showTooltip && (
              <div className="absolute left-full top-10 -translate-y-1/2 ml-2 w-64 bg-white border border-gray-300 p-2 text-sm text-gray-800 rounded shadow z-50">
                Haz click en el síntoma y luego en la causa que le corresponde
                no te equivoques o perderas puntos. ¡Exitos!
              </div>
            )}
          </span>
        </h1>

      <ParticleExplosion trigger={showParticles} />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-sm font-semibold mb-2">🩺 Síntomas</h2>
          <div className="space-y-2">
            {symptoms
              .filter((s) => !matched.includes(s.id))
              .map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleSelection(s, true)}
                  className={`p-2 text-xs text-white rounded-md shadow-md bg-red-600 cursor-pointer transform transition-all ${
                    selectedSymptom?.id === s.id ? "scale-105 ring-2 ring-yellow-300" : ""
                  }`}
                >
                  💢 {s.symptom}
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold mb-2">⚙️ Causas</h2>
          <div className="space-y-4">
            {PAIRS.map((p) => (
              <div
                key={p.cause}
                onClick={() => handleSelection(p, false)}
                className={`p-4 rounded-md border-2 cursor-pointer transition-all ${
                  matched.includes(p.id)
                    ? "bg-green-700 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white"
                }`}
              >
                {p.cause}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-sm mb-4">
        <p>{feedback}</p>
        <p className="font-semibold">
          Puntuación: {score} | Intentos: {attempts}
        </p>
        <p>⏳ Tiempo: {timeLeft}s</p>
        {completed && (
          <p className="text-green-600 mt-4 font-bold">
            🎯 ¡Has completado el diagnóstico! Puntuación final: {score}
          </p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={resetGame}
          className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-300"
        >
          🔄 Reiniciar Juego
        </button>
      </div>
    </div>
  );
};

export default DiagnosticGame;
