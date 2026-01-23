
export function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-screen z-50">
      <nav className="flex justify-between items-center py-5 px-24">
        <div className="bg-purple-700 shadow-lg py-1 px-2">
          <p className="uppercase font-bold text-lg text-white">pj</p>
        </div>
        <div className="flex gap-12 items-center">
          <a href="#home">Inicio</a>
          <a href="#about">Sobre mí</a>
          <a href="#skill">Habilidades</a>
          <a href="#project">Proyectos</a>
        </div>
      </nav>
    </div>
  );
}
