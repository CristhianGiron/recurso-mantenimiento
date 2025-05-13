import { useParams, Link } from "react-router-dom";
import PCComponentGame from "./juegoresponsive";
const contenidos = {
    diagnostico: {
      titulo: "Diagnóstico de Problemas Comunes",
      contenido: [
        {
          tipo: "texto",
          texto:
            "🛠️ Antes de reparar, es vital diagnosticar correctamente el problema. Aquí aprenderás cómo identificar fallos comunes en un computador.",
        },
        {
          tipo: "ventajas",
          titulo: "🔍 Ventajas de hacer un buen diagnóstico",
          items: [
            "Evitas perder tiempo solucionando lo que no está roto.",
            "Ahorras dinero al evitar reemplazos innecesarios.",
            "Puedes resolver muchos problemas sin ayuda técnica.",
          ],
        },
        {
          tipo: "pasos",
          titulo: "1️⃣ Observa los síntomas",
          items: [
            "¿No enciende? ¿Hace ruidos? ¿Se reinicia solo?",
            "Toma nota de mensajes de error o luces inusuales.",
          ],
        },
        {
          tipo: "pasos",
          titulo: "2️⃣ Identifica posibles causas",
          items: [
            "Fuente de poder, memoria RAM, disco duro o virus.",
            "Revisa los últimos cambios realizados al sistema.",
          ],
        },
        {
          tipo: "alerta",
          texto:
            "⚠️ No intentes abrir tu equipo si no estás seguro. Podrías dañarlo o perder la garantía.",
        },
        {
          tipo: "tip",
          texto:
            "💡 Usa el 'Modo seguro' o herramientas como el 'Administrador de tareas' para revisar el estado del sistema.",
        },
        {
          tipo: "pregunta",
          texto: "🧐 ¿Sabes cómo iniciar tu computadora en modo seguro?",
        },
        {
          tipo: "frecuencia",
          texto:
            "🔄 Realiza diagnósticos mensuales o cuando notes cambios inusuales en el rendimiento.",
        },
        {
          tipo: "logro",
          texto:
            "🏆 Si logras detectar un problema antes de que empeore, estás desarrollando habilidades técnicas importantes.",
        },
        {
          tipo: "curiosidad",
          texto:
            "🧠 ¡El 80% de los problemas informáticos se pueden resolver con diagnóstico básico y mantenimiento!",
        },
      ],
      videoUrl: "https://drive.google.com/file/d/1MlzbvPrenxAQQmSoeh9I9jkBH822kBfs/preview",
      autorVideo: "ELECTROSOTOX",
      enlace:
        "https://www.hp.com/es-es/shop/tech-takes/como-diagnosticar-problemas-pc",
      enlacesAdicionales: [
        {
          titulo: "Diagnóstico con herramientas de Windows",
          url: "https://support.microsoft.com/es-es/help/4028430/windows-diagnose-your-pc",
        },
        {
          titulo: "Cómo identificar errores comunes en el hardware",
          url: "https://www.intel.la/content/www/xl/es/gaming/resources/pc-troubleshooting.html",
        },
      ],
      imagenes: [
        {
          src: "https://i.dell.com/sites/csimages/App-Merchandizing_esupport_flatcontent_global_Images/all/bluescreen.png",
          alt: "Pantalla azul de error en Windows",
          descripcion:
            "La famosa 'pantalla azul' puede indicar errores de memoria o controladores.",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5zbaId9ealJW8hEakIpg9SDSSN1Hfcuf7wA&s",
          alt: "Herramienta de diagnóstico de sistema",
          descripcion:
            "Aplicaciones como el Visor de eventos pueden ayudarte a identificar la causa de un error.",
        },
      ],
    },
  };
  

export default function Diagnostico() {
  const modulo = contenidos["diagnostico"];

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
                to={`/modulo/evaluacion-diagnostico`}
                className="inline-block text-blue-600 px-6 py-3 hover:underline transition"
              >
                Realizar actividad →
              </Link>
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
                  href="https://www.youtube.com/watch?v=5Oz0Je4FU_0&ab_channel=ELECTROSOTOX"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ELECTROSOTOX
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
