import { useEffect, useRef, useState } from "react";
import "./styles/marster.css";

/* ---- Edit these when the token is live ---- */
const CFG = {
  ticker: "$FTR",
  ca: "",
  links: [
    { label: "Buy on pump.fun", href: "https://pump.fun", primary: true, testid: "link-pumpfun" },
    { label: "X / Twitter", href: "", testid: "link-twitter" },
    { label: "Telegram", href: "", testid: "link-telegram" },
  ],
};

export default function MarsterPage() {
  const [introGone, setIntroGone] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    document.title = "FlyingTeslaRoadster";
    const root = rootRef.current;
    if (!root) return undefined;
    const $ = (id) => root.querySelector(`#${id}`);
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];
    let gone = false;

    /* ---- car artwork ---- */
    function carInner(flame) {
      return (flame ? '<g class="flame"><path d="M12 60 L-62 70 L12 80 Z" fill="#ff7a1a"/><path d="M12 64 L-34 70 L12 76 Z" fill="#ffd23f"/></g>' : '') +
        '<path d="M8 72 L-4 50 L28 58 Z" fill="#c42a18"/>' +
        '<circle cx="70" cy="84" r="25" fill="#1f0e0a"/><circle cx="232" cy="84" r="25" fill="#1f0e0a"/>' +
        '<path d="M8 72 C8 62 28 58 58 56 L108 52 C128 34 170 30 200 36 L214 52 L268 58 C286 60 292 68 292 76 L292 86 L8 86 Z" fill="#ef3a24"/>' +
        '<path d="M20 72 H280" stroke="#fff" stroke-opacity=".55" stroke-width="3"/>' +
        '<path d="M112 52 C130 38 166 34 196 40 L206 52 Z" fill="#8be9ff" opacity=".9"/>' +
        '<circle cx="156" cy="43" r="11" fill="#fff"/><rect x="157" y="39" width="12" height="8" rx="4" fill="#12081f"/>' +
        '<path d="M284 64 L292 66 L292 73 L282 73 Z" fill="#ffcf3d"/>' +
        '<g class="wheel"><circle cx="70" cy="84" r="20" fill="#2b2b33"/><circle cx="70" cy="84" r="10" fill="#d9d9e3"/><path d="M70 74V94M60 84H80" stroke="#2b2b33" stroke-width="3"/></g>' +
        '<g class="wheel"><circle cx="232" cy="84" r="20" fill="#2b2b33"/><circle cx="232" cy="84" r="10" fill="#d9d9e3"/><path d="M232 74V94M222 84H242" stroke="#2b2b33" stroke-width="3"/></g>';
    }
    const riders = '<g stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none">' +
      '<g class="rider"><circle cx="58" cy="26" r="7" fill="#fff"/><path d="M58 33 V54 M58 38 L48 24 M58 38 L68 24"/></g>' +
      '<g class="rider r2"><circle cx="248" cy="34" r="7" fill="#fff"/><path d="M248 41 V58 M248 45 L238 32 M248 45 L258 32"/></g></g>';
    function carSVG(flame) {
      return '<svg viewBox="-70 0 370 112" role="img" aria-label="Red flying roadster" xmlns="http://www.w3.org/2000/svg">' + carInner(flame) + '</svg>';
    }
    root.querySelectorAll("[data-car]").forEach((el) => {
      if (!el.innerHTML) el.innerHTML = carSVG(el.hasAttribute("data-flame"));
    });
    root.querySelectorAll("[data-car-g]").forEach((g) => {
      if (!g.innerHTML) g.innerHTML = carInner(g.getAttribute("data-flame") === "1") + (g.getAttribute("data-extra") === "riders" ? riders : "");
    });

    /* ---- twinkling stars ---- */
    const starBox = $("stars");
    if (starBox && starBox.childElementCount === 0) {
      for (let i = 0; i < 70; i++) {
        const s = document.createElement("i");
        const sz = 1 + Math.random() * 2;
        s.style.cssText = "left:" + (Math.random() * 100) + "%;top:" + (Math.random() * 100) + "%;width:" + sz + "px;height:" + sz + "px;animation-delay:-" + (Math.random() * 3).toFixed(2) + "s;animation-duration:" + (2 + Math.random() * 3).toFixed(2) + "s";
        starBox.appendChild(s);
      }
    }

    /* ---- ticker: duplicate for a seamless loop ---- */
    const track = $("tickerTrack");
    if (track && !track.dataset.dup) {
      track.innerHTML += track.innerHTML;
      track.dataset.dup = "1";
    }

    /* ---- buttons from CFG ---- */
    function renderLinks(box, withShare) {
      if (!box || box.childElementCount > 0) return;
      CFG.links.forEach((l, i) => {
        let el;
        if (l.href) {
          el = document.createElement("a");
          el.href = l.href; el.target = "_blank"; el.rel = "noopener";
          el.className = "btn" + (l.primary ? "" : " ghost");
          el.textContent = l.label;
        } else {
          el = document.createElement("span");
          el.className = "btn off"; el.setAttribute("aria-disabled", "true");
          el.innerHTML = l.label + " <small>link soon</small>";
        }
        el.setAttribute("data-testid", `${l.testid}-${i}`);
        box.appendChild(el);
      });
      if (withShare) {
        const a = document.createElement("a");
        a.className = "btn ghost"; a.target = "_blank"; a.rel = "noopener";
        a.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("FlyingTeslaRoadster is driving to Mars. Gas spent, no brakes. " + CFG.ticker);
        a.textContent = "Share the flight";
        a.setAttribute("data-testid", "share-flight-button");
        box.appendChild(a);
      }
    }
    const heroBox = $("heroActions");
    if (heroBox && heroBox.childElementCount === 0) {
      const buy = CFG.links[0];
      if (buy && buy.href) {
        const b = document.createElement("a");
        b.className = "btn"; b.href = buy.href; b.target = "_blank"; b.rel = "noopener";
        b.textContent = buy.label;
        b.setAttribute("data-testid", "hero-buy-button");
        heroBox.appendChild(b);
      }
      const f = document.createElement("a");
      f.className = "btn ghost"; f.href = "#flightplan"; f.textContent = "Follow the road";
      f.setAttribute("data-testid", "hero-follow-road-button");
      heroBox.appendChild(f);
    }
    renderLinks($("socialActions"), true);

    /* ---- contract address chips ---- */
    root.querySelectorAll("[data-ca]").forEach((chip) => {
      const code = chip.querySelector("code"), btn = chip.querySelector("button");
      if (!CFG.ca) return;
      code.textContent = CFG.ca; btn.disabled = false;
      btn.addEventListener("click", function () {
        function done() { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1500); }
        function fallback() {
          try {
            const r = document.createRange(); r.selectNodeContents(code);
            const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
          } catch (e) { /* noop */ }
        }
        try { navigator.clipboard.writeText(CFG.ca).then(done, fallback); } catch (e) { fallback(); }
      });
    });

    /* ---- roadmap: rover follows scroll ---- */
    const road = $("road"), rover = $("rover");
    function place() {
      if (!road || !rover) return;
      const r = road.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.55 - r.top) / r.height));
      rover.style.top = (p * (r.height - rover.offsetHeight)) + "px";
    }
    addEventListener("scroll", place, { passive: true });
    addEventListener("resize", place);
    place();
    cleanups.push(() => {
      removeEventListener("scroll", place);
      removeEventListener("resize", place);
    });

    /* ---- intro flight ---- */
    const intro = $("intro");
    let ended = false, raf = 0;
    let removeResize = null;
    const endTimer = { id: 0 };
    function endIntro() {
      if (ended) return; ended = true;
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("locked");
      document.body.classList.add("live");
      if (intro) intro.classList.add("done");
      endTimer.id = setTimeout(() => { if (!gone) setIntroGone(true); }, 1000);
    }
    const skipBtn = $("skip");
    if (skipBtn) skipBtn.addEventListener("click", endIntro);
    cleanups.push(() => {
      if (skipBtn) skipBtn.removeEventListener("click", endIntro);
      clearTimeout(endTimer.id);
      cancelAnimationFrame(raf);
      if (removeResize) removeResize();
      document.documentElement.classList.remove("locked");
      document.body.classList.remove("live");
    });

    function runIntro() {
      document.documentElement.classList.add("locked");
      const cv = $("space"), ctx = cv.getContext("2d");
      const flyer = $("flyer"), planet = $("planet");
      let W = 0, H = 0, dpr = 1;
      function size() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = innerWidth; H = innerHeight;
        cv.width = W * dpr; cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      size(); addEventListener("resize", size);
      removeResize = () => removeEventListener("resize", size);

      const stars = [];
      for (let i = 0; i < 150; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random() });
      const parts = [];
      const DUR = 5600;
      const start = performance.now();
      let last = start;
      const gasFill = $("gasFill"), gasNum = $("gasNum"), gasBar = $("gasBar"),
        marsFill = $("marsFill"), kmNum = $("kmNum"), status = $("status");
      const msgs = [[0.15, "Igniting thrusters"], [0.4, "Burning gas, leaving Earth"], [0.7, "Crossing the void"], [0.9, "Mars in sight"], [2, "Landing"]];

      function spawn(ox, oy, n) {
        for (let i = 0; i < n; i++) {
          const smoke = Math.random() < 0.45;
          parts.push({
            x: ox + Math.random() * 6 - 3, y: oy + Math.random() * 10 - 5,
            vx: -(160 + Math.random() * 240), vy: (Math.random() - 0.5) * 50 - (smoke ? 12 : 0),
            life: 0, max: smoke ? 1.2 + Math.random() * 0.6 : 0.35 + Math.random() * 0.3,
            r: smoke ? 5 + Math.random() * 5 : 3 + Math.random() * 3, smoke
          });
        }
        if (parts.length > 260) parts.splice(0, parts.length - 260);
      }

      function frame(now) {
        const t = Math.min((now - start) / DUR, 1);
        const dt = Math.min(now - last, 50); last = now;
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        ctx.clearRect(0, 0, W, H);

        ctx.lineCap = "round";
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.x -= (3 + s.z * 12) * (dt / 16) * (0.6 + t * 1.6);
          if (s.x < -60) { s.x = W + 20; s.y = Math.random() * H; }
          ctx.strokeStyle = "rgba(255,240,225," + (0.25 + 0.55 * s.z).toFixed(2) + ")";
          ctx.lineWidth = s.z * 1.6 + 0.4;
          ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.z * (10 + t * 46), s.y); ctx.stroke();
        }

        const fw = flyer.offsetWidth, fh = flyer.offsetHeight;
        const x = W * (0.2 + 0.1 * t) - fw * 0.1 + Math.sin(now / 900) * 6;
        const y = H * 0.4 - t * H * 0.04 + Math.sin(now / 520) * 10;
        const rot = -4 + Math.sin(now / 650) * 2;
        flyer.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) rotate(" + rot.toFixed(2) + "deg)";
        spawn(x + fw * 0.03, y + fh * 0.625, Math.max(1, Math.round(dt / 16 * 3)));

        for (let j = parts.length - 1; j >= 0; j--) {
          const p = parts[j];
          p.life += dt / 1000;
          if (p.life > p.max) { parts.splice(j, 1); continue; }
          p.x += p.vx * dt / 1000; p.y += p.vy * dt / 1000;
          const k = p.life / p.max;
          if (p.smoke) {
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "rgba(200,178,168," + ((1 - k) * 0.35).toFixed(3) + ")";
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + k * 2.4), 0, 6.283); ctx.fill();
          } else {
            ctx.globalCompositeOperation = "lighter";
            ctx.fillStyle = (k < 0.5 ? "rgba(255,210,70," : "rgba(255,110,30,") + (1 - k).toFixed(3) + ")";
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 - k * 0.5), 0, 6.283); ctx.fill();
          }
        }
        ctx.globalCompositeOperation = "source-over";

        const S = Math.max(W, H) * 3;
        const sc = (70 / S) + (1 - 70 / S) * Math.pow(t, 3.2);
        planet.style.width = S + "px"; planet.style.height = S + "px";
        planet.style.transform = "translate3d(" + (W * 0.78 - S / 2) + "px," + (H * 0.7 - S / 2) + "px,0) scale(" + sc.toFixed(4) + ")";

        const gas = Math.max(4, 100 - 96 * t);
        gasFill.style.width = gas + "%";
        gasNum.textContent = Math.round(gas) + "%";
        gasBar.classList.toggle("low", gas < 28);
        marsFill.style.width = (e * 100).toFixed(1) + "%";
        kmNum.textContent = Math.round(225000000 * (1 - e)).toLocaleString("en-US") + " km";
        for (let m = 0; m < msgs.length; m++) { if (t < msgs[m][0]) { status.textContent = msgs[m][1]; break; } }

        if (t >= 1) { endIntro(); return; }
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
    }

    if (reduce) {
      document.body.classList.add("live");
      setIntroGone(true);
    } else {
      try { runIntro(); } catch (err) { endIntro(); }
    }

    return () => {
      gone = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={rootRef} data-testid="marster-home">
      {/* ================= INTRO ================= */}
      {!introGone && (
        <div className="intro" id="intro" role="status" aria-label="Loading: the roadster is flying to Mars" data-testid="intro-screen">
          <div className="planet" id="planet"></div>
          <canvas id="space"></canvas>
          <div className="flyer" id="flyer" data-car="" data-flame=""></div>
          <button className="skip" id="skip" type="button" data-testid="intro-skip-button">Skip flight</button>
          <div className="hud">
            <div className="hud-row"><span className="hud-label">Gas</span><div className="gauge" id="gasBar"><i id="gasFill"></i></div><span className="hud-num" id="gasNum">100%</span></div>
            <div className="hud-row"><span className="hud-label">To Mars</span><div className="gauge mars"><i id="marsFill"></i></div><span className="hud-num" id="kmNum">225,000,000 km</span></div>
            <p className="hud-status" id="status">Igniting thrusters</p>
          </div>
        </div>
      )}

      {/* ================= HERO ================= */}
      <header className="hero" id="top" data-testid="hero-section">
        <div className="stars" id="stars" aria-hidden="true"></div>
        <div className="sun" aria-hidden="true"></div>
        <div className="flyby" aria-hidden="true" data-car="" data-flame=""></div>

        <div className="wrap">
          <div className="hero-copy">
            <h1 className="rise" data-testid="hero-headline">Flying Tesla <span>Roadster</span></h1>
            <p className="sub rise" data-testid="hero-subline">The MARSter of memes. One red roadster, one dusty road and 225 million kilometres to go. Humans are crawling, flying and carpooling there behind it.</p>
            <div className="actions rise" id="heroActions"></div>
            <div className="ca-chip rise" data-ca="" data-testid="ca-chip-hero"><b>CA</b><code data-testid="ca-text-hero">Contract address posts here at launch</code><button type="button" disabled data-testid="ca-copy-hero">Copy</button></div>
          </div>
        </div>

        <div className="scene" aria-hidden="true">
          <div className="mtn back"></div>
          <div className="mtn front"></div>
          <div className="strip"></div>
          <div className="post">
            <svg viewBox="0 0 74 90"><rect x="35" y="30" width="5" height="60" fill="#bdbdbd"/><rect x="2" y="4" width="70" height="32" rx="5" fill="#0f5a43" stroke="#fff" strokeWidth="3"/><text x="37" y="25" textAnchor="middle" fontFamily="monospace" fontSize="14" fontWeight="700" fill="#fff">MARS →</text></svg>
          </div>
          <div className="dust"><i></i><i></i><i></i><i></i><i></i></div>
          <div className="hero-car" data-car=""></div>
        </div>
      </header>

      <div className="ticker" aria-hidden="true" data-testid="ticker">
        <div id="tickerTrack">
          <span>Humans crawling to Mars</span><span>Gas: spent</span><span>Brakes: not installed</span><span>Roadster in flight</span><span>225,000,000 km to go</span><span>Zero brakes, full send</span>
        </div>
      </div>

      <main>
        {/* ================= LORE ================= */}
        <section className="lore" id="lore" data-testid="lore-section">
          <div className="wrap">
            <div className="copy">
              <p className="label">Mission brief</p>
              <h2 data-testid="lore-title">The roadster never landed. We fix that.</h2>
              <p>On October 15, 2026 Tesla finally unveiled the new Roadster near Waco, Texas. It uses SpaceX cold-gas thrusters to spin, lift over other cars and land again, with production planned for 2028. The first roadster, the red one launched into space in 2018, is still circling the Sun and has never touched Mars.</p>
              <p>FlyingTeslaRoadster finishes the drive. Gas spent, brakes removed, destination: the red planet. Humans crawl, fly and carpool behind it, and every meme is another kilometre of road.</p>
            </div>
            <div className="telemetry" data-testid="telemetry-panel">
              <h3>Telemetry</h3>
              <dl>
                <div className="row"><dt>Status</dt><dd className="ok">En route</dd></div>
                <div className="row"><dt>Distance to Mars (avg)</dt><dd>225,000,000 km</dd></div>
                <div className="row"><dt>Gas</dt><dd>0% (vibes 100%)</dd></div>
                <div className="row"><dt>Brakes</dt><dd>None installed</dd></div>
                <div className="row"><dt>Driver</dt><dd>Astronaut, unverified</dd></div>
                <div className="row"><dt>Passengers</dt><dd>Everyone who can hold on</dd></div>
              </dl>
            </div>
          </div>
        </section>

        {/* ================= MEMES ================= */}
        <section className="memes" id="memes" data-testid="memes-section">
          <div className="wrap">
            <p className="label">Meme bay</p>
            <h2>Humans, in transit</h2>
            <p className="intro-line">Four ways the timeline gets to Mars.</p>
            <div className="meme-grid">

              <figure className="meme" data-testid="meme-crawl">
                <div className="frame">
                  <svg viewBox="0 0 320 240" role="img" aria-label="A person in a helmet crawling on all fours along a road toward Mars">
                    <defs><linearGradient id="gA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f0618"/><stop offset="1" stopColor="#3a1747"/></linearGradient></defs>
                    <rect width="320" height="240" fill="url(#gA)"/>
                    <g fill="#fff" opacity=".8"><circle cx="30" cy="30" r="1.5"/><circle cx="90" cy="62" r="1"/><circle cx="150" cy="26" r="1.5"/><circle cx="200" cy="54" r="1"/><circle cx="120" cy="104" r="1"/><circle cx="60" cy="112" r="1.2"/><circle cx="300" cy="20" r="1.2"/></g>
                    <circle cx="256" cy="96" r="48" fill="#d9531f"/><circle cx="240" cy="82" r="9" fill="#a73c16"/><circle cx="274" cy="112" r="12" fill="#a73c16"/><circle cx="268" cy="74" r="5" fill="#a73c16"/>
                    <path d="M0 198 Q170 196 252 146" stroke="#ffcf3d" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" fill="none"/>
                    <rect y="200" width="320" height="40" fill="#2c1510"/>
                    <g className="crawl" stroke="#eceaf5" strokeLinecap="round" fill="none">
                      <path d="M36 176 L70 172" strokeWidth="14"/>
                      <path d="M66 178 L72 198 M58 178 L58 198 M36 180 L24 198 M44 182 L46 198" strokeWidth="6"/>
                      <circle cx="86" cy="164" r="12" fill="#eceaf5" stroke="none"/>
                      <ellipse cx="91" cy="164" rx="7" ry="5" fill="#8be9ff" stroke="none"/>
                      <rect x="26" y="160" width="14" height="14" rx="3" fill="#8a8aa0" stroke="none"/>
                    </g>
                  </svg>
                  <p className="cap top">Me crawling to Mars</p>
                  <p className="cap bottom">225,000,000 km left</p>
                </div>
              </figure>

              <figure className="meme" data-testid="meme-riders">
                <div className="frame">
                  <svg viewBox="0 0 320 240" role="img" aria-label="Two people holding on to the roof of a flying red roadster with a flame behind it">
                    <defs><linearGradient id="gB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f0618"/><stop offset="1" stopColor="#5a2142"/></linearGradient></defs>
                    <rect width="320" height="240" fill="url(#gB)"/>
                    <g fill="#fff" opacity=".8"><circle cx="40" cy="40" r="1.5"/><circle cx="110" cy="30" r="1"/><circle cx="210" cy="44" r="1.5"/><circle cx="280" cy="70" r="1"/><circle cx="30" cy="140" r="1.2"/><circle cx="300" cy="150" r="1"/></g>
                    <circle cx="282" cy="206" r="30" fill="#d9531f"/><circle cx="272" cy="198" r="6" fill="#a73c16"/>
                    <g className="floaty"><g data-car-g="" data-flame="1" data-extra="riders" transform="translate(70 86) rotate(-12 150 56) scale(.6)"></g></g>
                  </svg>
                  <p className="cap top">Me after buying</p>
                  <p className="cap bottom">Wen Mars? Now.</p>
                </div>
              </figure>

              <figure className="meme" data-testid="meme-gas">
                <div className="frame">
                  <svg viewBox="0 0 320 240" role="img" aria-label="A red roadster coasting through space next to a fuel gauge pointing at empty">
                    <defs><linearGradient id="gC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f0618"/><stop offset="1" stopColor="#2a1138"/></linearGradient></defs>
                    <rect width="320" height="240" fill="url(#gC)"/>
                    <g fill="#fff" opacity=".8"><circle cx="20" cy="60" r="1.5"/><circle cx="120" cy="40" r="1"/><circle cx="170" cy="90" r="1.5"/><circle cx="60" cy="200" r="1"/><circle cx="300" cy="190" r="1.2"/></g>
                    <g transform="translate(228 54)">
                      <path d="M0 40 A40 40 0 0 1 80 40" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="10"/>
                      <path d="M0 40 A40 40 0 0 1 11.7 11.7" fill="none" stroke="#ef3a24" strokeWidth="10"/>
                      <line x1="40" y1="40" x2="10.5" y2="34.8" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                      <circle cx="40" cy="40" r="5" fill="#fff"/>
                      <text x="-2" y="58" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#fff">E</text>
                      <text x="72" y="58" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#fff">F</text>
                    </g>
                    <g className="floaty"><g className="still" data-car-g="" transform="translate(28 112) scale(.6)"></g></g>
                  </svg>
                  <p className="cap top">Gas tank: empty</p>
                  <p className="cap bottom">Vibes: full</p>
                </div>
              </figure>

              <figure className="meme" data-testid="meme-arrived">
                <div className="frame">
                  <svg viewBox="0 0 320 240" role="img" aria-label="A red roadster parked on Mars next to a red flag">
                    <defs><linearGradient id="gD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a1747"/><stop offset=".6" stopColor="#d9593a"/><stop offset="1" stopColor="#ff9356"/></linearGradient></defs>
                    <rect width="320" height="240" fill="url(#gD)"/>
                    <circle cx="246" cy="118" r="24" fill="#fff0e2"/>
                    <path d="M0 172 L50 142 L90 162 L150 122 L210 167 L260 137 L320 167 V240 H0 Z" fill="#8a3b3f"/>
                    <path d="M0 192 Q160 178 320 194 V240 H0 Z" fill="#b8441f"/>
                    <path d="M0 214 Q160 204 320 218 V240 H0 Z" fill="#8f3216"/>
                    <ellipse cx="260" cy="222" rx="26" ry="5" fill="#6e260f"/><ellipse cx="40" cy="226" rx="20" ry="4" fill="#6e260f"/>
                    <g className="parked" data-car-g="" transform="translate(50 130) scale(.55)"></g>
                    <g><line x1="236" y1="152" x2="236" y2="204" stroke="#eee" strokeWidth="3"/><path d="M236 152 L268 161 L236 171 Z" fill="#ef3a24"/></g>
                  </svg>
                  <p className="cap top">Mars: arrived</p>
                  <p className="cap bottom">Parking: free</p>
                </div>
              </figure>

            </div>
          </div>
        </section>

        {/* ================= FLIGHT PLAN / ROAD ================= */}
        <section className="plan" id="flightplan" data-testid="flightplan-section">
          <div className="wrap">
            <div className="head">
              <p className="label">Flight plan</p>
              <h2 data-testid="flightplan-title">The road to Mars</h2>
              <p>Scroll to drive. Each sign shows how far the convoy still has to go.</p>
            </div>
            <div className="road" id="road">
              <div className="tarmac" aria-hidden="true"></div>
              <div className="rover" id="rover" aria-hidden="true" data-testid="road-rover">
                <svg viewBox="0 0 40 80">
                  <rect x="1" y="10" width="7" height="16" rx="2" fill="#151015"/><rect x="32" y="10" width="7" height="16" rx="2" fill="#151015"/>
                  <rect x="1" y="54" width="7" height="16" rx="2" fill="#151015"/><rect x="32" y="54" width="7" height="16" rx="2" fill="#151015"/>
                  <rect x="6" y="2" width="28" height="76" rx="12" fill="#ef3a24"/>
                  <rect x="11" y="22" width="18" height="24" rx="6" fill="#8be9ff" opacity=".85"/>
                  <circle cx="20" cy="34" r="6" fill="#fff"/>
                  <rect x="9" y="72" width="7" height="3" rx="1" fill="#ffcf3d"/><rect x="24" y="72" width="7" height="3" rx="1" fill="#ffcf3d"/>
                </svg>
              </div>

              <article className="stop left" data-testid="roadmap-stop-1">
                <div className="sign">
                  <p className="km">225,000,000 km to Mars</p>
                  <h3>Launch pad</h3>
                  <p>Fair launch on pump.fun. Socials go live, the first memes hit the timeline, and the roadster leaves the garage.</p>
                </div>
              </article>
              <article className="stop right" data-testid="roadmap-stop-2">
                <div className="sign">
                  <p className="km">150,000,000 km to Mars</p>
                  <h3>Leave orbit</h3>
                  <p>Raids, meme contests and daily posting. The goal is to fill the bonding curve and graduate the token.</p>
                </div>
              </article>
              <article className="stop left" data-testid="roadmap-stop-3">
                <div className="sign">
                  <p className="km">60,000,000 km to Mars</p>
                  <h3>Get noticed</h3>
                  <p>Keep making memes until the right feeds catch them. Community art, edits and videos get pinned and boosted.</p>
                </div>
              </article>
              <article className="stop right" data-testid="roadmap-stop-4">
                <div className="sign">
                  <p className="km">0 km to Mars</p>
                  <h3>Plant the flag</h3>
                  <p>The roadster parks on the red planet. Everyone who held on gets to say they were on the road.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ================= HOW TO BUY ================= */}
        <section className="buy" id="buy" data-testid="buy-section">
          <div className="wrap">
            <p className="label">Boarding</p>
            <h2>How to get in the car</h2>
            <ol className="steps">
              <li data-testid="buy-step-1"><div className="n">1</div><h3>Get a wallet</h3><p>Install a Solana wallet such as Phantom or Solflare and save your recovery phrase offline.</p></li>
              <li data-testid="buy-step-2"><div className="n">2</div><h3>Add SOL</h3><p>Buy SOL on an exchange and send it to your wallet address.</p></li>
              <li data-testid="buy-step-3"><div className="n">3</div><h3>Open pump.fun</h3><p>Connect your wallet and search for the contract address shown on this page.</p></li>
              <li data-testid="buy-step-4"><div className="n">4</div><h3>Check, then buy</h3><p>Match the address against the one pinned on our official X and Telegram before you trade.</p></li>
            </ol>
          </div>
        </section>

        {/* ================= JOIN ================= */}
        <section className="join" id="socials" data-testid="socials-section">
          <div className="wrap">
            <p className="label">The convoy</p>
            <h2>Join the drive to Mars</h2>
            <p className="lead">Post a meme, quote the roadster, tag the ones who should see it. The road gets longer with every post.</p>
            <div className="actions" id="socialActions"></div>
            <div className="ca-chip" data-ca="" data-testid="ca-chip-join"><b>CA</b><code data-testid="ca-text-join">Contract address posts here at launch</code><button type="button" disabled data-testid="ca-copy-join">Copy</button></div>
          </div>
        </section>
      </main>

      <footer data-testid="site-footer">
        <div className="wrap">
          <p>FlyingTeslaRoadster is a meme token made for fun. It has no intrinsic value and no promise of financial return.</p>
          <p>This project is not affiliated with, endorsed by or connected to Tesla, SpaceX or Elon Musk. Crypto trading is risky. Only spend what you can afford to lose, and always verify the contract address.</p>
        </div>
      </footer>
    </div>
  );
}
