# Flying Tesla Roadster ($MARSter) — Meme Coin Landing Page

## Original Problem Statement
"ok skip i want to create a meme project on **Flying Tesla Roadster**. my meme like the MARSter. the **FlyingTeslaRoadster** running on the Mars. some meme will be craing human and flying to the marrs. for the website i want the car flying and sperending gas before open the wesite and after that full website need to be looks as mars planed and rhe roadman should be the road of mars and the car running animation. overall a very modren web and totally animated and fun ... i want to launch on pump.fun i'll give you social links and i and to cauth elon musk eyes"

## Discovery Answers (2026-10-18)
- Main job: Send people to buy on pump.fun
- Audience: meme coin degens + Elon/Tesla fans + crypto Twitter
- Hero headline (verbatim): "MARSter: the only car with gas fees on Mars"
- Links: placeholders for now (pump.fun, X, Telegram, contract address)
- Primary action: Copy contract address

## Architecture
- Frontend-only React SPA (CRA + Tailwind + framer-motion + react-fast-marquee + sonner). Backend left as stock health endpoint (no data needs yet).
- Design: dark space/Mars theme, Unbounded display font + Space Mono body, mars-red #FF3B30 + neon cyan #00E5FF accents. Guidelines in /app/design_guidelines.json (classic path — user skipped design directions).
- Key files: src/App.js, src/config/siteConfig.js (ALL placeholder links + CA live here — single swap point), src/components/{Roadster,SplashScreen,PersistentCar,CopyCA,TickerMarquee,Nav}.jsx, src/sections/{Hero,Lore,Tokenomics,Roadmap,HowToBuy,Community}.jsx

## Implemented (2026-10-18)
- Animated splash intro: Roadster flies across starfield spreading gas trail, ignition progress bar, skip button
- Mars-themed full site: starfield + Mars surface hero with parallax, repeated car flyby
- Persistent Mars road strip fixed at bottom with bobbing driving car + scrolling road dashes
- Massive copy-CA glass pill (hero + tokenomics) with clipboard fallback + sonner toast; compact CA pill in nav
- Lore (crying humans vs astronaut holders), Tokenomics bento (placeholders), Roadmap Earth→Orbit→Mars→Elon Notices, How to Buy steps, Community/socials (placeholder links), parody/risk disclaimer footer
- Ticker marquees between sections, grain overlay, neon glow hovers, data-testids throughout

## Verified
- Splash → skip → hero flow, copy-CA success toast (incl. execCommand fallback), nav anchors, all sections render, marquee, placeholder hrefs, mobile 390px layout, /api health OK

## Placeholders the user must supply
- pump.fun token URL, X/Twitter URL, Telegram URL, real contract address → all in src/config/siteConfig.js
- Tokenomics numbers (supply/tax/LP/renounce) are labelled placeholders

## Backlog
- P0: Swap real links + CA at launch
- P1: Live price/market-cap widget (dexscreener API) after launch
- P1: Meme gallery section for community memes
- P2: Background music / engine SFX toggle
- P2: Multilingual meme copy
