"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavbarButton from "./NavbarButton";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si se hace scroll hacia abajo y ya se pasó cierto umbral, ocultamos la navbar
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setShow(false);
      } else {
        // Si se hace scroll hacia arriba, mostramos la navbar
        setShow(true);
      }
      setPrevScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Si el mouse está cerca de la parte superior (por ejemplo, 50px)
      if (e.clientY < 50) {
        setShow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [prevScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-transform duration-300 z-50 ${
        show ? "translate-y-0" : "-translate-y-full"
      } bg-black text-white p-4`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Izquierda: Botón de Home */}
        <div className="flex items-center">
          <NavbarButton nameTag="Home" path="/" />
        </div>
        {/* Centro: Barra de búsqueda */}
        <div className="flex-1 mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-gray-800 text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        {/* Derecha: Botones de Login y Registro, Favoritos y Carrito */}
        <div className="flex items-center space-x-4">
          <NavbarButton nameTag="Iniciar Sesión" path="/login" />
          <NavbarButton nameTag="Registrarse" path="/register" />
          {/*Botón de Favoritos */}
          <Link href="/favorites" className="text-white hover:text-gray-400">
          <svg
          xmlns="http://w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          >
            <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
            />
            </svg>
            </Link>
            {/* Botonde Carrito */}
            <Link href="/cart" className="text-white hover:text-gray-400">
            <svg
            xmlns="http://www.w3.or/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
              <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8M17 13l1.6 8M6 21h12"
              />
              </svg>
              </Link>

            
        </div>
      </div>
    </nav>
  );
}
