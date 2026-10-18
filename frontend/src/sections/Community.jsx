import { motion } from "framer-motion";
import { Twitter, Send, Rocket } from "lucide-react";
import { SITE } from "../config/siteConfig";

const SOCIALS = [
  {
    icon: Twitter,
    testid: "community-twitter-link",
    label: "X / Twitter",
    handle: "@FlyingRoadster — placeholder",
    href: SITE.links.twitter,
  },
  {
    icon: Send,
    testid: "community-telegram-link",
    label: "Telegram",
    handle: "t.me/MARSter — placeholder",
    href: SITE.links.telegram,
  },
  {
    icon: Rocket,
    testid: "community-pumpfun-link",
    label: "pump.fun",
    handle: "Token page — placeholder",
    href: SITE.links.pumpfun,
  },
];

const Community = () => (
  <section
    id="community"
    data-testid="community-section"
    className="relative mx-auto max-w-7xl px-4 pb-40 pt-24 sm:px-8 sm:pt-32"
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="mb-16 flex flex-col items-center gap-4 text-center"
    >
      <span className="font-mono text-xs uppercase tracking-[0.35em] text-neon">
        Mission Control
      </span>
      <h2
        data-testid="community-title"
        className="max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl"
      >
        Join the <span className="text-mars-red text-glow-red">mission</span> before
        Earth sells out
      </h2>
    </motion.div>

    <div className="grid gap-6 md:grid-cols-3">
      {SOCIALS.map((s, i) => (
        <motion.a
          key={s.label}
          data-testid={s.testid}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-black/60 p-10 text-center backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 hover:scale-[1.02] hover:border-neon/50 hover:shadow-[0_0_35px_rgba(0,229,255,0.2)]"
        >
          <s.icon className="h-10 w-10 text-neon transition-transform duration-300 group-hover:-translate-y-1" />
          <span className="font-display text-xl font-bold uppercase text-white">{s.label}</span>
          <span className="font-mono text-sm text-white/50">{s.handle}</span>
        </motion.a>
      ))}
    </div>

    <footer data-testid="site-footer" className="mt-24 border-t border-white/10 pt-10">
      <p className="mx-auto max-w-3xl text-center font-mono text-xs leading-relaxed text-white/40">
        $MARSter is a meme coin with zero utility, zero promises, and one Roadster.
        This is a parody project — not affiliated with Tesla, SpaceX, or Elon Musk.
        Nothing here is financial advice. Crypto is risky; only spend what you can
        afford to lose while flying to Mars.
      </p>
      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
        Flying Tesla Roadster — {new Date().getFullYear()} — See you on Mars
      </p>
    </footer>
  </section>
);

export default Community;
