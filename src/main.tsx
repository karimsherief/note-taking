import ReactDOM from "react-dom/client";
import App from "./App";
import NoteProvider from "./context/NoteContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <NoteProvider>
    <App />
  </NoteProvider>
);
