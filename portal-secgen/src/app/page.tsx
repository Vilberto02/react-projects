import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <> 
      {
        /**
         * Cabecera de la página web
         */
      }
      <Navbar></Navbar>
      {
        /**
         * Portada inicial
         */
      }
      <section
        id="inicio"
        className="flex min-h-screen items-end justify-center font-sans dark:bg-black px-4 md:px-8 lg:px-10 xl:px-36 pb-4 md:pb-8 lg:pb-12 xl:pb-16"
      >
        <div className="flex flex-col gap-3 w-full">
          <div className="px-2 py-1 bg-[#5F2820]/80 rounded-lg w-fit">
            <p className="text-sm uppercase text-[#DCA747] font-semibold ">
              UNMSM
            </p>
          </div>
          <h3 className="font-bold text-4xl">
            Fomentamos la excelencia y el servicio en nuestra gestión académica
            y administrativa.
          </h3>
          <p className="text-sm">
            Somos el órgano central que gestiona tus trámites académicos, emite
            tus grados y títulos, y custodia la historia documental de la
            universidad. Estamos aquí para asegurar que tus procesos sean ágiles
            y transparentes.
          </p>
        </div>
      </section>
      {
        /**
         * Nosotros
         */
      }
      <section
        id="nosotros"
        className="bg-[#FBF6ED] min-h-screen py-20 flex flex-col gap-12 items-center justify-center px-4 md:px-8 lg:px-10 xl:px-36"
      >
        <h3 className="text-4xl text-[#5F2820] font-bold text-center">
          Conoce sobre nosotros.
        </h3>
        <div className="flex flex-col xl:flex-row items-center justify-between gap-24">
          <div className="flex flex-col gap-8">
            <h4 className="text-3xl font-bold">Misión.</h4>
            <div className="space-y-2 text-[#4B4B4B]">
              <p>
                La Secretaría General realiza tareas específicas y cumple
                deberes y responsabilidades como:
              </p>
              <ul className="list-disc pl-4">
                <li>
                  Elaboración de las <strong>Resoluciones Rectorales.</strong>
                </li>
                <li>Gestión documental.</li>
                <li>
                  Archivos de los{" "}
                  <strong>Procedimientos Académicos y Administrativos.</strong>
                </li>
                <li>
                  Acuerdos de la{" "}
                  <strong>
                    Asamblea Universitaria y del Consejo Universitario.
                  </strong>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-2 border-[#7F352A] aspect-square w-72 h-72 md:w-100 md:h-100 rounded-2xl"></div>
        </div>
      </section>
      {
        /**
         * Visión
         */
      }
    </>
  );
}
