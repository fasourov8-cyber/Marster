import { Rocket } from "lucide-react";
import { CopyCA } from "./CopyCA";
import { SITE } from "../config/siteConfig";

const LINKS = [
  { label: "Lore", href: "#lore", testid: "nav-link-lore" },
  { label: "Tokenomics", href: "#tokenomics", testid: "nav-link-tokenomics" },
  { label: "Roadmap", href: "#roadmap", testid: "nav-link-roadmap" },
  { label: "How to Buy", href: "#how-to-buy", testid: "nav-link-how-to-buy" },
];

const Nav = () => (
  <header
    data-testid="site-nav"
    className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl"
  >
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
      <a data-testid="nav-logo" href="#top" className="flex items-center gap-2">
        <Rocket className="h-5 w-5 text-mars-red" />
        <span className="font-display text-sm font-black uppercase tracking-widest text-white sm:text-base">
          MARS<span className="text-mars-red">ter</span>
        </span>
      </a>

      <nav className="hidden items-center gap-7 lg:flex">
        {LINKS.map((l) => (
          <a
            key={l.href}
            data-testid={l.testid}
            href={l.href}
            className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:text-neon"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <CopyCA compact />
        </div>
        <a
          data-testid="nav-buy-button"
          href={SITE.links.pumpfun}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-mars-red px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-white transition-[box-shadow,transform] duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,59,48,0.6)]"
        >
          Buy
        </a>
      </div>
    </div>
  </header>
);

export default Nav;
