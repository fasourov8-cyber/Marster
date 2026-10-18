import { motion } from "framer-motion";
import { Roadster } from "./Roadster";

// Persistent Mars road strip at the bottom of the viewport with a driving car.
const PersistentCar = () => (
  <div
    data-testid="persistent-car-road"
    className="pointer-events-none fixed bottom-0 left-0 right-0 z-40"
  >
    {/* car driving on the mars road */}
    <motion.div
      className="absolute bottom-7 left-1/2 w-40 -translate-x-1/2 sm:w-52"
      initial={{ x: "-50%" }}
    >
      <div className="animate-bob">
        <Roadster className="w-full drop-shadow-[0_0_25px_rgba(255,59,48,0.5)]" />
      </div>
    </motion.div>

    {/* mars road surface */}
    <div className="relative h-12 w-full border-t border-mars-dust/40 bg-gradient-to-b from-mars-rust/90 to-[#1a0804]">
      <div className="mars-road-line absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-mars-red/60 to-transparent" />
    </div>
  </div>
);

export default PersistentCar;
