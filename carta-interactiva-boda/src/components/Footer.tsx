"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-24 bg-surface text-center flex flex-col items-center justify-center relative z-20 overflow-hidden">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="font-serif text-[2.5rem] text-primary-custom tracking-tight mb-12"
      >
        Denis y Livbeth
      </motion.h2>

      <div className="flex items-center justify-center gap-10 mb-10 w-full px-8">
        <motion.button
          onClick={() => scrollTo("nuestra-historia")}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[12px] uppercase tracking-[0.2em] text-on-surface-custom/40 font-sans hover:text-primary-custom/80 transition-colors cursor-pointer"
        >
          Nuestra Historia
        </motion.button>
        <motion.button
          onClick={() => scrollTo("galeria")}
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[12px] uppercase tracking-[0.2em] text-on-surface-custom/40 font-sans hover:text-primary-custom/80 transition-colors cursor-pointer"
        >
          Galería de fotos
        </motion.button>
      </div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-[10px] uppercase tracking-[0.3em] font-sans text-on-surface-custom/30"
      >
        Nuestra Boda &copy; 2026
      </motion.div>
    </footer>
  );
};

export default Footer;
