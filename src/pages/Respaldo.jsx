import { useParams, Link } from "react-router-dom";
import respaldoVideo from '../videos/respaldo.mp4';
const contenidos = {
  respaldo: {
    titulo: "Respaldo de Información",
    contenido: [
      {
        tipo: "texto",
        texto:
          "💾 Realizar respaldos frecuentes de tu información es fundamental para evitar pérdidas de datos. Sigue estos pasos para mantener tu información segura:",
      },
      {
        tipo: "ventajas",
        titulo: "✨ Beneficios de respaldar tu información",
        items: [
          "Evitas pérdidas catastróficas por errores humanos o técnicos.",
          "Puedes recuperar versiones anteriores de tus archivos.",
          "Te protege contra virus y ransomware.",
        ],
      },
      {
        tipo: "pasos",
        titulo: "1️⃣ Elige el medio de respaldo",
        items: [
          "Disco duro externo o pendrive.",
          "Servicios en la nube como Google Drive, OneDrive o Dropbox.",
        ],
      },
      {
        tipo: "pasos",
        titulo: "2️⃣ Clasifica tus archivos",
        items: [
          "Organiza tus archivos por carpetas según tipo o proyecto.",
          "Evita guardar archivos innecesarios.",
        ],
      },
      {
        tipo: "pasos",
        titulo: "3️⃣ Realiza el respaldo",
        items: [
          "Copia los archivos importantes manualmente o con programas de respaldo.",
          "Verifica que los archivos se hayan guardado correctamente.",
        ],
      },
      {
        tipo: "alerta",
        texto:
          "⚠️ Nunca respaldes en el mismo dispositivo que usas diariamente. Si falla, perderás todo.",
      },
      {
        tipo: "frecuencia",
        texto:
          "🎯 Frecuencia recomendada: Cada semana o tras cada cambio importante.",
      },
      {
        tipo: "curiosidad",
        texto:
          "🧠 ¡Un respaldo actualizado puede salvar meses de trabajo en caso de falla!",
      },
      {
        tipo: "pregunta",
        texto:
          "🧐 ¿Tienes hoy un respaldo actualizado de tus archivos importantes?",
      },
      {
        tipo: "tip",
        texto:
          "🔁 Usa herramientas como SyncBack o Time Machine para automatizar tus respaldos.",
      },
      {
        tipo: "logro",
        texto:
          "🏆 Si logras mantener un respaldo actualizado por 1 mes, ¡felicitaciones! Estás adoptando una buena práctica digital.",
      },
    ],
    videoUrl: "../videos/respaldo.mp4",
    autorVideo:"Leonardo Duarte",
    enlace:
      "https://www.digitaltrends.com/computing/how-to-back-up-your-computer/",
    enlacesAdicionales: [
      {
        titulo: "Cómo hacer un backup en Windows 11",
        url: "https://support.microsoft.com/windows-backup",
      },
      {
        titulo: "Guía completa de respaldo en Mac",
        url: "https://support.apple.com/guide/mac-help/back-up-your-files",
      },
    ],
    imagenes: [
      {
        src: "https://www.akamai.com/site/es/images/article/2023/what_is_the_cloud.png",
        alt: "Ejemplo de respaldo en la nube",
        descripcion:
          "Respaldo automático en la nube con sincronización en segundo plano.",
      },
      {
        src: "https://media.istockphoto.com/id/639550204/es/foto/estructura-de-carpetas.jpg?s=612x612&w=0&k=20&c=PqpiNY7nt2VJKfADbFwuWcPY-MFGiZP0k4O9Ke3xu6A=",
        alt: "Organización de carpetas",
        descripcion:
          "Una estructura ordenada facilita encontrar y respaldar tus archivos.",
      },
    ],
  },
};

export default function Respaldo() {
  const modulo = contenidos["respaldo"];

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
                to={`/modulo/evaluacion-respaldo`}
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
                 <video src={respaldoVideo} controls className="w-full h-full" />
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
                  Leonardo Duarte
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
