import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IntroModulo() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <Link
          to="/dashboard"
          className="text-blue-600 dark:text-blue-400 hover:underline text-xs fixed top-5 z-10"
        >
          &larr; Volver
        </Link>
        <div className="fixed h-12 w-full top-0 left-0 bg-gray-50 z-0"></div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 mt-14">
        Introducción al Recurso Educativo
      </h1>

      <div className="mb-6 shadow-xl rounded-2xl border p-6">
        <div className="space-y-4">
          <p className="text-lg">
            Este recurso ha sido desarrollado como parte del módulo de{" "}
            <strong>Soporte Técnico</strong> del Bachillerato Técnico en
            Informática. Está pensado para estudiantes de 15 a 16 años, con el
            fin de fortalecer habilidades prácticas y técnicas.
          </p>
          <p className="text-lg">
            A través de módulos temáticos, videos, actividades prácticas y
            autoevaluaciones, podrás explorar el fascinante mundo del
            mantenimiento de computadores, aprendiendo desde cómo limpiar tu
            equipo hasta cómo diagnosticar fallas o realizar reparaciones
            básicas.
          </p>
        </div>
      </div>

      <div className="mb-6 shadow-xl rounded-2xl border p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Conexión Curricular</h2>
          <p>
            Este recurso contribuye al desarrollo de la siguiente destreza del
            currículo oficial ecuatoriano para el Bachillerato Técnico en
            Informática:
          </p>
          <blockquote className="border-l-4 pl-4 italic text-gray-700">
            “Aplica técnicas de mantenimiento preventivo y correctivo de
            computadores personales, identificando problemas comunes en hardware
            y software.”
          </blockquote>
          <p>
            Esta destreza pertenece al eje temático{" "}
            <strong>“Tecnologías de la información y comunicación”</strong>,
            dentro de la Unidad de Competencia 4.
          </p>
          <ul className="list-disc pl-6 text-base">
            <li>Diagnóstico de fallas en hardware y software</li>
            <li>Aplicación de mantenimiento preventivo</li>
            <li>Reparación básica de componentes</li>
            <li>Registro de procesos técnicos</li>
          </ul>
          <p className="text-sm text-gray-500">
            Fuente: Currículo de Bachillerato Técnico en Informática –
            Ministerio de Educación del Ecuador
          </p>
        </div>
      </div>

      <div className="mb-6 shadow-xl rounded-2xl border p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            ¿Qué aprenderás en este curso?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base">
            <li>Limpieza del computador: externa e interna</li>
            <li>Respaldo seguro de tu información</li>
            <li>Desinstalación correcta de software</li>
            <li>Diagnóstico de fallas frecuentes</li>
            <li>Reparación básica de componentes</li>
          </ul>
          <p>
            Cada módulo incluye explicaciones paso a paso, recursos adicionales
            y actividades interactivas para reforzar lo aprendido.
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link className="text-blue-600 hover:underline" to="/modulo/limpieza">
          Comenzar el Curso →
        </Link>
      </div>
    </div>
  );
}
