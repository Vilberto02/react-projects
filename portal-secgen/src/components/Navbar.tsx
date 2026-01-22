import { Menu } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="relative flex justify-center">
      <div className="fixed flex items-center justify-between py-4 px-4 md:px-8 lg:px-10 xl:px-36 gap-4 w-full">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src={"unmsm-logo.svg"} alt={""} width={37} height={44}></Image>
          <p className="font-bold text-sm select-none">Secretaría General</p>
        </div>
        <nav className="lg:flex hidden gap-10 uppercase">
          <button className="uppercase hover:opacity-90 cursor-pointer text-sm">
            Inicio
          </button>
          <button className="uppercase hover:opacity-90 cursor-pointer text-sm">
            Nosotros
          </button>
          <button className="uppercase hover:opacity-90 cursor-pointer text-sm">
            servicios
          </button>
          <button className="uppercase hover:opacity-90 cursor-pointer text-sm">
            oficinas
          </button>
          <button className="uppercase hover:opacity-90 cursor-pointer text-sm">
            proyectos
          </button>
          <button className="uppercase hover:opacity-90 cursor-pointer text-sm">
            informes de gestión
          </button>
        </nav>
        <div className="px-2 py-1 rounded-sm lg:hidden">
          <Menu></Menu>
        </div>
      </div>
    </header>
  );
}