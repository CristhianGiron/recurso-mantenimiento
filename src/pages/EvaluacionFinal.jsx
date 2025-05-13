import { useState } from "react";
import { Link } from "react-router-dom";
import TTS from "../utils/TTS";

// Preguntas interactivas del examen final
const preguntasFinales = [
  {
    tipo: "opcionMultiple",
    pregunta:
      "¿Cuál es la mejor práctica para realizar una limpieza interna de una computadora?",
    opciones: [
      "Usar aire comprimido para eliminar el polvo",
      "Sumergir los componentes en agua para limpiarlos",
      "Utilizar una toalla húmeda para limpiar las partes internas",
      "No es necesario limpiar los componentes internos",
    ],
    respuestaCorrecta: 0,
  },
  {
    tipo: "opcionMultiple",
    pregunta:
      "¿Qué herramienta es más útil para reparar fallos en el sistema operativo?",
    opciones: [
      "Reparación del sistema con herramientas del propio SO",
      "Reemplazar los componentes de hardware",
      "Desinstalar todos los programas instalados",
      "Formatear y reinstalar Windows",
    ],
    respuestaCorrecta: 0,
  },
  {
    tipo: "verdaderoFalso",
    pregunta:
      "Verdadero o falso: La desinstalación de programas debe realizarse a través del Panel de Control o la Configuración para evitar residuos.",
    opciones: ["Verdadero", "Falso"],
    respuestaCorrecta: 0,
  },
  {
    tipo: "secuencia",
    pregunta:
      "Organiza los pasos correctos para realizar una desinstalación adecuada de un programa:",
    opciones: [
      "Acceder al Panel de Control",
      "Seleccionar el programa",
      "Confirmar la desinstalación",
      "Reiniciar el equipo",
    ],
    respuestaCorrecta: [0, 1, 2, 3],
  },
  {
    tipo: "opcionMultiple",
    pregunta:
      "¿Qué indicio podría sugerir que tu computadora necesita reparación de hardware?",
    opciones: [
      "La computadora se congela sin razón aparente",
      "El sistema operativo se actualiza con frecuencia",
      "La computadora se reinicia automáticamente después de abrir una aplicación",
      "El antivirus encuentra muchos virus",
    ],
    respuestaCorrecta: 0,
  },
];

export default function EvaluacionFinal() {
  const [respuestas, setRespuestas] = useState(
    preguntasFinales.map((preg) =>
      preg.tipo === "secuencia" ? [...preg.opciones] : null
    )
  );
  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (preguntaIndex, opcionIndex) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaIndex] = opcionIndex;
    setRespuestas(nuevasRespuestas);
  };

  const manejarSecuencia = (preguntaIndex, orden) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaIndex] = orden;
    setRespuestas(nuevasRespuestas);
  };

  const calcularPuntaje = () => {
    return respuestas.filter(
      (respuesta, i) =>
        respuesta === preguntasFinales[i].respuestaCorrecta ||
        (Array.isArray(respuesta) &&
          JSON.stringify(respuesta) ===
            JSON.stringify(preguntasFinales[i].respuestaCorrecta))
    ).length;
  };

  const puntaje = calcularPuntaje();
  const aprobado = puntaje >= 4;

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-gray-900 px-4 py-6 text-sm leading-relaxed">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          to="/dashboard"
          className="text-blue-600 dark:text-blue-400 hover:underline text-xs fixed top-5 z-10"
        >
          &larr; Volver
        </Link>
  
        <div className="fixed -top-6 left-0 h-12 flex items-center bg-gray-50 w-full z-0" />
  
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Evaluación Final: Módulo de Mantenimiento de Computadoras
        </h1>
        <TTS text="Evaluación Final: Módulo de Mantenimiento de Computadoras" />
  
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
        >
          {preguntasFinales.map((preg, idx) => (
            <div key={idx} className="space-y-2">
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {idx + 1}. {preg.pregunta}
              </p>
              <TTS text={`${idx + 1}. ${preg.pregunta}`} />
  
              {/* Opción múltiple */}
              {preg.tipo === "opcionMultiple" && (
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
                          <TTS text={opcion} />
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
  
              {/* Verdadero o Falso */}
              {preg.tipo === "verdaderoFalso" && (
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
                          <TTS text={opcion} />
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
  
              {/* Secuencia */}
              {preg.tipo === "secuencia" && (
                <div>
                  <ul className="space-y-1">
                    {respuestas[idx].map((opcion, i) => (
                      <li
                        key={i}
                        draggable
                        onDragStart={(e) =>
                          e.dataTransfer.setData("text/plain", i)
                        }
                        onDrop={(e) => {
                          const dragIndex =
                            e.dataTransfer.getData("text/plain");
                          const newOrder = [...respuestas[idx]];
                          const draggedItem = newOrder.splice(dragIndex, 1);
                          newOrder.splice(i, 0, draggedItem[0]);
                          manejarSecuencia(idx, newOrder);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        className="p-2 bg-white dark:bg-gray-800 rounded-md cursor-pointer"
                      >
                        {opcion}
                        <TTS text={opcion} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
            <div className="p-4 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 space-y-2">
              <p className="text-gray-900 dark:text-white">
                Tu puntaje:{" "}
                <strong>
                  {puntaje} / {preguntasFinales.length}
                </strong>
              </p>
              <TTS
                text={`Tu puntaje: ${puntaje} de ${preguntasFinales.length}`}
              />
  
              <p
                className={`font-semibold ${
                  aprobado ? "text-green-600" : "text-red-600"
                }`}
              >
                {aprobado
                  ? "¡Felicidades! Has completado la evaluación con éxito."
                  : "Necesitas mejorar algunos puntos, inténtalo nuevamente."}
              </p>
              <TTS
                text={
                  aprobado
                    ? "¡Felicidades! Has completado la evaluación con éxito."
                    : "Necesitas mejorar algunos puntos, inténtalo nuevamente."
                }
              />
  
              <button
                type="button"
                className="mt-4 text-blue-600 underline"
                onClick={() => {
                  setEnviado(false);
                  setRespuestas(
                    preguntasFinales.map((preg) =>
                      preg.tipo === "secuencia" ? [...preg.opciones] : null
                    )
                  );
                }}
              >
                Reintentar evaluación
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );}