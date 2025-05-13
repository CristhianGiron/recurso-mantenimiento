import { Link } from 'react-router-dom';
import {
  SparklesIcon,
  CloudUploadIcon,
  TrashIcon,
  ExclamationCircleIcon,
  SupportIcon,
  CheckCircleIcon
} from '@heroicons/react/outline';

const modulos = [
  {
    nombre: 'limpieza',
    titulo: 'Limpieza del computador',
    descripcion: 'Cómo mantener limpio tu equipo por dentro y fuera.',
    icono: <SparklesIcon className="w-8 h-8 text-blue-600" />
  },
  {
    nombre: 'respaldo',
    titulo: 'Respaldo de Información',
    descripcion: 'Aprende a hacer copias de seguridad de tus datos.',
    icono: <CloudUploadIcon className="w-8 h-8 text-blue-600" />
  },
  {
    nombre: 'desinstalacion',
    titulo: 'Desinstalar programas',
    descripcion: 'Aprende a desinstalar programas de forma segura.',
    icono: <TrashIcon className="w-8 h-8 text-blue-600" />
  },
  {
    nombre: 'diagnostico',
    titulo: 'Diagnóstico de problemas comunes',
    descripcion: 'Diagnostica problemas básicos en computadoras.',
    icono: <ExclamationCircleIcon className="w-8 h-8 text-blue-600" />
  },
  {
    nombre: 'reparacion',
    titulo: 'Reparación Básica de Computadoras',
    descripcion: 'Aprende a realizar reparaciones básicas.',
    icono: <SupportIcon className="w-8 h-8 text-blue-600" />
  },
  {
    nombre: 'evaluacion',
    titulo: 'Evaluación final',
    descripcion: 'Demuestra lo aprendido con esta autoevaluación.',
    icono: <CheckCircleIcon className="w-8 h-8 text-blue-600" />
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-5">
      
      {/* Encabezado con logo */}
      <div className="relative flex justify-center items-center mb-5">
        <Link className='absolute left-0' to={"/"}>  
        <img
          src="https://joinforwater.ngo/wp-content/uploads/2022/05/logo-unl-HC-01-e1651758359420.png" // Asegúrate de que el logo esté en public/logo-unl.png
          alt="Logo UNL"
          className=" h-14 object-contain"
        />
        </Link>
       
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center">
          Módulos Educativos
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Tarjetas */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 flex-1">
          {modulos.map(mod => (
            <Link
              to={`/modulo/${mod.nombre}`}
              key={mod.nombre}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border hover:border-blue-500 block"
            >
              <div className="mb-3">{mod.icono}</div>
              <h2 className="text-xl font-semibold text-blue-700 mb-1">{mod.titulo}</h2>
              <p className="text-gray-600 text-sm">{mod.descripcion}</p>
            </Link>
          ))}
        </div>

        {/* Aside fijo */}
        <aside className="w-full lg:w-80 bg-white border border-gray-200 p-5 rounded-xl shadow-md self-start">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🧾 Información del recurso</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>Nombre:</strong> Soporte técnico</li>
            <li className='pl-3'>
              <strong className='-ml-3'>Autor:</strong> <br />
              Gabriel Chamba <br />
              Cristhian Girón <br />
              Danny Peñafiel
            </li>
            <li><strong>Licencia:</strong> Creative Commons BY-SA</li>
            <li><strong>Asignatura:</strong> Analisis y diseño de recursos educativos</li>
            <li><strong>Subtemas:</strong> Mantenimiento de computadoras</li>
            <li><strong>Objetivo:</strong> Aplicar técnicas de mantenimiento preventivo y correctivo en computadoras para asegurar su correcto funcionamiento y proteger la información.</li>
            <li><strong>Edad sugerida:</strong> 15 a 16 años</li>
            <li><strong>Duración:</strong> 5 módulos + evaluación final</li>
          </ul>
          <p className="mt-6 text-gray-500 text-xs italic">
            Esta plataforma educativa busca fomentar el aprendizaje técnico autónomo y práctico.
          </p>
        </aside>
      </div>

      <Link
        to="/"
        className="text-blue-600 hover:underline flex items-center justify-center mt-5"
      >
        ← Volver al Inicio
      </Link>
    </div>
  );
}
