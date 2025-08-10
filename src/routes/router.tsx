import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Assesment from "../pages/assesment/Assesment";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import VerifyEmail from "../pages/verify-email/VerifyEmail";
import ResetPassword from "../pages/reset-password/ResetPassword";
import Overview from "../pages/overview/Overview";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Login></Login>,
      },
      {
        path: "/assesment",
        element: <Assesment></Assesment>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail></VerifyEmail>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword></ResetPassword>,
      },
      {
        path: "/overview",
        element: <Overview></Overview>,
      },
    ],
  },
]);

export default router;
