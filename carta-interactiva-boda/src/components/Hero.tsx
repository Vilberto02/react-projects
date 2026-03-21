"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Volume2, VolumeX, ChevronDown } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

const Hero: React.FC = () => {
  const { isMuted, toggleMute } = useMusic();

  const scrollToHistory = () => {
    const element = document.getElementById("nuestra-historia");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-between py-20 bg-surface overflow-hidden">
      {/* Top Navigation Overlay */}
      <nav className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-10 z-40 bg-surface/5 backdrop-blur-sm">
        <BookOpen size={20} className="text-on-surface-custom/60" aria-hidden="true" />
        <span className="font-serif text-lg italic text-primary-custom" role="text">
          Denis y Lizbeth
        </span>
        <button 
          onClick={toggleMute} 
          className="p-2 transition-transform active:scale-95 cursor-pointer"
          aria-label={isMuted ? "Activar música" : "Silenciar música"}
        >
          {isMuted ? (
            <VolumeX size={20} className="text-primary-custom" />
          ) : (
            <Volume2 size={20} className="text-on-surface-custom/60" />
          )}
        </button>
      </nav>

      {/* Background with Fade In */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-white/20 z-10" />
        <Image
          src="/assets/boda-fondo.avif"
          alt="Wedding background"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Bottom vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent opacity-80 z-10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-8 w-full mt-20">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-[3.5rem] leading-tight text-on-surface-custom mb-6 drop-shadow-sm"
        >
          Denis y Lizbeth
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg leading-relaxed text-on-surface-custom/80 font-sans max-w-[320px] mb-12"
        >
          Algunas historias no solo se cuentan... <br /> se sienten. <br />
          <span className="italic mt-2 block font-serif">
            &quot;Hoy queremos compartir una con ustedes.&quot;
          </span>
        </motion.p>

        <motion.button
          onClick={scrollToHistory}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="satin-gradient text-white px-10 py-4 rounded-full font-serif text-sm tracking-[0.2em] uppercase shadow-lg shadow-primary-custom/20 mb-20 cursor-pointer"
        >
          COMENZAR
        </motion.button>
      </div>

      {/* Bottom Content (Rings) */}
      <div className="relative z-20 w-full px-12 pb-16">
        <button
          onClick={scrollToHistory}
          className="mx-auto block p-4 transition-transform hover:scale-110 active:scale-90 cursor-pointer"
        >
          <ChevronDown
            size={32}
            className="text-on-surface-custom/30 animate-bounce"
          />
        </button>
      </div>
    </section>
  );
};

export default Hero;
