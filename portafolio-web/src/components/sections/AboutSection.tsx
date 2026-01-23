export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen px-24 flex flex-col gap-16 justify-center items-center"
    >
      <h3 className="font-header text-6xl">Sobre mí</h3>
      <div className="flex gap-24 items-center">
        <div className="aspect-3/4 w-80 bg-[url(./assets/people.jpg)] bg-cover bg-no-repeat bg-center bg-image-shadow"></div>
        <div className="space-y-6 max-w-xl">
          <p className="font-header text-3xl">
            Diseñador UI/UX & Desarrollador Front-End
          </p>
          <p>
            Durante los últimos años, he trabajado en diversas áreas del diseño
            digital, incluyendo desarrollo front-end y UI/UX de aplicaciones
            móviles. He tenido la oportunidad de trabajar con equipos para
            desarrollar MVP y he sido parte del diseño de los prototipos.{" "}
          </p>
        </div>
      </div>
    </section>
  );
}
