import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import "../src/main.css";


const rootEl = document.querySelector("#root");
ReactDom.createRoot(rootEl).render(<App />);
