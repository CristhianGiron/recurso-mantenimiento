import { useParams, Link } from "react-router-dom";
const contenidos = {
  reparacion: {
    titulo: "Reparación Básica de Computadoras",
    contenido: [
      {
        tipo: "texto",
        texto:
          "🧰 La reparación de computadoras es una actividad técnica que requiere diagnóstico, conocimiento del hardware y software, y buenas prácticas de seguridad.",
      },
      {
        tipo: "texto",
        texto:
          "🔧 En este módulo aprenderás conceptos esenciales para realizar intervenciones básicas, identificar problemas comunes y aplicar soluciones prácticas.",
      },
      {
        tipo: "ventajas",
        titulo: "🎯 ¿Qué aprenderás?",
        items: [
          "Cómo identificar y solucionar problemas comunes.",
          "Cómo reemplazar componentes dañados.",
          "Cómo aplicar mantenimiento preventivo.",
          "Diferencias entre fallas físicas y lógicas.",
        ],
      },
      {
        tipo: "pasos",
        titulo: "🖥️ Conoce los componentes internos",
        items: [
          "Placa madre (Motherboard)",
          "Memoria RAM",
          "Disco duro / SSD",
          "Fuente de poder",
          "CPU y ventilador",
        ],
      },
      {
        tipo: "texto",
        texto:
          "🧠 Cada componente cumple una función clave. Si uno falla, puede afectar todo el sistema. Por eso es vital conocerlos antes de intervenir.",
      },
      {
        tipo: "tip",
        texto:
          "💡 Consulta el manual de tu equipo o busca el modelo exacto en línea para conocer sus partes específicas.",
      },
      {
        tipo: "pasos",
        titulo: "🛠️ Pasos generales para reparar una PC",
        items: [
          "Apagar y desconectar el equipo completamente.",
          "Usar herramientas adecuadas (destornilladores, pulsera antiestática).",
          "Identificar el componente sospechoso mediante diagnóstico.",
          "Extraer y reemplazar con cuidado el componente.",
          "Volver a montar y probar el funcionamiento.",
        ],
      },
      {
        tipo: "alerta",
        texto:
          "⚠️ Nunca toques los circuitos directamente con los dedos. La estática puede dañar los componentes internos.",
      },
      {
        tipo: "curiosidad",
        texto:
          "📊 El 70% de los problemas de hardware en PCs se deben a polvo, mala ventilación o cables sueltos.",
      },
      {
        tipo: "frecuencia",
        texto:
          "🧼 Limpia el interior del equipo cada 3-6 meses. Un mantenimiento preventivo evita fallos futuros.",
      },
      {
        tipo: "logro",
        texto:
          "🏆 Si puedes reemplazar la memoria RAM o un disco duro por ti mismo, ya tienes habilidades de técnico básico.",
      },
      {
        tipo: "pregunta",
        texto:
          "🤔 ¿Sabes qué herramientas básicas necesitas para trabajar dentro de una computadora?",
      },
    ],
    videoUrl:
      "https://drive.google.com/file/d/1ru9QADdmuEWpRaJh9PkvWnpvUYCrlBAT/preview",
    autorVideo: "Luis Carlos Galán", // Video ejemplo de reparación básica
    enlace: "https://www.hp.com/es-es/shop/tech-takes/como-reparar-tu-pc",
    enlacesAdicionales: [
      {
        titulo: "Guía paso a paso para cambiar componentes",
        url: "https://www.crucial.es/support/pc-build-upgrade-guide",
      },
      {
        titulo: "Reparación de laptops en iFixit",
        url: "https://www.ifixit.com/Device/PC_Laptop",
      },
      {
        titulo: "Diferencias entre problemas de software y hardware",
        url: "https://www.avast.com/es-es/c-how-to-fix-pc-problems",
      },
    ],
    imagenes: [
      {
        src: "https://i.ytimg.com/vi/-1clqsilLQ0/maxresdefault.jpg",
        alt: "Componentes internos de una computadora",
        descripcion:
          "Vista general de los principales componentes internos que puedes identificar y reparar.",
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX83qX6N34beYGr-jNJuhtdY87C3rd6Z8ReA&s",
        alt: "Técnico cambiando la RAM",
        descripcion:
          "Uno de los reemplazos más comunes y sencillos: la memoria RAM.",
      },
    ],
  },
};

export default function Reparacion() {
  const modulo = contenidos["reparacion"];

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-gray-900 px-4 py-6 text-sm leading-relaxed">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Link
            to="/dashboard"
            className="text-blue-600 dark:text-blue-400 hover:underline text-xs fixed top-5 z-10"
          >
            &larr; Volver
          </Link>
          <div className="fixed h-12 w-full top-0 left-0 bg-gray-50 z-0"></div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {modulo.titulo}
        </h1>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          <section className="space-y-4">
            {modulo.contenido.map((bloque, idx) => {
              switch (bloque.tipo) {
                case "texto":
                case "pregunta":
                  return (
                    <p
                      key={idx}
                      className="text-gray-700 dark:text-gray-300 italic"
                    >
                      {bloque.texto}
                    </p>
                  );

                case "ventajas":
                case "pasos":
                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 shadow-sm"
                    >
                      <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
                        {bloque.titulo}
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-0.5">
                        {bloque.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );

                case "alerta":
                  return (
                    <div
                      key={idx}
                      className="bg-yellow-100 dark:bg-yellow-200 text-yellow-900 p-3 rounded-md text-sm border-l-4 border-yellow-500"
                    >
                      {bloque.texto}
                    </div>
                  );

                case "frecuencia":
                  return (
                    <div
                      key={idx}
                      className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-3 rounded-md border-l-4 border-blue-500 italic"
                    >
                      {bloque.texto}
                    </div>
                  );

                case "curiosidad":
                  return (
                    <div
                      key={idx}
                      className="bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 p-3 rounded-md"
                    >
                      {bloque.texto}
                    </div>
                  );

                case "tip":
                  return (
                    <div
                      key={idx}
                      className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 p-3 rounded-md border-l-4 border-green-500"
                    >
                      {bloque.texto}
                    </div>
                  );

                case "logro":
                  return (
                    <div
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-md border-l-4 border-gray-500"
                    >
                      {bloque.texto}
                    </div>
                  );

                default:
                  return null;
              }
            })}

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md">
              <h2 className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-100">
                📘 Actividad
              </h2>
              <Link
                to={`/modulo/evaluacion-reparacion`}
                className="inline-block text-blue-600 px-6 py-3 hover:underline transition"
              >
                Realizar actividad →
              </Link>
            </div>
            <div
  className="interacty_padding"
  style={{
    position: 'relative',
    paddingTop: '99.5%',
    paddingRight: '0',
    paddingBottom: '0',
    paddingLeft: '0'
  }}
>
  <div
    className="interacty_wrapper"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center'
    }}
  >
    <iframe
      style={{ border: 'none', width: '100%', height: '100%' }}
      src="https://p.interacty.me/9a61ebea9d753546/iframe.html"
      title="Interacty Game"
    />
  </div>
</div>
          </section>

          <aside className="space-y-4">
            {/* Contenedor del video + pie de imagen */}
            <div className="rounded-md overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="aspect-video">
                <iframe
                  src={modulo.videoUrl}
                  title={`Video sobre ${modulo.titulo}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              {/* Pie de imagen */}
              <p className="text-xs text-gray-600 dark:text-gray-400 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                Video del canal de YouTube:{" "}
                <a
                  className="hover:underline text-blue-600"
                  href="https://www.youtube.com/watch?v=wvYYy5z-inc&embeds_referring_euri=http%3A%2F%2Flocalhost%3A3000%2F&source_ve_path=OTY3MTQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Luis Carlos Galán
                </a>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md space-y-2">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                📘 Recursos adicionales
              </h2>
              <a
                href={modulo.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Leer más →
              </a>
              {modulo.enlacesAdicionales?.map((enlace, i) => (
                <a
                  key={i}
                  href={enlace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  {enlace.titulo}
                </a>
              ))}
            </div>
            {modulo.imagenes?.map((imagen, i) => (
              <figure
                key={i}
                className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden shadow-sm"
              >
                <img
                  src={imagen.src}
                  alt={imagen.alt}
                  className="w-full object-cover"
                />
                <figcaption className="text-xs p-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 italic">
                  {imagen.descripcion}
                </figcaption>
              </figure>
            ))}
          </aside>
        </div>
      </div>
    </main>
  );
}
