import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Roadster } from "./Roadster";

const SplashScreen = ({ onDone }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 4200);
    return () => clearTimeout(t);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          data-testid="splash-screen"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* starfield */}
          {stars.map((s) => (
            <span
              key={s.id}
              className="absolute animate-twinkle rounded-full bg-white"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}

          {/* flying roadster + gas trail */}
          <motion.div
            data-testid="splash-car"
            className="absolute w-[440px] max-w-[75vw]"
            initial={{ x: "-70vw", y: "22vh", rotate: 10 }}
            animate={{ x: "115vw", y: "-32vh", rotate: -8 }}
            transition={{ duration: 2.9, ease: "easeIn", delay: 0.5 }}
          >
            <div className="relative">
              <Roadster className="w-full drop-shadow-[0_0_40px_rgba(255,59,48,0.65)]" />
              {/* gas trail blobs */}
              <motion.span
                className="absolute -left-16 top-1/2 h-10 w-24 -translate-y-1/2 rounded-full bg-mars-red/40 blur-2xl"
                animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.8, 1.4, 0.8] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.span
                className="absolute -left-32 top-1/2 h-8 w-28 -translate-y-1/2 rounded-full bg-neon/30 blur-2xl"
                animate={{ opacity: [0.1, 0.6, 0.1], scaleX: [0.7, 1.5, 0.7] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: 0.15 }}
              />
            </div>
          </motion.div>

          {/* ignition text */}
          <motion.div
            className="absolute bottom-20 flex flex-col items-center gap-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-neon text-glow-cyan">
              Ignition sequence
            </span>
            <span className="font-display text-2xl font-black uppercase tracking-tight text-white sm:text-4xl">
              $MARSter<span className="text-mars-red text-glow-red"> is launching</span>
            </span>
            <motion.span
              className="h-1 w-48 rounded-full bg-white/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3, ease: "linear", delay: 0.6 }}
              style={{ transformOrigin: "left" }}
            >
              <motion.span className="block h-full w-full rounded-full bg-gradient-to-r from-mars-red to-neon" />
            </motion.span>
          </motion.div>

          <button
            data-testid="splash-skip-button"
            onClick={() => setShow(false)}
            className="absolute right-6 top-6 rounded-full border border-white/20 px-5 py-2 font-mono text-xs uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 hover:border-neon hover:text-neon"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
