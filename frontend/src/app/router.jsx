import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Industries from "../pages/Industries/Industries";
import Projects from "../pages/Projects/Projects";
import Contact from "../pages/Contact/Contact";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "industries", element: <Industries /> },
      { path: "projects", element: <Projects /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
