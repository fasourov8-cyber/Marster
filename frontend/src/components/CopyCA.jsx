import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { SITE } from "../config/siteConfig";

export const CopyCA = ({ compact = false }) => {
  const [copied, setCopied] = useState(false);
  const ca = SITE.contractAddress;
  const short = `${ca.slice(0, 8)}…${ca.slice(-6)}`;

  const copy = async () => {
    let ok = true;
    try {
      await navigator.clipboard.writeText(ca);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = ca;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      toast.success("Contract address copied — see you on Mars");
      setTimeout(() => setCopied(false), 2200);
    } else {
      toast.error("Copy failed — long-press the CA instead");
    }
  };

  if (compact) {
    return (
      <button
        data-testid="copy-ca-compact-button"
        onClick={copy}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-neon backdrop-blur-xl transition-[box-shadow,transform] duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        CA {short}
      </button>
    );
  }

  return (
    <button
      data-testid="copy-ca-button"
      onClick={copy}
      className="group relative flex w-full max-w-xl items-center justify-between gap-4 rounded-2xl border border-neon/40 bg-black/60 px-6 py-5 font-mono backdrop-blur-xl transition-[box-shadow,transform,border-color] duration-300 hover:scale-[1.02] hover:border-neon hover:shadow-[0_0_45px_rgba(0,229,255,0.35)] sm:px-8 sm:py-6"
    >
      <span className="flex flex-col items-start gap-1 text-left">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          Contract Address — placeholder
        </span>
        <span data-testid="contract-address-text" className="break-all text-sm font-bold text-neon text-glow-cyan sm:text-lg">
          {ca}
        </span>
      </span>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon/10 text-neon transition-colors duration-300 group-hover:bg-neon group-hover:text-black">
        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
      </span>
    </button>
  );
};
