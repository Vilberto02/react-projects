import Image from "next/image";
import Link from "next/link";

export function Footer(){
  return (
    <footer className="bg-linear-to-b from-stone-200 to-white flex flex-col gap-12 pb-12 pt-32 px-4 md:px-8 lg:px-10 xl:px-36">
      <div className="flex flex-col lg:flex-row justify-between gap-8 items-start">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-black">Secretaría General</p>
          <Image
            src={"unmsm-logo.svg"}
            alt={"Universidad Nacional Mayor de San Marcos"}
            width={120}
            height={140}
          ></Image>
        </div>
        <div className="text-black flex flex-wrap items-start gap-12 md:gap-20">
          <div className="flex flex-col gap-3">
            <p>
              <strong>Consultas</strong>
            </p>
            <Link href={"/"} className="uppercase text-stone-600">
              sunedu
            </Link>
            <Link href={"/"} className="uppercase text-stone-600">
              minedu
            </Link>
            <Link href={"/"} className="uppercase text-stone-600">
              reniec
            </Link>
            <Link href={"/"} className="uppercase text-stone-600">
              mef
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <p>
              <strong>Enlaces</strong>
            </p>
            <Link href={"/"} className="capitalize text-stone-600">
              directorio telefónico
            </Link>
            <Link href={"/"} className="capitalize text-stone-600">
              oficina de admisión
            </Link>
            <Link href={"/"} className="capitalize text-stone-600">
              transparencia universitaria
            </Link>
            <Link href={"/"} className="capitalize text-stone-600">
              red telemática
            </Link>
          </div>
          <div className="max-w-48 flex flex-col gap-3">
            <p>
              <strong>Contáctanos</strong>
            </p>
            <p>
              <strong>Dirección:</strong>{" "}
              <span className="text-stone-600">
                Av. Carlos Germán Amezaga #375 Cercado de Lima.
              </span>{" "}
            </p>
            <p>
              <strong>Teléfono:</strong>{" "}
              <span className="text-stone-600">(01) 6197000</span>{" "}
            </p>
            <div className="flex gap-3 items-center mt-4">
              <Link href={"/"}>
                <Image
                  src={"facebook.svg"}
                  alt={"Logotipo de Facebook"}
                  width={20}
                  height={20}
                ></Image>
              </Link>
              <Link href={"/"}>
                <Image
                  src={"youtube.svg"}
                  alt={"Logotipo de Youtube"}
                  width={24}
                  height={24}
                  className="cursor-pointer"
                ></Image>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center ">
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 rounded-full bg-[#D9B483]"></div>
          <p className="text-[#66150E] text-sm">
            Desarrollado por la Unidad de Informática
          </p>
        </div>
        <p className="text-[#66150E] text-sm">
          © 2025 Secretaria General. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}