import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const preguntas = [
  {
    id: 1,
    tipo: "opcion",
    pregunta:
      "¿Qué componente almacena temporalmente los datos que usa el procesador?",
    opciones: ["Disco duro", "Memoria RAM", "Fuente de poder", "Placa base"],
    respuesta: "Memoria RAM",
  },
  {
    id: 2,
    tipo: "opcion",
    pregunta:
      "¿Qué herramienta es esencial para abrir la mayoría de gabinetes de computadoras?",
    opciones: [
      "Destornillador Phillips",
      "Alicate",
      "Llave inglesa",
      "Cinta aislante",
    ],
    respuesta: "Destornillador Phillips",
  },
  {
    id: 3,
    tipo: "verdaderoFalso",
    pregunta:
      "Es seguro trabajar dentro de una computadora sin desconectarla de la corriente.",
    respuesta: "Falso",
  },
  {
    id: 4,
    tipo: "emparejar",
    pregunta: "Relaciona el componente con su función principal:",
    pares: [
      { izquierda: "Fuente de poder", derechaCorrecta: "Suministrar energía" },
      { izquierda: "Disco duro", derechaCorrecta: "Almacenar datos" },
      {
        izquierda: "Placa base",
        derechaCorrecta: "Interconectar los componentes",
      },
    ],
    opcionesDerecha: [
      "Suministrar energía",
      "Almacenar datos",
      "Interconectar los componentes",
    ],
  },
  {
    id: 5,
    tipo: "ordenar",
    pregunta:
      "Ordena los pasos para reemplazar una fuente de poder de forma segura",
    elementos: [
      { id: 1, texto: "Desconectar el cable de energía y otros periféricos" },
      {
        id: 2,
        texto: "Retirar tornillos y desconectar cables de la fuente vieja",
      },
      { id: 3, texto: "Colocar la nueva fuente y conectar los cables" },
      { id: 4, texto: "Fijar con tornillos y cerrar el gabinete" },
    ],
    ordenCorrecto: [1, 2, 3, 4],
  },
  {
    id: 6,
    tipo: "huecos",
    pregunta: "Para evitar descargas eléctricas usamos una _______ de _______.",
    huecos: ["pulsera", "descarga"],
    opciones: ["pulsera", "descarga", "batería", "energía"],
  },
];

export default function ActividadReparacion() {
  const [respuestas, setRespuestas] = useState({ 5: [1, 2, 3, 4] });
  const [resultado, setResultado] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [estadoPreguntas, setEstadoPreguntas] = useState({});

  useEffect(() => {
    const estadoInicial = {};
    preguntas.forEach((p) => {
      if (p.tipo === "ordenar") {
        const idsMezclados = [...p.elementos.map((e) => e.id)].sort(
          () => Math.random() - 0.5
        );
        estadoInicial[p.id] = idsMezclados;
      }
    });
    setRespuestas(estadoInicial);
  }, []);

  const handleChange = (id, valor) => {
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
  };

  const moverElemento = (preguntaId, index, direccion) => {
    const newOrder = [...respuestas[preguntaId]];
    const temp = newOrder[index];
    if (direccion === "arriba" && index > 0) {
      newOrder[index] = newOrder[index - 1];
      newOrder[index - 1] = temp;
    } else if (direccion === "abajo" && index < newOrder.length - 1) {
      newOrder[index] = newOrder[index + 1];
      newOrder[index + 1] = temp;
    }
    setRespuestas((prev) => ({ ...prev, [preguntaId]: newOrder }));
  };

  const evaluar = () => {
    let score = 0;
    let estados = {};

    preguntas.forEach((p) => {
      const r = respuestas[p.id];
      let correcto = false;

      if (p.tipo === "opcion" || p.tipo === "verdaderoFalso") {
        correcto = r === p.respuesta;
      }
      if (p.tipo === "emparejar") {
        correcto = r?.every((resp, i) => resp === p.pares[i].derechaCorrecta);
      }
      if (p.tipo === "ordenar") {
        correcto = JSON.stringify(r) === JSON.stringify(p.ordenCorrecto);
      }
      if (p.tipo === "huecos") {
        correcto = r?.every((resp, i) => resp === p.huecos[i]);
      }

      estados[p.id] = correcto;
      if (correcto) score++;
    });

    setEstadoPreguntas(estados);
    setResultado(
      `Obtuviste ${score} de ${
        preguntas.length
      } respuestas correctas (${Math.round(
        (score / preguntas.length) * 100
      )}%).`
    );
    setEnviado(true);
  };

  return (
    <main className="min-h-screen px-4 py-12 bg-gray-50 text-sm">
      <div className="max-w-3xl mx-auto space-y-10">
        <Link
          to="/modulo/reparacion"
          className="text-blue-600 hover:underline fixed top-5 z-10 text-xs"
        >
          ← Volver
        </Link>
        <div className="fixed -top-6 left-0 h-12 flex items-center bg-gray-50 w-full z-0"></div>
        <h1 className="text-blue-600 hover:underline fixed top-5 z-10 text-xs">
          Actividad: Reparación Básica
        </h1>

        {preguntas.map((p) => {
          const estado = estadoPreguntas[p.id];
          return (
            <div key={p.id} className="bg-white p-4 rounded shadow space-y-4">
              <h2 className="font-semibold text-gray-800">{p.pregunta}</h2>

              {p.tipo === "opcion" &&
                p.opciones.map((op, i) => (
                  <label key={i} className="block">
                    <input
                      type="radio"
                      name={`pregunta-${p.id}`}
                      value={op}
                      disabled={enviado}
                      checked={respuestas[p.id] === op}
                      onChange={(e) => handleChange(p.id, op)}
                    />{" "}
                    {op}
                  </label>
                ))}

              {p.tipo === "verdaderoFalso" &&
                ["Verdadero", "Falso"].map((vf, i) => (
                  <label key={i} className="block">
                    <input
                      type="radio"
                      name={`vf-${p.id}`}
                      value={vf}
                      disabled={enviado}
                      checked={respuestas[p.id] === vf}
                      onChange={(e) => handleChange(p.id, vf)}
                    />{" "}
                    {vf}
                  </label>
                ))}

              {p.tipo === "emparejar" && (
                <div className="grid md:grid-cols-2 gap-4">
                  {p.pares.map((par, i) => (
                    <div key={i}>
                      <p className="font-medium">{par.izquierda}</p>
                      <select
                        value={respuestas[p.id]?.[i] || ""}
                        disabled={enviado}
                        onChange={(e) => {
                          const actual = respuestas[p.id] || [];
                          actual[i] = e.target.value;
                          handleChange(p.id, actual);
                        }}
                        className="mt-1 border px-2 py-1 rounded w-full"
                      >
                        <option value="">Selecciona</option>
                        {p.opcionesDerecha.map((op, idx) => (
                          <option key={idx} value={op}>
                            {op}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {p.tipo === "ordenar" && (
                <div>
                  {respuestas[p.id].map((itemId, i) => {
                    const item = p.elementos.find((el) => el.id === itemId);
                    return (
                      <div
                        key={itemId}
                        className="flex items-center gap-2 my-1"
                      >
                        <button
                          onClick={() => moverElemento(p.id, i, "arriba")}
                          disabled={i === 0 || enviado}
                          className="bg-gray-200 p-1 rounded"
                        >
                          ↑
                        </button>
                        <span>{item.texto}</span>
                        <button
                          onClick={() => moverElemento(p.id, i, "abajo")}
                          disabled={i === p.elementos.length - 1 || enviado}
                          className="bg-gray-200 p-1 rounded"
                        >
                          ↓
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {p.tipo === "huecos" && (
                <p className="text-gray-700">
                  Para evitar descargas eléctricas usamos una
                  <select
                    value={respuestas[p.id]?.[0] || ""}
                    disabled={enviado}
                    onChange={(e) => {
                      const actual = respuestas[p.id] || [];
                      actual[0] = e.target.value;
                      handleChange(p.id, actual);
                    }}
                    className="border rounded px-2 py-1 mx-1"
                  >
                    <option value="">---</option>
                    {p.opciones.map((op, i) => (
                      <option key={i} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                  de
                  <select
                    value={respuestas[p.id]?.[1] || ""}
                    disabled={enviado}
                    onChange={(e) => {
                      const actual = respuestas[p.id] || [];
                      actual[1] = e.target.value;
                      handleChange(p.id, actual);
                    }}
                    className="border rounded px-2 py-1 mx-1"
                  >
                    <option value="">---</option>
                    {p.opciones.map((op, i) => (
                      <option key={i} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                  .
                </p>
              )}

              {enviado && (
                <div>
                  <p
                    className={`font-medium ${
                      estado ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {estado
                      ? "Respuesta correcta ✅"
                      : "Respuesta incorrecta ❌"}
                  </p>
                  {!estado && (
                    <p className="text-sm text-gray-700 mt-1">
                      {p.tipo === "opcion" || p.tipo === "verdaderoFalso" ? (
                        <>
                          La respuesta correcta era:{" "}
                          <strong>{p.respuesta}</strong>
                        </>
                      ) : p.tipo === "huecos" ? (
                        <>
                          La respuesta correcta era:{" "}
                          <strong>{p.huecos.join(" - ")}</strong>
                        </>
                      ) : p.tipo === "ordenar" ? (
                        <>
                          El orden correcto era:
                          <ul className="list-disc ml-6">
                            {p.ordenCorrecto.map((id, i) => {
                              const el = p.elementos.find((e) => e.id === id);
                              return <li key={i}>{el?.texto}</li>;
                            })}
                          </ul>
                        </>
                      ) : p.tipo === "emparejar" ? (
                        <>
                          Las respuestas correctas eran:
                          <ul className="list-disc ml-6">
                            {p.pares.map((par, i) => (
                              <li key={i}>
                                <strong>{par.izquierda}</strong> →{" "}
                                {par.derechaCorrecta}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={evaluar}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          disabled={enviado}
        >
          Enviar respuestas
        </button>

        {resultado && (
          <p className="text-xl font-semibold text-green-700 mt-4">
            {resultado}
          </p>
        )}
      </div>
    </main>
  );
}
