import React from "react";

function Loader({ darkMode, message = "Cargando..." }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-8"
      role="status"
      aria-live="polite"
    >
      <img
        src="/public/icono.gif"
        alt="Cargando"
        className="w-24 h-24 mb-4"
      />
      <span
        className={
          "font-bold text-xl animate-pulse " +
          (darkMode ? "text-[#457b9d]" : "text-[#6d28d9]")
        }
      >
        {message}
      </span>
    </div>
  );
}

export default Loader;


