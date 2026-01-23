import { Skill } from "../Skill";
import Github from "../../assets/github_light.svg";
import Linkedln from "../../assets/linkedin.svg";
import Gmail from "../../assets/gmail.svg";

const skills: {id: number, title: string}[] = [
  {
    id: 1,
    title: "Figma",
  },
  {
    id: 2,
    title: "React",
  },
  {
    id: 3,
    title: "Typescript",
  },
  {
    id: 4,
    title: "Git",
  },
  {
    id: 5,
    title: "Next.js"
  },
  {
    id: 6,
    title: "TailwindCSS"
  },
  {
    id: 7,
    title: "React Native"
  }
];

export function HomeSection() {

  return (
    <section id="home" className="w-full flex">
      <div className="flex flex-col justify-center gap-8 w-1/2 mt-16 pl-44">
        <div className="flex flex-col gap-6 pr-2">
          <h1 className="font-header text-7xl font-bold">
            Hola 👋, <br />
            soy Vilberto.
          </h1>
          <p>
            Me especializo en diseño web y móvil, con experiencia en diseño
            responsivo, UX/UI y desarrollo de interfaces de usuario.
          </p>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill: { id: number; title: string }) => {
              return <Skill key={skill.id} title={skill.title}></Skill>;
            })}
          </div>
        </div>
        <div className="flex gap-4 items-center mt-24">
          <img src={Github} alt="Logo de GitHub" width={36} height={36} />
          <img src={Linkedln} alt="Logo de Linkedln" width={36} height={36} />
          <img src={Gmail} alt="Logo de Gmail" width={36} height={36} />
        </div>
      </div>
      <div className="bg-stone-50 h-screen w-1/2 flex justify-center items-center">
        <div className="w-121 aspect-square bg-[url(./assets/person.jpg)] bg-cover bg-no-repeat bg-center bg-image-shadow"></div>
      </div>
    </section>
  );
}
