import { motion } from "framer-motion";

const CRYING_HUMANS =
  "https://images.pexels.com/photos/8316664/pexels-photo-8316664.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const ASTRONAUT =
  "https://images.pexels.com/photos/11479921/pexels-photo-11479921.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const Lore = () => (
  <section
    id="lore"
    data-testid="lore-section"
    className="relative mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32"
  >
    <div className="grid items-center gap-16 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="flex flex-col gap-6"
      >
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-neon">
          The Lore
        </span>
        <h2
          data-testid="lore-title"
          className="font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl"
        >
          Earth is <span className="text-mars-red text-glow-red">over.</span>
          <br />
          We're on Mars now.
        </h2>
        <p data-testid="lore-body" className="max-w-lg font-mono text-base leading-relaxed text-white/70 md:text-lg">
          While the humans cry about Earth, we strapped a rocket to a Roadster and
          sent it to the red planet. Starman got lonely up there — so we're sending
          the whole car, the gas, and the memes. The humans staying behind? Crying.
          The humans buying? Driving.
        </p>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/40">
          Not affiliated with any actual car company or rocket billionaire. It's a meme. Chill.
        </p>
      </motion.div>

      <div className="relative grid grid-cols-2 gap-6">
        <motion.figure
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="group relative mt-12 overflow-hidden rounded-2xl border border-white/10"
        >
          <img
            data-testid="lore-humans-image"
            src={CRYING_HUMANS}
            alt="Human left behind on Earth crying"
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 font-mono text-xs uppercase tracking-[0.2em] text-white/80">
            Humans right now
          </figcaption>
        </motion.figure>

        <motion.figure
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="group relative overflow-hidden rounded-2xl border border-neon/20"
        >
          <img
            data-testid="lore-astronaut-image"
            src={ASTRONAUT}
            alt="Astronaut floating toward Mars"
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 font-mono text-xs uppercase tracking-[0.2em] text-neon">
            $MARSter holders
          </figcaption>
        </motion.figure>
      </div>
    </div>
  </section>
);

export default Lore;
