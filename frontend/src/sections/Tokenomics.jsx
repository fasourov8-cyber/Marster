import { motion } from "framer-motion";
import { Coins, Flame, Fuel, FileText } from "lucide-react";
import { CopyCA } from "../components/CopyCA";

const CARDS = [
  {
    icon: Coins,
    testid: "tokenomics-supply-card",
    title: "Supply",
    value: "1,000,000,000",
    note: "$MARSter — one for every mile to Mars (placeholder)",
    accent: "text-neon",
  },
  {
    icon: Fuel,
    testid: "tokenomics-tax-card",
    title: "Tax",
    value: "0%",
    note: "No gas fees on Mars. Obviously. (placeholder)",
    accent: "text-mars-red",
  },
  {
    icon: Flame,
    testid: "tokenomics-lp-card",
    title: "Liquidity",
    value: "Burned",
    note: "LP torched at launch — details at launch (placeholder)",
    accent: "text-neon",
  },
  {
    icon: FileText,
    testid: "tokenomics-renounce-card",
    title: "Ownership",
    value: "Renounced",
    note: "Keys thrown out the window. In space. (placeholder)",
    accent: "text-mars-red",
  },
];

const Tokenomics = () => (
  <section
    id="tokenomics"
    data-testid="tokenomics-section"
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
        Fuel Specs
      </span>
      <h2
        data-testid="tokenomics-title"
        className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl"
      >
        Token<span className="text-mars-red text-glow-red">omics</span>
      </h2>
    </motion.div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((c, i) => (
        <motion.div
          key={c.title}
          data-testid={c.testid}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-neon/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
        >
          <c.icon className={`h-8 w-8 ${c.accent}`} />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
            {c.title}
          </span>
          <span className={`font-display text-3xl font-black uppercase ${c.accent}`}>
            {c.value}
          </span>
          <span className="font-mono text-sm leading-relaxed text-white/60">{c.note}</span>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12 flex justify-center"
    >
      <CopyCA />
    </motion.div>
  </section>
);

export default Tokenomics;
