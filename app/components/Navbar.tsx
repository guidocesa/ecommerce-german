import Link from "next/link";
import NavbarButton from "./NavbarButton";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
            <NavbarButton nameTag="Home" path={"/"}/>
            <NavbarButton nameTag="Iniciar Sesion" path={"/login"} />
            <NavbarButton nameTag="Registrarse" path={"/register"}/>
        </div>
    </nav>
  );
}