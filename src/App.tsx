import { About } from "./components/About";
import { Contact, FinalCTA, Location } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer, FloatingCTA } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Menu } from "./components/Menu";

export default function App() {
  return (
    <>
      <a href="#conteudo" className="sr-only z-[70] bg-gold px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-2 focus:top-2">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Experience />
        <Contact />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
