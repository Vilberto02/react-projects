"use client";

import MusicPlayer from "@/components/MusicPlayer";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import GallerySection from "@/components/GallerySection";
import LetterSection from "@/components/LetterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="mobile-container bg-surface overflow-x-hidden">
      <MusicPlayer />

      <Hero />

      <StorySection
        id="nuestra-historia"
        chapter="CAPITULO UNO"
        title="Donde Todo Comenzó"
        image="/boda/boda-1.jpg"
        date="2017"
        description="A veces, los grandes amores no empiezan con certezas, sino con pequeños encuentros que cambian todo sin avisar. Una conversación, una sonrisa, un instante... y de pronto, dos caminos se convierten en uno. Lo que comenzó como algo simple, hoy es una historia que inspira, una historia que demuestra que el amor verdadero siempre encuentra su momento."
      />

      <StorySection
        chapter="CAPITULO DOS"
        title="La Promesa"
        image="/boda/boda-2.jpg"
        date="2026"
        description="El amor crece en los detalles, en los silencios compartidos, en las decisiones que se toman con el corazón. Y llega un día en que ya no basta con sentirlo... hay que prometerlo. Prometer quedarse, construir, soñar juntos. Ese instante no solo marcó un 'sí', marcó el inicio de una vida elegida todos los días."
        reverse
      />

      <GallerySection id="galeria" />

      <LetterSection />

      <Footer />
    </main>
  );
}
