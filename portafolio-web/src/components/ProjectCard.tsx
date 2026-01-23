import { ArrowUpRight } from "lucide-react";

export function ProjectCard() {

  return (
    <div className="group min-h-118 flex flex-col justify-center items-center gap-8 px-7 py-9 border-b border-r border-black ">
      <div className="w-96 h-50 bg-[url(./assets/vitamia.png)] bg-cover bg-no-repeat bg-center shadow-lg"></div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Vitamia</p>
        <p className="text-stone-600 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
          risus enim. Donec vel risus enim. Donec vel risus enim. Donec vel
          risus enim.
        </p>
        <div className="flex justify-between gap-4 items-center mt-2">
          <div className="flex items-center gap-2 py-2">li li</div>
          <button className="bg-[#087EA4] px-4 py-2 text-white hidden group-hover:flex items-center gap-2 cursor-pointer">
            <p>Abrir</p>
            <ArrowUpRight width={20}></ArrowUpRight>
          </button>
        </div>
      </div>
    </div>
  );
}