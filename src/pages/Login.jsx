// src/pages/Login.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de login
    if (email && password) navigate('/dashboard');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Iniciar Sesión</h2>
        <label className="block mb-2 font-medium text-gray-600">Correo</label>
        <input type="email" className="w-full mb-4 p-2 border rounded-md" value={email} onChange={e => setEmail(e.target.value)} required />

        <label className="block mb-2 font-medium text-gray-600">Contraseña</label>
        <input type="password" className="w-full mb-4 p-2 border rounded-md" value={password} onChange={e => setPassword(e.target.value)} required />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">Entrar</button>
      </form>
    </main>
  );
}