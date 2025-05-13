import { useState } from "react";
import { Link } from "react-router-dom";

const preguntas = [
  {
    id: 1,
    tipo: "vf",
    pregunta:
      "Si el computador no enciende y no hace ningún sonido, puede tratarse de un fallo en la fuente de poder.",
    respuesta: "verdadero",
  },
  {
    id: 2,
    tipo: "causaSintoma",
    pregunta:
      "Selecciona la causa más probable para este síntoma: 'La computadora se apaga sola tras unos minutos de uso'.",
    opciones: [
      "Problemas de sobrecalentamiento",
      "Virus informático",
      "Fuente de poder muy potente",
      "Configuración de ahorro de energía",
    ],
    respuesta: "Problemas de sobrecalentamiento",
  },
  {
    id: 3,
    tipo: "ordenLogico",
    pregunta: "Ordena los pasos para diagnosticar un problema de encendido:",
    pasosCorrectos: [
      "1. Verificar que el cable de alimentación esté conectado",
      "2. Revisar que el botón de encendido funcione",
      "3. Comprobar que la fuente de poder entregue voltaje",
      "4. Probar con otro enchufe o fuente externa",
    ],
  },
  {
    id: 4,
    tipo: "checkMultiple",
    pregunta:
      "¿Cuáles de los siguientes pueden causar que una computadora funcione lentamente? (elige todas las correctas)",
    opciones: [
      { texto: "Falta de memoria RAM", correcta: true },
      { texto: "Demasiados programas en segundo plano", correcta: true },
      { texto: "Demasiado espacio libre en disco", correcta: false },
      { texto: "Disco duro fragmentado o viejo", correcta: true },
    ],
  },
];

export default function DiagnosticoProblemas() {
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const handleRespuesta = (id, value) => {
    setRespuestas((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = (id, index) => {
    const actual = respuestas[id] || [];
    actual[index] = !actual[index];
    setRespuestas((prev) => ({ ...prev, [id]: actual }));
  };

  const evaluar = () => {
    let score = 0;

    preguntas.forEach((p) => {
      const r = respuestas[p.id];
      let correcto = false;

      if (p.tipo === "vf") {
        correcto = r === p.respuesta;
      }

      if (p.tipo === "causaSintoma") {
        correcto = r === p.respuesta;
      }

      if (p.tipo === "ordenLogico") {
        correcto = JSON.stringify(r) === JSON.stringify(p.pasosCorrectos);
      }

      if (p.tipo === "checkMultiple") {
        correcto =
          r?.length === p.opciones.length &&
          r.every((val, i) => val === p.opciones[i].correcta);
      }

      if (correcto) score++;
    });

    setResultado(
      `Obtuviste ${score} de ${preguntas.length} respuestas correctas.`
    );
    setEnviado(true);
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 bg-gray-100 min-h-screen text-sm">
      <Link
        to="/modulo/diagnostico"
        className="text-blue-600 hover:underline fixed top-5 z-10 text-xs"
      >
        ← Volver
      </Link>
      <div className="fixed -top-6 left-0 h-12 flex items-center bg-gray-50 w-full z-0"></div>
      <h1 className="text-2xl font-bold text-gray-800">
        Diagnóstico de problemas comunes en computadoras
      </h1>

      {preguntas.map((p) => (
        <div key={p.id} className="bg-white p-4 rounded shadow space-y-2">
          <p className="font-medium">{p.pregunta}</p>

          {p.tipo === "vf" && (
            <div>
              <label>
                <input
                  type="radio"
                  name={`vf-${p.id}`}
                  value="verdadero"
                  onChange={() => handleRespuesta(p.id, "verdadero")}
                  disabled={enviado}
                />{" "}
                Verdadero
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name={`vf-${p.id}`}
                  value="falso"
                  onChange={() => handleRespuesta(p.id, "falso")}
                  disabled={enviado}
                />{" "}
                Falso
              </label>
            </div>
          )}

          {p.tipo === "causaSintoma" && (
            <select
              className="border px-2 py-1"
              onChange={(e) => handleRespuesta(p.id, e.target.value)}
              disabled={enviado}
            >
              <option value="">Selecciona una causa</option>
              {p.opciones.map((op, i) => (
                <option key={i} value={op}>
                  {op}
                </option>
              ))}
            </select>
          )}

          {p.tipo === "ordenLogico" && (
            <>
              {p.pasosCorrectos.map((_, i) => (
                <div key={i} className="flex space-x-2 items-center">
                  <span>Paso {i + 1}:</span>
                  <select
                    className="border px-2 py-1"
                    onChange={(e) => {
                      const actual = respuestas[p.id] || [];
                      actual[i] = e.target.value;
                      handleRespuesta(p.id, actual);
                    }}
                    disabled={enviado}
                  >
                    <option value="">Selecciona...</option>
                    {p.pasosCorrectos.map((paso, j) => (
                      <option key={j} value={paso}>
                        {paso}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </>
          )}

          {p.tipo === "checkMultiple" &&
            p.opciones.map((op, i) => (
              <label key={i} className="block">
                <input
                  type="checkbox"
                  onChange={() => handleCheck(p.id, i)}
                  disabled={enviado}
                />{" "}
                {op.texto}
              </label>
            ))}
        </div>
      ))}

      <button
        onClick={evaluar}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        disabled={enviado}
      >
        Enviar respuestas
      </button>

      {resultado && (
        <div className="text-lg font-semibold text-green-700">{resultado}</div>
      )}
    </main>
  );
}
