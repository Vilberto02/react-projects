'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const GallerySection: React.FC<{ id?: string }> = ({ id }) => {
  const images = [
    { src: '/assets/boda-imagen-2.jpg', date: 'Agosto 2023', rotate: -3, x: 5, y: 10, tapeRotate: 2 },
    { src: '/assets/boda-imagen-3.jpg', date: 'Enero 2024', rotate: 4, x: 45, y: -20, tapeRotate: -3 },
    { src: '/assets/boda-imagen-4.jpg', date: 'Marzo 2024', rotate: -6, x: 2, y: 30, tapeRotate: -1 },
    { src: '/assets/boda-imagen-5.jpg', date: 'Junio 2024', rotate: 2, x: 52, y: 40, tapeRotate: 4 },
    { src: '/assets/boda-imagen-6.jpg', date: 'Septiembre 2024', rotate: -4, x: 8, y: 20, tapeRotate: -2 },
    { src: '/assets/boda-imagen-7.jpg', date: 'Diciembre 2024', rotate: 5, x: 48, y: 10, tapeRotate: 3 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.8 },
    visible: (custom: number) => ({ 
      y: 0, 
      opacity: 1, 
      scale: 1,
      rotate: custom,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12
      } as const
    })
  };

  return (
    <section id={id} className="py-32 px-6 bg-surface-low flex flex-col items-center relative z-10 overflow-hidden">
      {/* Background Decorative Shadows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-primary-custom/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 -right-20 w-80 h-80 bg-primary-container/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-8 relative z-20"
      >
        <Heart size={36} fill="#7a5642" stroke="#7a5642" strokeWidth={0} />
      </motion.div>

      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="font-serif text-[3rem] leading-tight text-center text-on-surface-custom mb-16 max-w-[300px] relative z-20"
      >
        Pequeños <br /> Grandes Momentos
      </motion.h2>

      {/* Scattered Polaroid Collage */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full max-w-lg min-h-[1100px] mt-10"
      >
        {images.map((img, idx) => (
          <motion.div 
            key={idx}
            custom={img.rotate}
            variants={itemVariants}
            whileHover={{ scale: 1.05, zIndex: 50, transition: { duration: 0.3 } }}
            className="absolute w-[180px] p-3 pb-8 bg-white shadow-xl rounded-sm border border-black/5 cursor-pointer"
            style={{ 
              left: `${img.x}%`, 
              top: `${Math.floor(idx / 2) * 350 + img.y}px`,
              transformOrigin: "center center"
            }}
          >
            {/* Tape Decoration */}
            <div 
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm opacity-60 z-10"
              style={{ rotate: `${img.tapeRotate}deg` }}
            />

            <div className="relative aspect-square overflow-hidden mb-3 bg-surface-highest">
              <Image 
                src={img.src} 
                alt={`Moment ${idx + 1}`} 
                fill 
                className="object-cover" 
              />
            </div>
            
            <div className="text-right pr-1">
              <span className="font-handwritten text-lg text-on-surface-custom/70">
                {img.date}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative Text */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 text-center relative z-20"
      >
        <span className="font-handwritten text-4xl text-primary-custom/40 italic">
          Nuestra Boda 2026
        </span>
      </motion.div>
    </section>
  );
};

export default GallerySection;
