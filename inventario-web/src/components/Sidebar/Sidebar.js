import Link from "next/link";
import Image from "next/image";
import "./Sidebar.css";

export function Sidebar() {
  return (
    <div className="container">
      <Link href="#" className="logo">
        <Image src="/assets/inventory.svg" width="300" height="300" />
        Inventario
      </Link>
      <div className="buttons">
        <Link href="#productos" className="btn">
          Productos
        </Link>
        <Link href="#categorias" className="btn">
          Categorias
        </Link>
        <Link href="#proveedores" className="btn">
          Proveedores
        </Link>
        <Link href="#ventas" className="btn">
          Ventas
        </Link>
      </div>
    </div>
  );
}
