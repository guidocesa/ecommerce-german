"use client"; // Esto es necesario si usás hooks o manejás estado en el componente

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
  

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        // Simulación de autenticación
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          router.push("/"); // Redirigir si el login es exitoso
        } catch (error: any) {
          setError(error.message);
        }
      };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registrarse</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 mt-1"
            required
          />
        </label>
        <button type="submit" className="bg-blue-600 text-white p-2 mt-4 w-full">
          Registrarse
        </button>
      </form>
    </div>
  );
}
