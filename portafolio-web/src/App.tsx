import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { AboutSection } from "./components/sections/AboutSection";
import { HomeSection } from "./components/sections/HomeSection";
import { ProjectSection } from "./components/sections/ProjectSection";
import { SkillSection } from "./components/sections/SkillSection";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HomeSection />
        <AboutSection />
        <SkillSection />
        <ProjectSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
