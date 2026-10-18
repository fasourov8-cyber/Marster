import Marquee from "react-fast-marquee";

const ITEMS = [
  "$MARSter",
  "THE ONLY CAR WITH GAS FEES ON MARS",
  "FLYING TESLA ROADSTER",
  "EARTH IS CLOSED",
  "NEXT STOP: MARS",
];

const TickerMarquee = ({ inverted = false }) => (
  <div
    data-testid={inverted ? "ticker-marquee-inverted" : "ticker-marquee"}
    className={`relative z-10 border-y py-3 ${
      inverted
        ? "border-neon/30 bg-neon/5"
        : "border-mars-red/30 bg-mars-red/5"
    }`}
  >
    <Marquee speed={65} gradient={false} pauseOnHover>
      {ITEMS.concat(ITEMS).map((item, i) => (
        <span
          key={i}
          className={`mx-6 font-display text-sm font-bold uppercase tracking-widest sm:text-base ${
            i % 2 === 0 ? "text-mars-red text-glow-red" : "text-neon text-glow-cyan"
          }`}
        >
          {item} <span className="mx-4 text-white/30">★</span>
        </span>
      ))}
    </Marquee>
  </div>
);

export default TickerMarquee;
