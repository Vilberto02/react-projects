import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { AboutSection } from "./components/sections/AboutSection";
import { HomeSection } from "./components/sections/HomeSection";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HomeSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
