"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { useAuth } from "@/app/firebase/authContext";

export default function Login() {
  const { user } = useAuth(); // Obtener usuario autenticado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 🔹 Usar useEffect para redirigir después de renderizar
  useEffect(() => {
    if (user) {
      router.push("/"); // Redirigir al home si ya está autenticado
    }
  }, [user, router]); // Se ejecuta cada vez que `user` cambia

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirigir si el login es exitoso
    } catch (error: any) {
      setError(error.message);
    }
  };

  // 🔹 Mostrar "Cargando..." en lugar de intentar renderizar mientras redirige
  if (user) return <p className="text-center mt-10">Redirigiendo...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-black-100">
      <div className="w-full max-w-md bg-black p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2">Iniciar Sesión</h1>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black-700 text-sm font-bold mb-2">
              Contraseña
            </label>
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
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
