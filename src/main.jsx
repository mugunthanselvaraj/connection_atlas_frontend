import "./index.css";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Authentication, { PageType } from "./pages/Authentication.jsx";
import React, { StrictMode } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Authentication pageType={PageType.LOGIN} />,
  },
  {
    path: "/register",
    element: <Authentication pageType={PageType.REGISTER} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);
