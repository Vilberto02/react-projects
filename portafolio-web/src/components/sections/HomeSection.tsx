import { Code, Globe, LayoutDashboard, TabletSmartphone } from "lucide-react";
import { Skill } from "../Skill";
import { useState } from "react";
import Illustration from "../../assets/illustration.svg";
import BgIllustration from "../../assets/bg-illustration.svg";

const skills = [
  {
    title: "Web designer",
    Icon: Globe,
    isActive: true,
  },
  {
    title: "Mobile designer",
    Icon: TabletSmartphone,
    isActive: false,
  },
  {
    title: "Responsive design",
    Icon: LayoutDashboard,
    isActive: false,
  },
  {
    title: "Frontend developer",
    Icon: Code,
    isActive: false,
  },
];

export function HomeSection() {
  const [isActiveSkill, setIsActiveSkill] = useState<string>("Web designer");

  return (
    <section id="home" className="w-full flex">
      <div className="flex flex-col justify-center items-center gap-12 w-1/2 mt-16">
        <h1 className="text-7xl font-bold">
          Vilberto <br />
          Patricio Julca
        </h1>
        <div className="w-sm">
          <div className="flex flex-col gap-4 ">
            {skills.map((skill) => (
              <Skill
                key={skill.title}
                title={skill.title}
                Icon={skill.Icon}
                isActive={skill.title === isActiveSkill}
                onClick={() => setIsActiveSkill(skill.title)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-stone-100 h-screen w-1/2 border-t-6 border-red-500 flex justify-center items-center">
        <div className="relative">
          <img
            src={BgIllustration}
            alt="Paso de brocha"
            className="opacity-30"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src={Illustration} width={384} alt="Ilustracion" />
          </div>
        </div>
      </div>
    </section>
  );
}
