import { Main } from './Main';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("app") || document.createElement("div"));
root.render(React.createElement(Main, { app: this }, null));