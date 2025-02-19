'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Simulación de autenticación
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirigir si el login es exitoso
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}