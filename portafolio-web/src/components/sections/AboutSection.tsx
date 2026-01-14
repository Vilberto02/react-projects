export function AboutSection() {
  return (
    <section id="about" className="h-screen max-w-7xl mx-auto mt-24">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 max-w-md">
          <div className="p-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="text-sm">Estudiante de Ingeniería de Software</p>
          </div>
          <h2 className="text-6xl font-bold">Sobre mí</h2>
          <p className="mt-4 text-stone-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
            veritatis ipsa est velit alias iusto doloribus magni pariatur
            provident.
          </p>
        </div>
        <div className="max-w-xl">
          <div className="flex flex-col gap-4 ">
            <p className="font-medium italic">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              quibusdam pariatur beatae odit eveniet doloremque dignissimos
              sunt."
            </p>
            <p className="text-stone-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. In quia
              facilis eligendi incidunt neque ex minus iure voluptatum. Earum
              adipisci porro dignissimos.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 w-full">
        <h3 className="text-center">Mis intereses</h3>
        <div className="flex justify-center gap-16 w-full mt-8">
          <div className="aspect-square w-2xs bg-red-300"></div>
          <div className="aspect-square w-2xs bg-orange-300"></div>
          <div className="aspect-square w-2xs bg-purple-300"></div>
        </div>
      </div>
    </section>
  );
}
