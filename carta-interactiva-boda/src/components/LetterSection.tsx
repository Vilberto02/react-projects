'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

const messages = [
  "El amor que hoy celebran es solo el comienzo de algo mucho más grande: la vida compartida, los días simples, los retos inesperados y las pequeñas decisiones que, poco a poco, construyen un hogar.",
  "Habrá momentos fáciles, llenos de risas y complicidad, pero también llegarán días en los que no todo sea tan claro. Y es ahí donde el amor verdadero se fortalece: no en la perfección, sino en la forma en que deciden quedarse, escucharse y entenderse.",
  "Recuerden siempre hablar desde el respeto, escuchar con el corazón abierto y nunca dejar que el orgullo hable más fuerte que el cariño. Porque a veces, una conversación a tiempo puede evitar silencios que pesan.",
  "Que nunca falten los detalles, las palabras sinceras y los abrazos que lo dicen todo sin hablar. Y que, pase lo que pase, siempre recuerden por qué comenzaron: porque en medio de todo, se eligieron... y siguen eligiéndose cada día."
];

const LetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMessage = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const closeLetter = () => {
    setIsOpen(false);
    setCurrentIndex(0);
  };

  return (
    <section className="py-24 bg-surface flex flex-col items-center justify-center overflow-hidden" role="region" aria-label="Carta interactiva para los novios">
      <div className="relative w-full max-w-[450px] aspect-4/5 flex items-center justify-center perspective-1000">
        
        {/* Background Card (The Message) */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div 
              key={currentIndex}
              role="dialog"
              aria-modal="true"
              aria-labelledby="letter-title"
              initial={{ scale: 0.8, y: 0, opacity: 0 }}
              animate={{ scale: 1, y: 20, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50 && currentIndex < messages.length - 1) {
                  nextMessage();
                }
              }}
              className="absolute z-20 w-[90%] bg-white shadow-2xl rounded-2xl p-10 flex flex-col items-center text-center cursor-grab active:cursor-grabbing border border-outline-variant-custom/10 touch-action-pan-y"
            >
              <div className="w-full text-right mb-4" aria-live="polite">
                <span className="text-xs font-sans font-bold text-primary-custom/40 tracking-tighter" aria-label={`Mensaje ${currentIndex + 1} de ${messages.length}`}>
                  {currentIndex + 1} / {messages.length}
                </span>
              </div>
              
              <h3 id="letter-title" className="font-serif italic text-2xl text-on-surface-custom mb-8">
                Un mensaje para ustedes:
              </h3>
              
              <p className="font-sans text-base leading-relaxed text-on-surface-custom/80 mb-10 min-h-[160px]">
                {messages[currentIndex]}
              </p>

              {currentIndex === messages.length - 1 ? (
                <button 
                  onClick={closeLetter}
                  aria-label="Cerrar carta"
                  className="mt-4 px-8 py-3 rounded-full bg-primary-custom text-white font-serif text-sm tracking-widest hover:scale-105 active:scale-95 transition-transform"
                >
                  CERRAR CARTA
                </button>
              ) : (
                <div className="mt-4 flex flex-col items-center gap-2" aria-hidden="true">
                    <span className="text-[10px] uppercase tracking-widest text-primary-custom/30 font-bold">Deslizar para seguir leyendo</span>
                    <motion.div 
                        animate={{ x: [0, 10, 0] }} 
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-8 h-px bg-primary-custom/30"
                    />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Envelope / Main Image */}
        <motion.div 
          layout
          onClick={() => !isOpen && setIsOpen(true)}
          initial={false}
          animate={{ 
            scale: isOpen ? 0.85 : 1, 
            y: isOpen ? -180 : 0,
            rotateX: isOpen ? 10 : 0,
            filter: isOpen ? "blur(4px) brightness(0.9)" : "blur(0px) brightness(1)",
            zIndex: isOpen ? 10 : 30
          }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className={`relative w-[85%] aspect-4/3 rounded-3xl overflow-hidden shadow-ambient group ${!isOpen ? 'cursor-pointer hover:scale-[1.02]' : ''} touch-action-manipulation`}
          role="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Imagen de portada desplazada" : "Tocar para abrir carta interactiva"}
        >
          <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" aria-hidden="true" />
          <Image 
            src="/assets/boda-imagen-7.jpg" 
            alt="Anillos de boda - Portada de la carta" 
            fill 
            className="object-cover"
          />
          {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
                    <span className="font-serif text-primary-custom italic text-sm">Tocar para leer</span>
                </div>
            </div>
          )}
          {isOpen && (
            <button 
                onClick={(e) => { e.stopPropagation(); closeLetter(); }}
                aria-label="Cerrar carta"
                className="absolute top-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors cursor-pointer"
            >
                <X size={20} />
            </button>
          )}
        </motion.div>

        {/* Bottom Decorative Element (Leaves/Shadows) */}
        {!isOpen && (
             <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="absolute -bottom-10 z-0 opacity-10 blur-xl w-64 h-32 bg-primary-custom rounded-full"
             aria-hidden="true"
           />
        )}
      </div>
    </section>
  );
};

export default LetterSection;
