import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const preguntas = [
  {
    id: 1,
    tipo: "opcion",
    pregunta:
      "¿Qué herramienta se utiliza para eliminar el polvo del interior del PC?",
    opciones: [
      "Paño húmedo",
      "Aire comprimido",
      "Alcohol",
      "Cepillo de dientes",
    ],
    respuesta: "Aire comprimido",
  },
  {
    id: 2,
    tipo: "opcion",
    pregunta: "¿Con qué frecuencia se recomienda limpiar el interior del PC?",
    opciones: ["Cada mes", "Cada 6 meses", "Una vez al año", "Nunca"],
    respuesta: "Cada 6 meses",
  },
  {
    id: 3,
    tipo: "verdaderoFalso",
    pregunta: "Se puede usar agua directamente sobre los componentes internos.",
    respuesta: "Falso",
  },
  {
    id: 4,
    tipo: "emparejar",
    pregunta: "Relaciona cada herramienta con su uso",
    pares: [
      {
        izquierda: "Aire comprimido",
        derechaCorrecta: "Eliminar polvo de zonas internas",
      },
      { izquierda: "Paño de microfibra", derechaCorrecta: "Limpiar pantalla" },
      { izquierda: "Brocha", derechaCorrecta: "Quitar polvo de teclas" },
    ],
    opcionesDerecha: [
      "Eliminar polvo de zonas internas",
      "Limpiar pantalla",
      "Quitar polvo de teclas",
    ],
  },
  {
    id: 5,
    tipo: 'ordenar',
    pregunta: 'Ordena los pasos para limpiar el PC de forma segura',
    elementos: [
      { id: 1, texto: 'Apagar y desconectar el equipo' },
      { id: 2, texto: 'Preparar materiales' },
      { id: 3, texto: 'Limpiar exterior' },
      { id: 4, texto: 'Abrir gabinete y limpiar interior' },
    ],
    ordenCorrecto: [1, 2, 3, 4],
  },
  {
    id: 6,
    tipo: "huecos",
    pregunta:
      "Completa la frase: Para limpiar la _______ uso un paño de _______.",
    huecos: ["pantalla", "microfibra"],
    opciones: ["pantalla", "placa base", "microfibra", "algodón"],
  },
];

export default function ActividadLimpieza() {
  const [respuestas, setRespuestas] = useState({ 5: [1, 2, 3, 4] });
  const [resultado, setResultado] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [estadoPreguntas, setEstadoPreguntas] = useState({});
  useEffect(() => {
    const estadoInicial = {};
  
    preguntas.forEach((p) => {
      if (p.tipo === 'ordenar') {
        // Solo mezclamos los IDs para la respuesta inicial
        const idsMezclados = [...p.elementos.map(e => e.id)].sort(() => Math.random() - 0.5);
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
    if (direccion === 'arriba' && index > 0) {
      newOrder[index] = newOrder[index - 1];
      newOrder[index - 1] = temp;
    } else if (direccion === 'abajo' && index < newOrder.length - 1) {
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
    setResultado(`Obtuviste ${score} de ${preguntas.length} respuestas correctas (${Math.round(score / preguntas.length * 100)}%).`);
    setEnviado(true);
  };

  return (
    <main className="min-h-screen px-4 py-12 bg-gray-50 text-sm">
      <div className="max-w-3xl mx-auto space-y-10">
       <Link to="/modulo/limpieza" className="text-blue-600 hover:underline fixed top-5 z-10 text-xs">
          ← Volver
        </Link> 
        <div className="fixed -top-10 left-0 h-12 flex items-center bg-gray-50 w-full z-0">
            
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Actividad</h1>

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
                    /> {op}
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
                    /> {vf}
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
                          <option key={idx} value={op}>{op}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {p.tipo === 'ordenar' && (
                <div>
                  {respuestas[p.id].map((itemId, i) => {
                    const item = p.elementos.find((el) => el.id === itemId);
                    return (
                      <div key={itemId} className="flex items-center gap-2 my-1">
                        <button
                          onClick={() => moverElemento(p.id, i, 'arriba')}
                          disabled={i === 0 || enviado}
                          className="bg-gray-200 p-1 rounded"
                        >↑</button>
                        <span>{item.texto}</span>
                        <button
                          onClick={() => moverElemento(p.id, i, 'abajo')}
                          disabled={i === p.elementos.length - 1 || enviado}
                          className="bg-gray-200 p-1 rounded"
                        >↓</button>
                      </div>
                    );
                  })}
                </div>
              )}

              {p.tipo === "huecos" && (
                <p className="text-gray-700">
                  Para limpiar la
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
                      <option key={i} value={op}>{op}</option>
                    ))}
                  </select>
                  uso un paño de
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
                      <option key={i} value={op}>{op}</option>
                    ))}
                  </select>.
                </p>
              )}

              {enviado && (
                <div>
                  <p className={`font-medium ${estado ? "text-green-700" : "text-red-700"}`}>
                    {estado ? "Respuesta correcta ✅" : "Respuesta incorrecta ❌"}
                  </p>
                  {!estado && (
                    <p className="text-sm text-gray-700 mt-1">
                      {p.tipo === "opcion" || p.tipo === "verdaderoFalso" ? (
                        <>La respuesta correcta era: <strong>{p.respuesta}</strong></>
                      ) : p.tipo === "huecos" ? (
                        <>La respuesta correcta era: <strong>{p.huecos.join(" - ")}</strong></>
                      ) : p.tipo === "ordenar" ? (
                        <>
                          El orden correcto era:
                          <ul className="list-disc ml-6">
                            {p.ordenCorrecto.map((id, i) => {
                              const el = p.elementos.find(e => e.id === id);
                              return <li key={i}>{el?.texto}</li>;
                            })}
                          </ul>
                        </>
                      ) : p.tipo === "emparejar" ? (
                        <>
                          Las respuestas correctas eran:
                          <ul className="list-disc ml-6">
                            {p.pares.map((par, i) => (
                              <li key={i}><strong>{par.izquierda}</strong> → {par.derechaCorrecta}</li>
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
          <p className="text-xl font-semibold text-green-700 mt-4">{resultado}</p>
        )}
      </div>
    </main>
  );
}
