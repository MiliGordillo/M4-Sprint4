import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={
        "min-h-screen flex flex-col transition-colors duration-500 relative " +
        (darkMode ? "text-white" : "text-black")
      }
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/rick-sanchez-in-the-field-rick-and-morty-moewalls-com.mp4" type="video/mp4" />
        Tu navegador no soporta el video de fondo.
      </video>
      <Header />
      <main className="flex-1">
        <Home />
      </main>
      <ToastContainer
        position="bottom-right" // Cambiado a parte inferior derecha
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName={
          darkMode
            ? "bg-[#A8DADC] text-[#2C2C2C] rounded-xl shadow-lg font-semibold"
            : "bg-[#B39CD0] text-white rounded-xl shadow-lg font-semibold"
        }
        bodyClassName="text-base font-medium"
        progressClassName="bg-[#FFC1CC] h-1 rounded-b-xl"
      />
    </div>
  );
};

export default App;


