import { createRoot } from "react-dom/client";
import "./react-shim"; // Ensure React hooks are available
import App from "./App";
import "./index.css";
import "./i18n"; // Initialize i18n

// Register service worker for caching and offline support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

createRoot(document.getElementById("root")!).render(<App />);
