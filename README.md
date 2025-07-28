# 📌 Buscador de Personajes de Series

Aplicación desarrollada en **React + Vite** que permite buscar personajes de la serie "Rick and Morty" consumiendo una API externa, visualizar resultados, gestionar favoritos y realizar acciones mediante formularios.

---

## 🎯 Objetivo

- Buscar personajes por nombre usando una API pública.
- Visualizar resultados en tarjetas con información relevante (edad, especie, locación, etc.).
- Agregar y quitar personajes de una lista de favoritos persistente (localStorage).
- Manejar formularios controlados y validaciones básicas.
- Mostrar notificaciones de éxito/error con `react-toastify`.
- Diseño responsive con TailwindCSS.

---

## 🌐 API Utilizada

- [Rick and Morty API](https://rickandmortyapi.com/api/character/)

---

## 🛠️ Tecnologías y Librerías

- React + Vite
- TailwindCSS
- react-toastify
- localStorage (persistencia de favoritos)
- Fetch API

---

## 📋 Estructura del Proyecto

- `src/components/`: Componentes reutilizables (Header, CharacterCard, Favorites, Loader, ThemeToggle).
- `src/context/`: Contextos de React para manejar el tema y los favoritos.
- `src/pages/`: Páginas principales de la aplicación.
- `src/App.jsx`: Componente principal.
- `src/main.jsx`: Punto de entrada.
- `src/index.css`: Estilos globales.

---

## ⚙️ Decisiones Técnicas

### Manejo de Estado y Efectos

- Se utiliza `useState` para manejar los datos de personajes, favoritos y estados de carga/error.
- `useEffect` se emplea para realizar peticiones a la API y sincronizar favoritos con localStorage.

### Formularios y Validaciones

- El formulario de búsqueda es controlado, validando que el campo no esté vacío y que la cantidad de personajes sea válida.

### Notificaciones

- Se utiliza `react-toastify` para mostrar mensajes de éxito y error en las operaciones con la API y favoritos.

### Persistencia

- Los favoritos se almacenan en localStorage para mantener la lista entre sesiones.

### Loader y Manejo de Errores

- Se muestra un loader mientras se obtienen los datos.
- Los errores de la API se capturan y notifican al usuario.

---

## 📝 Uso de la Aplicación

1. Ingresa el nombre del personaje y la cantidad de resultados a buscar.
2. Visualiza los personajes en tarjetas con su información.
3. Agrega personajes a favoritos y gestiona la lista (ver/eliminar).
4. Cambia el tema claro/oscuro desde el toggle.

---

## 🌍 Despliegue

La aplicación está desplegada en: [Enlace a Netlify/Vercel](<url-del-despliegue>)

---

Proyecto educativo para la materia Módulo 4 - Integración con APIs.
# M4-Sprint4
