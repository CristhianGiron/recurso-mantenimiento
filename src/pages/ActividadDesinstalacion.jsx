import { useState } from "react";
import { Link } from "react-router-dom";

const preguntas = [
  {
    pregunta:
      "¿Cuál es una forma recomendada de desinstalar un programa en Windows?",
    opciones: [
      "Eliminar la carpeta del programa en Archivos de Programa",
      "Usar el Panel de Control o la Configuración",
      "Presionar Alt + F4 sobre el icono del programa",
      "Reiniciar el equipo varias veces seguidas",
    ],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Qué función tiene una herramienta como Revo Uninstaller?",
    opciones: [
      "Detectar virus",
      "Actualizar Windows",
      "Eliminar completamente programas y sus residuos",
      "Cambiar el idioma del sistema",
    ],
    respuestaCorrecta: 2,
  },
  {
    pregunta:
      "Verdadero o falso: Es seguro eliminar manualmente una carpeta de un programa sin desinstalarlo.",
    opciones: ["Verdadero", "Falso"],
    respuestaCorrecta: 1,
  },
  {
    pregunta:
      "¿Cada cuánto tiempo se recomienda revisar y eliminar programas innecesarios?",
    opciones: [
      "Cada semana",
      "Cada 2-3 meses",
      "Una vez al año",
      "Nunca, mejor no tocar nada",
    ],
    respuestaCorrecta: 1,
  },
  {
    pregunta:
      "¿Qué puede impedir que un antivirus se desinstale correctamente?",
    opciones: [
      "Estar desactualizado",
      "Tener muchos archivos",
      "Tener servicios activos en segundo plano",
      "Estar en modo oscuro",
    ],
    respuestaCorrecta: 2,
  },
];

export default function EvaluacionDesinstalacion() {
  const [respuestas, setRespuestas] = useState(
    Array(preguntas.length).fill(null)
  );
  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (preguntaIndex, opcionIndex) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaIndex] = opcionIndex;
    setRespuestas(nuevasRespuestas);
  };

  const calcularPuntaje = () => {
    return respuestas.filter(
      (respuesta, i) => respuesta === preguntas[i].respuestaCorrecta
    ).length;
  };

  const puntaje = calcularPuntaje();
  const aprobado = puntaje >= 4;

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-gray-900 px-4 py-6 text-sm leading-relaxed">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          to="/modulo/desinstalacion"
          className="text-blue-600 dark:text-blue-400 hover:underline text-xs fixed top-5"
        >
          &larr; Volver
        </Link>
        <div className="fixed -top-6 left-0 h-12 flex items-center bg-gray-50 w-full z-0"></div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Actividad: Desinstalación de Programas
        </h1>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
        >
          {preguntas.map((preg, idx) => (
            <div key={idx} className="space-y-2">
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {idx + 1}. {preg.pregunta}
              </p>
              <ul className="space-y-1">
                {preg.opciones.map((opcion, i) => {
                  const seleccionada = respuestas[idx] === i;
                  const correcta = enviado && i === preg.respuestaCorrecta;
                  const incorrecta = enviado && seleccionada && !correcta;

                  return (
                    <li key={i}>
                      <label
                        className={`block p-2 rounded-md cursor-pointer ${
                          seleccionada
                            ? "bg-blue-100 dark:bg-blue-800"
                            : "bg-white dark:bg-gray-800"
                        } ${
                          enviado
                            ? correcta
                              ? "border-green-500 border"
                              : incorrecta
                              ? "border-red-500 border"
                              : ""
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`pregunta-${idx}`}
                          value={i}
                          checked={seleccionada}
                          onChange={() => manejarCambio(idx, i)}
                          className="mr-2"
                          disabled={enviado}
                        />
                        {opcion}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {!enviado ? (
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Enviar respuestas
            </button>
          ) : (
            <div className="p-4 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
              <p className="text-gray-900 dark:text-white">
                Tu puntaje:{" "}
                <strong>
                  {puntaje} / {preguntas.length}
                </strong>
              </p>
              <p
                className={`mt-2 font-semibold ${
                  aprobado ? "text-green-600" : "text-red-600"
                }`}
              >
                {aprobado
                  ? "¡Excelente! Has comprendido los conceptos."
                  : "Puedes intentarlo nuevamente para reforzar lo aprendido."}
              </p>
              <button
                type="button"
                className="mt-4 text-blue-600 underline"
                onClick={() => {
                  setEnviado(false);
                  setRespuestas(Array(preguntas.length).fill(null));
                }}
              >
                Reintentar actividad
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
