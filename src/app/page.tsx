import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Footer />
    </div>
  );
}
