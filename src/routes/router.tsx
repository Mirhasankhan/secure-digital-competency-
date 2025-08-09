import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Assesment from "../pages/assesment/Assesment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/assesment",
        element: <Assesment></Assesment>,
      },
    ],
  },
]);

export default router;
