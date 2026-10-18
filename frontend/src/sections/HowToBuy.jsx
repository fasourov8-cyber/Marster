import { motion } from "framer-motion";
import { Wallet, Coins, MousePointerClick, Rocket } from "lucide-react";
import { SITE } from "../config/siteConfig";

const STEPS = [
  {
    icon: Coins,
    testid: "how-to-buy-step-1",
    step: "01",
    title: "Get SOL",
    desc: "Grab some SOL from any exchange and send it to your wallet.",
  },
  {
    icon: Wallet,
    testid: "how-to-buy-step-2",
    step: "02",
    title: "Load a wallet",
    desc: "Phantom or Solflare. Buckle it in. Helmet on.",
  },
  {
    icon: MousePointerClick,
    testid: "how-to-buy-step-3",
    step: "03",
    title: "Ape on pump.fun",
    desc: "Paste the CA, smash buy, ignore the crying humans.",
  },
  {
    icon: Rocket,
    testid: "how-to-buy-step-4",
    step: "04",
    title: "Ride to Mars",
    desc: "Hold tight. The Roadster doesn't have brakes. Or a reverse gear.",
  },
];

const HowToBuy = () => (
  <section
    id="how-to-buy"
    data-testid="how-to-buy-section"
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
        Boarding Pass
      </span>
      <h2
        data-testid="how-to-buy-title"
        className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl"
      >
        How to <span className="text-neon text-glow-cyan">board</span>
      </h2>
    </motion.div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((s, i) => (
        <motion.div
          key={s.step}
          data-testid={s.testid}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-mars-red/50 hover:shadow-[0_0_30px_rgba(255,59,48,0.15)]"
        >
          <span className="absolute -right-2 -top-4 font-display text-7xl font-black text-white/5 transition-colors duration-300 group-hover:text-mars-red/10">
            {s.step}
          </span>
          <s.icon className="h-8 w-8 text-neon" />
          <h3 className="font-display text-xl font-bold uppercase text-white">{s.title}</h3>
          <p className="font-mono text-sm leading-relaxed text-white/60">{s.desc}</p>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-14 flex justify-center"
    >
      <a
        data-testid="how-to-buy-cta-button"
        href={SITE.links.pumpfun}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-full bg-mars-red px-10 py-5 font-display text-base font-bold uppercase tracking-widest text-white transition-[box-shadow,transform] duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,59,48,0.7)]"
      >
        <Rocket className="h-5 w-5" />
        Buy $MARSter on pump.fun
      </a>
    </motion.div>
  </section>
);

export default HowToBuy;
