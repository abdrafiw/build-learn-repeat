import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootElement from "../routes/rootFile.tsx";
import { wait } from "../utils/wait.tsx";

const Home = lazy(() => import("../components/Home"));
const Store = lazy(() => wait(1000).then(() => import("../components/Store")));

// named export
const About = lazy(() =>
  import("../components/About.tsx").then((module) => ({
    default: module.About,
  })),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElement />,
    children: [
      { path: "/", element: <Home /> },
      { path: "Store", element: <Store /> },
      { path: "about", element: <About /> },
    ],
  },
]);
