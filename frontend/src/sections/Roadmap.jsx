import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader } from "lucide-react";

const PHASES = [
  {
    testid: "roadmap-phase-1",
    phase: "Phase 1",
    title: "Leave Earth",
    desc: "Launch on pump.fun. Wake the degens. Humans start crying.",
    status: "done",
  },
  {
    testid: "roadmap-phase-2",
    phase: "Phase 2",
    title: "Orbit & Chill",
    desc: "Community takeover. Memes everywhere. Starman waves from the window.",
    status: "done",
  },
  {
    testid: "roadmap-phase-3",
    phase: "Phase 3",
    title: "Mars Landing",
    desc: "Touchdown on the red planet. Roads of Mars open for traffic.",
    status: "current",
  },
  {
    testid: "roadmap-phase-4",
    phase: "Phase 4",
    title: "Elon Notices",
    desc: "One tweet. That's the whole phase. You know what happens next.",
    status: "upcoming",
  },
];

const STATUS_ICON = {
  done: <CheckCircle2 className="h-6 w-6 text-neon" />,
  current: <Loader className="h-6 w-6 animate-spin text-mars-red" />,
  upcoming: <Circle className="h-6 w-6 text-white/30" />,
};

const Roadmap = () => (
  <section
    id="roadmap"
    data-testid="roadmap-section"
    className="relative mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32"
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="mb-16 flex flex-col gap-4"
    >
      <span className="font-mono text-xs uppercase tracking-[0.35em] text-neon">
        Flight Plan
      </span>
      <h2
        data-testid="roadmap-title"
        className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl"
      >
        Roadmap to <span className="text-mars-red text-glow-red">Mars</span>
      </h2>
    </motion.div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {PHASES.map((p, i) => (
        <motion.div
          key={p.phase}
          data-testid={p.testid}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.12 }}
          className={`relative flex flex-col gap-4 rounded-2xl border p-8 backdrop-blur-xl transition-[box-shadow] duration-300 ${
            p.status === "current"
              ? "border-mars-red/60 bg-mars-red/10 shadow-[0_0_35px_rgba(255,59,48,0.2)]"
              : "border-white/10 bg-black/60 hover:shadow-[0_0_25px_rgba(0,229,255,0.12)]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              {p.phase}
            </span>
            {STATUS_ICON[p.status]}
          </div>
          <h3 className="font-display text-2xl font-bold uppercase text-white">{p.title}</h3>
          <p className="font-mono text-sm leading-relaxed text-white/60">{p.desc}</p>
          {p.status === "current" && (
            <span className="mt-auto font-mono text-[10px] uppercase tracking-[0.3em] text-mars-red">
              ← We are here
            </span>
          )}
        </motion.div>
      ))}
    </div>
  </section>
);

export default Roadmap;
