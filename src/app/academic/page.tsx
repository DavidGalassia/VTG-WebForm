"use client";

import AcademicForm from "../globalcomponents/Forms/Form-Academic";
import PixelsAnimation from "../globalcomponents/UI/Pixels_animation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Elimina el scroll de la página
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center w-full h-screen bg-black text-white overflow-hidden"
      style={{
        backgroundImage: "url('/coins.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Animación de píxeles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <PixelsAnimation />
      </div>

      {/* Contenido principal más pequeño y centrado */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center bg-opacity-80 p-8 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h1 className="text-2xl md:text-3xl mb-6 pixel-font text-white-300">
          ¡Formulario Académico!
        </h1>
        <AcademicForm />
      </main>
    </div>
  );
}
