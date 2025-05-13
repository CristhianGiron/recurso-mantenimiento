import { useEffect, useState } from "react";

const imagenes = [
  "https://www.unl.edu.ec/sites/default/files/galeria/2021/02/HEADER1.jpg",
  "https://www.unl.edu.ec/sites/default/files/galeria/2022/02/b.jpg",
  "https://www.unl.edu.ec/sites/default/files/galeria/2022/02/c.jpg",
];

export default function Home() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 5000); // cambia cada 5 segundos
    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden">
      {imagenes.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === indice ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      {/* Contenido encima */}
      <div className="relative z-10 text-center backdrop-blur-sm bg-black/40 p-6 rounded-xl">
        <img src="https://joinforwater.ngo/wp-content/uploads/2022/05/logo-unl-HC-01-e1651758359420.png" alt="" />
        <h1 className="text-4xl font-bold mb-4">Curso de Mantenimiento de Computadores</h1>
        <p className="text-lg mb-6">Ingresa para comenzar o entra como invitado</p>
        <div className="flex gap-4 justify-center">
          <a href="/login" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
            Iniciar Sesión
          </a>
          <a href="/dashboard" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700">
            Ingresar como Invitado
          </a>
        </div>
      </div>
    </main>
  );
}
