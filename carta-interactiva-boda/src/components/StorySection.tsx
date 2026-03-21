"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface StorySectionProps {
  id?: string;
  chapter: string;
  title: string;
  image: string;
  date: string;
  description: string;
  reverse?: boolean;
}

const StorySection: React.FC<StorySectionProps> = ({
  id,
  chapter,
  title,
  image,
  date,
  description,
  reverse = false,
}) => {
  return (
    <section
      id={id}
      className={`py-20 px-8 flex flex-col items-center bg-surface relative overflow-hidden overflow-y-visible ${reverse ? "bg-surface-low" : "bg-surface"}`}
    >
      {/* Background card for Image */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-[400px] mb-12 relative"
      >
        <div className="absolute -inset-x-2 -inset-y-2 bg-white shadow-ambient rounded-3xl z-0" />
        <div className="relative z-10 p-4">
          <div className="relative rounded-2xl overflow-hidden aspect-square shadow-sm">
            <Image src={image} alt={title} fill className="object-cover" />
            {/* Date Pill Overlay */}
            <div
              className={`absolute ${reverse ? "top-6 left-6" : "bottom-6 right-6"} z-20`}
            >
              <div className="bg-surface/80 backdrop-blur-md px-4 py-2 rounded-xl border border-outline-variant-custom/10 text-primary-custom font-serif italic text-sm">
                {date}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chapter & Title */}
      <div
        className={`w-full max-w-[400px] flex flex-col ${reverse ? "items-end text-right" : "items-start text-left"}`}
      >
        <motion.span
          initial={{ x: reverse ? 30 : -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm uppercase tracking-widest text-primary-custom/50 font-sans mb-4"
        >
          {chapter}
        </motion.span>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-3xl leading-snug text-on-surface-custom mb-8 tracking-tight"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-on-surface-custom font-sans leading-relaxed text-lg opacity-80"
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, "<br/>"),
          }}
        />
      </div>
    </section>
  );
};

export default StorySection;
