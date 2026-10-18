import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import SplashScreen from "@/components/SplashScreen";
import PersistentCar from "@/components/PersistentCar";
import TickerMarquee from "@/components/TickerMarquee";
import Nav from "@/components/Nav";
import Hero from "@/sections/Hero";
import Lore from "@/sections/Lore";
import Tokenomics from "@/sections/Tokenomics";
import Roadmap from "@/sections/Roadmap";
import HowToBuy from "@/sections/HowToBuy";
import Community from "@/sections/Community";

const Home = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div
      data-testid="marster-home"
      className={`App relative bg-void font-mono text-white ${
        splashDone ? "" : "h-screen overflow-hidden"
      }`}
    >
      <SplashScreen onDone={() => setSplashDone(true)} />
      <div className="noise-overlay" />
      <Nav />
      <main>
        <Hero />
        <TickerMarquee />
        <Lore />
        <Tokenomics />
        <TickerMarquee inverted />
        <Roadmap />
        <HowToBuy />
        <Community />
      </main>
      <PersistentCar />
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
