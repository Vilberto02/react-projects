import React from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { useMusic } from "@/context/MusicContext";

const MusicPlayer: React.FC = () => {
  const { isPlaying, progress, togglePlay } = useMusic();

  return (
    <>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface-highest z-100" aria-hidden="true">
        <motion.div
          className="h-full bg-primary-container"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Music Control Pill - Bottom */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-50 px-6 py-4 bg-surface/90 backdrop-blur-xl rounded-full shadow-ambient border border-outline-variant-custom/10 flex items-center gap-4"
        role="complementary"
        aria-label="Reproductor de música"
      >
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-primary-custom flex items-center justify-center text-white shrink-0 hover:scale-105 transition-transform cursor-pointer"
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} className="ml-1" fill="currentColor" />
          )}
        </button>

        <div className="flex flex-col overflow-hidden">
          <span className="text-[10px] uppercase tracking-widest text-primary-custom/60 font-medium">
            Estas escuchando
          </span>
          <span className="text-sm font-serif text-on-surface-custom truncate" role="text">
            Un pacto con dios — Rabito (Juan Fernandez)
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
