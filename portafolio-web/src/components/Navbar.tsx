import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-screen z-50">
      <nav className="flex justify-between max-w-7xl mx-auto items-center py-5">
        <div className="w-4 h-4 bg-stone-400 rounded-full"></div>
        <button className="cursor-pointer">
          <Menu width={18}></Menu>
        </button>
      </nav>
    </div>
  );
}
