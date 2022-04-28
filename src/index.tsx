import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.scss";
import { GameDataProvider } from "./gameContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GameDataProvider>
      <App />
    </GameDataProvider>
  </React.StrictMode>
);
