import { useState } from "react";
import {
  BookOpenIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const referencias = [
  "Brusquetti, I. C. (2014, marzo 4). ¿Qué es el mantenimiento de computadoras? ABC Color. https://www.abc.com.py/edicion-impresa/suplementos/escolar/que-es-el-mantenimiento-de-computadoras-1220791.html",
  "Juan Manuel, S. C. (2021). Edu.mx. https://www.conalepveracruz.edu.mx/iniciobackup/wp-content/uploads/2021/03/Mantenimiento-de-equipo-de-c%C3%B3mputo-b%C3%A1sico-M%C3%93DULO-PROFESIONAL.pdf",
  "ULPGC. (s/f). Mantenimiento básico de tu PC. Ulpgc.es. Recuperado el 14 de mayo de 2025, de https://si.ulpgc.es/asistencia-informatica/mantenimiento-basico-de-tu-pc",
  "Devs, W. (2023, agosto 2). Computer repair hardware 101: Essential tools and techniques. Downtown Computers. https://www.downtowncomputers.com/computer-repair-hardware-101-essential-tools-techniques-for-successful-repairs",
  "SpartanGeek. (2023). Diagnóstico de Computadoras: Cómo Identificar y Solucionar Problemas Comunes. Spartangeek.com. https://spartangeek.com/blog/diagn%C3%B3stico-de-computadoras-c%C3%B3mo-identificar-y-solucionar-problemas-comunes?srsltid=AfmBOoqnlUs6jt-taK2BgOTKdCxerYc0cRYh61rp4mAsFg2N6ednpOdB",
];

const creditos = [
  "Canal de YouTube Digitalife: https://www.youtube.com/watch?v=BCnQGgctQ_Y&t=1s&ab_channel=Digitalife",
  "Canal de YouTube Leonardo Duarte: https://www.youtube.com/watch?v=wvYYy5z-inc&embeds_referring_euri=http%3A%2F%2Flocalhost%3A3000%2F&source_ve_path=OTY3MTQ",
  "Canal de YouTube PC ANDROID: https://www.youtube.com/watch?v=8wO-R8uEEiU&ab_channel=PCANDROID",
  "Canal de YouTube ELECTROSOTOX: https://www.youtube.com/watch?v=5Oz0Je4FU_0&ab_channel=ELECTROSOTOX",
  "Canal de YouTube Luis Carlos Galán: https://www.youtube.com/watch?v=wvYYy5z-inc&embeds_referring_euri=http%3A%2F%2Flocalhost%3A3000%2F&source_ve_path=OTY3MTQ",
  "Imágenes tomadas de FreePik, Pixabay y PngWing",
];

// 🧠 Función para hacer enlaces clicables automáticamente
function formatearReferencia(texto) {
  const partes = texto.split(/(https?:\/\/\S+)/g);
  return partes.map((parte, i) =>
    parte.match(/^https?:\/\/\S+$/) ? (
      <a
        key={i}
        href={parte}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-words"
      >
        {parte}
      </a>
    ) : (
      <span key={i}>{parte}</span>
    )
  );
}

export default function ReferenciasBibliograficas() {
  const [abierto, setAbierto] = useState(true);
  const [abierto1, setAbierto1] = useState(true);

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-gray-900 px-4 py-6 text-sm leading-relaxed">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Link
            to="/dashboard"
            className="text-blue-600 dark:text-blue-400 hover:underline text-xs fixed top-5 z-50"
          >
            &larr; Volver
          </Link>
          <div className="fixed h-12 w-full top-0 left-0 bg-gray-50 z-10"></div>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          <div className="grid grid-cols-1 gap-5">
            {/* Referencias bibliográficas */}
            <section className="bg-white border border-gray-300 rounded-xl shadow-md p-5">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setAbierto(!abierto)}
              >
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-800">
                    Referencias Bibliográficas
                  </h2>
                </div>
                {abierto ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </div>

              {abierto && (
                <ul className="mt-4 space-y-3 list-decimal list-inside text-sm text-gray-700">
                  {referencias.length === 0 ? (
                    <li className="text-gray-500 italic">
                      No hay referencias disponibles.
                    </li>
                  ) : (
                    referencias.map((ref, index) => (
                      <li key={index} className="leading-relaxed">
                        {formatearReferencia(ref)}
                      </li>
                    ))
                  )}
                </ul>
              )}
            </section>

            {/* Créditos multimedia */}
            <section className="bg-white border border-gray-300 rounded-xl shadow-md p-5">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setAbierto1(!abierto1)}
              >
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-800">
                    Créditos por contenido multimedia (imágenes y videos)
                  </h2>
                </div>
                {abierto1 ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </div>

              {abierto1 && (
                <ul className="mt-4 space-y-3 list-decimal list-inside text-sm text-gray-700">
                  {creditos.length === 0 ? (
                    <li className="text-gray-500 italic">
                      No hay créditos disponibles.
                    </li>
                  ) : (
                    creditos.map((ref, index) => (
                      <li key={index} className="leading-relaxed">
                        {formatearReferencia(ref)}
                      </li>
                    ))
                  )}
                </ul>
              )}
            </section>
          </div>

          {/* Imagen decorativa */}
          <aside className="space-y-4">
            <img
              className="h-full object-cover rounded-xl"
              src="https://cdn.pixabay.com/photo/2023/01/15/16/20/library-7720589_1280.jpg"
              alt="Ilustración de biblioteca"
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
