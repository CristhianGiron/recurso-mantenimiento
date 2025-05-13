import React, { useState, useEffect } from 'react';

const components = [
  { name: 'Placa base (Motherboard)', x: 16.6, y: 30, width: 33.3, height: 20 },
  { name: 'Memoria RAM', x: 53.3, y: 20, width: 16.6, height: 5.3 },
  { name: 'Disipador del procesador (Cooler)', x: 36.6, y: 32.6, width: 13.3, height: 10.6 },
  { name: 'Fuente de poder (PSU)', x: 16.6, y: 66.6, width: 20, height: 13.3 },
  { name: 'Disco duro', x: 63.3, y: 57.3, width: 16.6, height: 10 },
  { name: 'Tarjeta gráfica (GPU)', x: 41.6, y: 50, width: 30, height: 10.6 },
];

const MAX_ROUNDS = 10;
const TIME_LIMIT = 10; // segundos por ronda

export default function PCComponentGame() {
  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [gameOver, setGameOver] = useState(false);
  const [incorrects, setIncorrects] = useState([]);

  useEffect(() => {
    if (round < MAX_ROUNDS) {
      pickNewTarget();
    }
  }, [round]);

  useEffect(() => {
    if (gameOver || !target) return;
    if (timeLeft === 0) {
      handleTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, target]);

  const pickNewTarget = () => {
    const random = components[Math.floor(Math.random() * components.length)];
    setTarget(random);
    setTimeLeft(TIME_LIMIT);
    setMessage('');
  };

  const handleClick = (name) => {
    if (!target || gameOver) return;
    if (name === target.name) {
      setScore((prev) => prev + 1);
      setMessage('✅ ¡Correcto!');
      setTimeout(() => setRound((r) => r + 1), 800);
    } else {
      setMessage('❌ Incorrecto.');
      setIncorrects((prev) => [...prev, target.name]);
    }
  };

  const handleTimeout = () => {
    setMessage('⏰ Tiempo agotado.');
    setIncorrects((prev) => [...prev, target.name]);
    setTimeout(() => setRound((r) => r + 1), 800);
  };

  const resetGame = () => {
    setScore(0);
    setRound(0);
    setGameOver(false);
    setIncorrects([]);
    setTimeLeft(TIME_LIMIT);
    setMessage('');
    pickNewTarget();
  };

  useEffect(() => {
    if (round === MAX_ROUNDS) {
      setGameOver(true);
      setTarget(null);
    }
  }, [round]);

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h2 className="text-xl font-bold text-center my-4">
        {gameOver ? '🎉 Fin del juego' : `Ronda ${round + 1} de ${MAX_ROUNDS}`}
      </h2>

      {!gameOver && target && (
        <div className="text-center mb-2">
          <span className="font-medium">Haz clic en: </span>
          <span className="text-blue-700 font-bold">{target.name}</span>
          <div className="text-red-600 mt-1">⏳ Tiempo restante: {timeLeft}s</div>
        </div>
      )}

      {/* Imagen y áreas clicables */}
      <div className="relative w-full aspect-[600/338]">
        <img
          src="https://http2.mlstatic.com/D_Q_NP_2X_872752-MEC81813013679_012025-T.webp"
          alt="PC Abierta"
          className="absolute w-full h-full object-cover"
        />

        {components.map((comp, index) => (
          <button
            key={index}
            onClick={() => handleClick(comp.name)}
            className="absolute bg-transparent hover:bg-blue-300 opacity-30"
            style={{
              left: `${comp.x}%`,
              top: `${comp.y}%`,
              width: `${comp.width}%`,
              height: `${comp.height}%`,
              pointerEvents: gameOver ? 'none' : 'auto',
            }}
          />
        ))}
      </div>

      <div className="mt-4 text-center text-lg font-semibold text-green-700">
        {message}
      </div>

      <div className="mt-2 text-center text-md text-gray-700">
        Puntuación: <strong>{score}</strong>
      </div>

      {gameOver && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">Componentes fallados o no seleccionados:</p>
          <ul className="text-red-600 list-disc list-inside text-sm">
            {incorrects.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🔁 Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
