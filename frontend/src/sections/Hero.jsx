import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Rocket } from "lucide-react";
import { CopyCA } from "../components/CopyCA";
import { Roadster } from "../components/Roadster";
import { SITE } from "../config/siteConfig";

const MARS_BG =
  "https://images.pexels.com/photos/8474500/pexels-photo-8474500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920";
const STARS_BG =
  "https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      data-testid="hero-section"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-32 pt-28"
    >
      {/* layered background: stars above, mars surface below */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${STARS_BG})` }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] bg-cover bg-center"
          style={{
            backgroundImage: `url(${MARS_BG})`,
            filter: "saturate(1.4) hue-rotate(-15deg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#050505]" />
      </motion.div>

      {/* car flyby every few seconds */}
      <motion.div
        data-testid="hero-flyby-car"
        className="pointer-events-none absolute top-[22%] w-64 sm:w-96"
        initial={{ x: "-40vw", rotate: 6 }}
        animate={{ x: "120vw", rotate: -4 }}
        transition={{ duration: 4.5, ease: "easeIn", repeat: Infinity, repeatDelay: 7, delay: 2 }}
      >
        <Roadster className="w-full opacity-90 drop-shadow-[0_0_30px_rgba(255,59,48,0.55)]" />
      </motion.div>

      <motion.div className="relative z-10 flex flex-col items-center gap-8 text-center" style={{ opacity: fade }}>
        <span
          data-testid="hero-eyebrow"
          className="rounded-full border border-neon/30 bg-neon/10 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.35em] text-neon sm:text-xs"
        >
          Flying Tesla Roadster — launching on pump.fun
        </span>

        <h1
          data-testid="hero-headline"
          className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl"
        >
          <span className="text-mars-red text-glow-red">MARSter:</span>{" "}
          <span className="text-white">the only car with</span>{" "}
          <span className="text-neon text-glow-cyan">gas fees</span>{" "}
          <span className="text-white">on Mars</span>
        </h1>

        <p
          data-testid="hero-subline"
          className="max-w-xl font-mono text-sm leading-relaxed text-white/70 sm:text-lg"
        >
          Leaving humans behind. Next stop: Mars. No seatbelts, no roadmap meetings, no gas fees.
        </p>

        <CopyCA />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            data-testid="hero-buy-button"
            href={SITE.links.pumpfun}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-mars-red px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-[box-shadow,transform] duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(255,59,48,0.7)]"
          >
            <Rocket className="h-4 w-4" />
            Buy on pump.fun
          </a>
          <a
            data-testid="hero-lore-button"
            href="#lore"
            className="rounded-full border border-white/20 px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-white/80 transition-colors duration-300 hover:border-neon hover:text-neon"
          >
            Read the lore
          </a>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-24 z-10 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <ArrowDown className="h-6 w-6" data-testid="hero-scroll-indicator" />
      </motion.div>
    </section>
  );
};

export default Hero;
