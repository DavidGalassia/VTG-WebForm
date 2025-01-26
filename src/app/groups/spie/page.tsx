"use client";

import PixelsAnimation from "../../globalcomponents/UI/Pixels_animation";
import { useEffect } from "react";
import InfoSPIE from "@/app/globalcomponents/Info/Info-SPIE";

export default function Home() {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-center h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-white"
      style={{
        backgroundImage: "url('/spie.jpg')",
        backgroundSize: "cover",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animación de píxeles */}
      <div style={{ pointerEvents: "none" }}>
        <PixelsAnimation />
      </div>

      {/* Contenido principal */}
      <main className="flex flex-col row-start-2 items-center sm:items-start relative z-10">
        <h1 className="text-5xl md:text-2xl text-center mb-6 pixel-font text-white glitch_Spie">
          SPIE
        </h1>
        
        <InfoSPIE />

      </main>
    </div>
  );
}
