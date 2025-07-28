import React from "react";

function Loader({ darkMode }) {
  return (
    <div
      className={
        "text-center font-bold text-xl animate-pulse " +
        (darkMode ? "text-[#A8DADC]" : "text-[#B39CD0]")
      }
    >
      Cargando...
    </div>
  );
}

export default Loader;

