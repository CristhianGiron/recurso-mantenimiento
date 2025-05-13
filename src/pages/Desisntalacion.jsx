import { useParams, Link } from "react-router-dom";
import TTS from "../utils/TTS";
const contenidos = {
  desinstalacion: {
    titulo: "Desinstalación Segura de Programas",
    contenido: [
      {
        tipo: "texto",
        texto:
          "🧹 La desinstalación de programas es una tarea esencial para mantener el buen funcionamiento del sistema operativo y liberar espacio en disco.",
      },
      {
        tipo: "texto",
        texto:
          "❌ Muchos programas dejan archivos residuales, por lo que conocer herramientas y métodos adecuados es clave.",
      },
      {
        tipo: "ventajas",
        titulo: "🧠 ¿Qué aprenderás?",
        items: [
          "Cómo desinstalar correctamente programas en Windows.",
          "Diferencias entre desinstalación manual y con software especializado.",
          "Cómo identificar programas innecesarios o sospechosos.",
          "Qué hacer cuando un programa no se deja eliminar.",
        ],
      },
      {
        tipo: "pasos",
        titulo: "🪛 Métodos para desinstalar un programa",
        items: [
          "Desde el Panel de control o Configuración de Windows.",
          "Utilizando desinstaladores incluidos por el software.",
          "Con programas especializados como Revo Uninstaller o IObit.",
        ],
      },
      {
        tipo: "alerta",
        texto:
          "⚠️ No elimines carpetas de programas manualmente sin desinstalarlos primero. Esto puede dejar entradas huérfanas en el registro del sistema.",
      },
      {
        tipo: "tip",
        texto:
          "💡 Si un programa no se deja desinstalar, prueba reiniciar en Modo Seguro y usar una herramienta como 'Geek Uninstaller'.",
      },
      {
        tipo: "curiosidad",
        texto:
          "🧠 Algunos programas de antivirus crean servicios activos que impiden su eliminación. Siempre busca sus instrucciones oficiales.",
      },
      {
        tipo: "frecuencia",
        texto:
          "🗑️ Revisa tus programas instalados cada 2-3 meses. Desinstalar los que no usas mejora el rendimiento general.",
      },
      {
        tipo: "logro",
        texto:
          "🎉 Si logras limpiar programas no deseados y liberar espacio, estás gestionando tu sistema como un usuario avanzado.",
      },
      {
        tipo: "pregunta",
        texto:
          "🤔 ¿Has usado alguna vez un programa como CCleaner o Revo Uninstaller para eliminar software por completo?",
      },
    ],
    videoUrl: "https://drive.google.com/file/d/1J_XqO4b-gpb0J8YkgfW7HDd9OUn5oqLs/preview", // Video sobre desinstalación de programas
    autorVideo: "PC ANDROID",
    enlace: "https://support.microsoft.com/es-es/windows/quitar-o-eliminar-programas-en-windows",
    enlacesAdicionales: [
      {
        titulo: "Guía oficial de Windows para desinstalar programas",
        url: "https://support.microsoft.com/es-es/windows/quitar-o-eliminar-programas-en-windows",
      },
      {
        titulo: "Revo Uninstaller – Eliminación avanzada de programas",
        url: "https://www.revouninstaller.com/",
      },
      {
        titulo: "Cómo desinstalar antivirus difíciles de eliminar",
        url: "https://www.avg.com/es-es/signal/uninstall-antivirus",
      },
    ],
    imagenes: [
      {
        src: "https://acf.geeknetic.es/imgw/imagenes/auto/2024/8/23/oi8-image.png?f=webp",
        alt: "Panel de control de Windows",
        descripcion: "Desde el panel de control puedes ver y desinstalar programas fácilmente.",
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNat7Tc9AeLQL9Uh6lv4nJ7q6OGj58Y8_-pQ&s",
        alt: "Uso de Revo Uninstaller",
        descripcion: "Herramientas como Revo ayudan a eliminar restos ocultos tras la desinstalación.",
      },
    ],
  },
};

  

export default function Desisntalacion() {
  const modulo = contenidos["desinstalacion"];

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
          <div key={idx}>
            <p className="text-gray-700 dark:text-gray-300 italic">
              {bloque.texto} <TTS text={bloque.texto} />
            </p>
            
          </div>
        );

      case "ventajas":
      case "pasos":
        const textoBloque = `${bloque.titulo}. ${bloque.items.join(". ")}`;
        return (
          <div
            key={idx}
            className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
              {bloque.titulo}
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-0.5">
              {bloque.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <TTS className="absolute right-2 top-2" text={textoBloque} />
          </div>
        );

      case "alerta":
      case "frecuencia":
      case "curiosidad":
      case "tip":
      case "logro":
        return (
          <div
            key={idx}
            className={`p-3 rounded-md border-l-4 text-sm ${
              bloque.tipo === "alerta"
                ? "bg-yellow-100 dark:bg-yellow-200 text-yellow-900 border-yellow-500"
                : bloque.tipo === "frecuencia"
                ? "bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-500 italic"
                : bloque.tipo === "curiosidad"
                ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-300"
                : bloque.tipo === "tip"
                ? "bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 border-green-500"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-500"
            }`}
          >
            {bloque.texto}
            <TTS text={bloque.texto} />
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
      to={`/modulo/evaluacion-desinstalacion`}
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
                  href="https://www.youtube.com/watch?v=8wO-R8uEEiU&ab_channel=PCANDROID"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PC ANDROID
                </a>
              </p>
            </div>

            {/*<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md space-y-2">
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
            </div>*/}
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
