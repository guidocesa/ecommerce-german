"use client"; 

import Link from "next/link";
import { useAuth } from "@/app/firebase/authContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="text-white text-2xl font-bold">
            Mi E-commerce
          </Link>

          <nav className="flex items-center space-x-4">
            <Link href="/products" className="text-white hover:underline">
              Productos
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-white">Bienvenido, {user.email}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition">
                Iniciar Sesión
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Bienvenido a Mi E-commerce
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre los productos más increíbles y las ofertas exclusivas que tenemos para vos.
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
          >
            Ver Productos
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Mi E-commerce. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
