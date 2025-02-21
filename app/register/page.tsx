"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebaseConfig";
import { useAuth } from "@/app/firebase/authContext";

export default function RegisterPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

 

  return (
    <div className="flex min-h-screen items-center justify-center bg-black-100">
      <div className="w-full max-w-md bg-black p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2">Registrarse</h1>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white-700 text-sm font-bold mb-2">Correo Electrónico</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black-700 text-sm font-bold mb-2">Contraseña</label>
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
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
