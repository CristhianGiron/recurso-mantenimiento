import { useParams, Link } from "react-router-dom";
import TTS from "../utils/TTS"; // Asegúrate de que este TTS está importado correctamente

const contenidos = {
  limpieza: {
    titulo: "Limpieza del Computadoras",
    contenido: [
      {
        tipo: "texto",
        texto: `La limpieza de tu computadora es esencial para su buen funcionamiento y duración. Aquí te enseñamos a hacerlo paso a paso:`,
      },
      {
        tipo: "pasos",
        titulo: "1️⃣ Prepara tu espacio de trabajo",
        items: [
          "Apaga y desconecta completamente el computador.",
          "Coloca el equipo sobre una superficie plana, limpia y bien iluminada.",
        ],
      },
      {
        tipo: "pasos",
        titulo: "2️⃣ Reúne los materiales necesarios",
        items: [
          "Aire comprimido en lata",
          "Pincel o brocha suave",
          "Paño de microfibra seco",
          "Alcohol isopropílico (opcional)",
          "Destornillador (si vas a abrir el gabinete)",
        ],
      },
      {
        tipo: "pasos",
        titulo: "3️⃣ Limpieza externa",
        items: [
          "Usa el paño de microfibra para limpiar la pantalla y el teclado.",
          "Evita usar líquidos directamente.",
        ],
      },
      {
        tipo: "pasos",
        titulo: "4️⃣ Limpieza interna",
        items: [
          "Usa aire comprimido para eliminar el polvo.",
          "No toques los componentes con las manos.",
        ],
      },
      {
        tipo: "alerta",
        texto:
          "⚠️ Importante: Nunca uses agua ni limpies con el equipo encendido. Si no estás seguro, pide ayuda a un adulto o técnico.",
      },
      {
        tipo: "frecuencia",
        texto:
          "🎯 Frecuencia recomendada: Externa cada 2 meses / Interna cada 6 meses",
      },
      {
        tipo: "curiosidad",
        texto:
          "🧠 ¡Un ventilador lleno de polvo puede hacer que tu PC se apague por sobrecalentamiento!",
      },
    ],
    videoUrl:
      "https://drive.google.com/file/d/1UDtlIfpnKvI_41_ecpLoVd9DHg-LsroB/preview",
    autorVideo: "Digitalife",
    enlace:
      "https://www.hp.com/mx-es/shop/tech-takes/como-limpiar-tu-computadora-portatil",
  },
};

export default function Limpieza() {
  const modulo = contenidos["limpieza"];

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
                  return (
                    <p key={idx} className="text-gray-700 dark:text-gray-300">
                      {bloque.texto}
                      <TTS text={bloque.texto} />
                    </p>
                  );

                case "pasos":
                  return (
                    <div
                      key={idx}
                      className=" relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 shadow-sm"
                    >
                      <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
                        {bloque.titulo}
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-0.5">
                        {bloque.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      {/* Agregar el botón de TTS en cada bloque */}
                      <TTS className="absolute right-2 top-2" text={`${bloque.titulo} ${bloque.items.join(' ')}`} />
                    </div>
                  );

                case "alerta":
                  return (
                    <div
                      key={idx}
                      className="bg-yellow-100 dark:bg-yellow-200 text-yellow-900 p-3 rounded-md text-sm border-l-4 border-yellow-500"
                    >
                      {bloque.texto}
                      <TTS text={bloque.texto} />
                    </div>
                  );

                case "frecuencia":
                  return (
                    <div
                      key={idx}
                      className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-3 rounded-md border-l-4 border-blue-500 italic"
                    >
                      {bloque.texto}
                      <TTS text={bloque.texto} />
                    </div>
                  );

                case "curiosidad":
                  return (
                    <div
                      key={idx}
                      className="bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 p-3 rounded-md"
                    >
                      {bloque.texto}
                      <TTS text={bloque.texto} />
                    </div>
                  );

                default:
                  return null;
              }
            })}

            {/* Resto de contenido */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md">
              <h2 className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-100">
                📘 Actividad
              </h2>
              <Link
                to={`/modulo/evaluacion-limpieza`}
                className="inline-block text-blue-600 px-6 py-3 hover:underline transition"
              >
                Realizar actividad →
              </Link>
            </div>
            <div
              className="interacty_padding"
              style={{
                position: "relative",
                paddingTop: "99.5%",
                paddingRight: "0",
                paddingBottom: "0",
                paddingLeft: "0",
              }}
            >
              <div
                className="interacty_wrapper"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <iframe
                  style={{ border: "none", width: "100%", height: "100%" }}
                  src="https://p.interacty.me/81ffa4b26fda5e4a/iframe.html"
                  title="Interacty Game"
                />
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            {/* Video */}
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
              <p className="text-xs text-gray-600 dark:text-gray-400 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                Video del canal de YouTube:{" "}
                <a
                  className="hover:underline text-blue-600"
                  href="https://www.youtube.com/watch?v=BCnQGgctQ_Y&t=1s&ab_channel=Digitalife"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Digitalife
                </a>
              </p>
            </div>

            {/* Recursos adicionales */}
            <div className="space-y-3">
              <div className="border rounded-md overflow-hidden shadow-sm">
                <img
                  src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/XX2OBUIM3ZANJMH7C4ZFYTVHYI.JPG"
                  alt="Limpieza exterior de una laptop"
                  className="w-full object-cover"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 px-2 py-1 bg-gray-50 dark:bg-gray-800">
                  Limpieza externa: usa un paño de microfibra sin mojar.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
