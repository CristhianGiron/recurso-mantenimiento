import { useState } from "react";
import { Link } from "react-router-dom";

const preguntas = [
  {
    id: 1,
    tipo: "imagenCorrecta",
    pregunta:
      "¿Cuál de estas opciones representa una buena práctica de respaldo?",
    opciones: [
      { id: "a", texto: "Guardar todo en el escritorio sin copia externa" },
      { id: "b", texto: "Hacer copias periódicas en una nube segura" },
      { id: "c", texto: "Confiar solo en la memoria USB" },
    ],
    respuesta: "b",
  },
  {
    id: 2,
    tipo: "ordenar",
    pregunta: "Ordena los pasos para hacer una copia de seguridad segura:",
    pasosCorrectos: [
      "1. Identificar archivos importantes",
      "2. Elegir el medio de respaldo (nube, disco externo...)",
      "3. Copiar los archivos",
      "4. Verificar que la copia fue exitosa",
    ],
  },
  {
    id: 3,
    tipo: "relacionar",
    pregunta: "Relaciona el escenario con la acción adecuada:",
    pares: [
      {
        escenario: "Tu equipo fue infectado con un virus",
        accion: "Restaurar una copia limpia",
      },
      {
        escenario: "Vas a formatear tu computadora",
        accion: "Respaldar toda la información importante",
      },
      {
        escenario: "Cambiarás de dispositivo",
        accion: "Transferir respaldos al nuevo equipo",
      },
    ],
    opciones: [
      "Restaurar una copia limpia",
      "Respaldar toda la información importante",
      "Transferir respaldos al nuevo equipo",
    ],
  },
  {
    id: 4,
    tipo: "check",
    pregunta:
      "¿Cuáles de estas son buenas prácticas para respaldar información? (elige todas las que correspondan)",
    opciones: [
      { texto: "Guardar una copia en la nube", correcta: true },
      { texto: "Tener una sola copia en la misma PC", correcta: false },
      { texto: "Verificar los respaldos regularmente", correcta: true },
      { texto: "Guardar las copias en lugares distintos", correcta: true },
    ],
  },
];

export default function ActividadRespaldoAvanzada() {
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

  const handleRelacionar = (id, index, valor) => {
    const actual = respuestas[id] || [];
    actual[index] = valor;
    setRespuestas((prev) => ({ ...prev, [id]: actual }));
  };

  const evaluar = () => {
    let score = 0;

    preguntas.forEach((p) => {
      const r = respuestas[p.id];
      let correcto = false;

      if (p.tipo === "imagenCorrecta") {
        correcto = r === p.respuesta;
      }

      if (p.tipo === "ordenar") {
        correcto = JSON.stringify(r) === JSON.stringify(p.pasosCorrectos);
      }

      if (p.tipo === "relacionar") {
        correcto = r?.every((val, i) => val === p.pares[i].accion);
      }

      if (p.tipo === "check") {
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
        to="/modulo/respaldo"
        className="text-blue-600 hover:underline fixed top-5 z-10 text-xs"
      >
        ← Volver
      </Link>
      <div className="fixed -top-6 left-0 h-12 flex items-center bg-gray-50 w-full z-0"></div>
      <h1 className="text-2xl font-bold text-gray-800">
        Actividad interactiva: Buenas prácticas de respaldo
      </h1>

      {preguntas.map((p) => (
        <div key={p.id} className="bg-white p-4 rounded shadow space-y-2">
          <p className="font-medium">{p.pregunta}</p>

          {p.tipo === "imagenCorrecta" &&
            p.opciones.map((op) => (
              <label key={op.id} className="block">
                <input
                  type="radio"
                  name={`img-${p.id}`}
                  value={op.id}
                  onChange={() => handleRespuesta(p.id, op.id)}
                  disabled={enviado}
                />{" "}
                {op.texto}
              </label>
            ))}

          {p.tipo === "ordenar" && (
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

          {p.tipo === "relacionar" &&
            p.pares.map((par, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="w-1/2">{par.escenario}</span>
                <select
                  className="border px-2 py-1"
                  onChange={(e) => handleRelacionar(p.id, i, e.target.value)}
                  disabled={enviado}
                >
                  <option value="">Selecciona acción</option>
                  {p.opciones.map((op, j) => (
                    <option key={j} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              </div>
            ))}

          {p.tipo === "check" &&
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
