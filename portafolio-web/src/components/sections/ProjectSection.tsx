import { ProjectCard } from "../ProjectCard"
import { Skill } from "../Skill"

const skills = [
  {
    id: 1,
    title: "Desarrollo web",
  },
  {
    id: 2,
    title: "Desarrollo móvil"
  },
  {
    id: 3,
    title: "Prototipo"
  }
]

export function ProjectSection () {
  return (
    <section
      id="project"
      className="min-h-screen px-24 flex flex-col justify-center items-center gap-4 pt-16 pb-12"
    >
      <h3 className="font-header text-6xl">Proyectos</h3>
      <p className="text-stone-600 text-center max-w-4xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
        cupiditate soluta dolore vitae quo.
      </p>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <Skill key={skill.id} title={skill.title}></Skill>
        ))}
      </div>
      <div className="grid grid-cols-3 mt-12 border-l border-t border-black">
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
      </div>
    </section>
  );
}