import { RouteObject } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import LoginPage from "../pages/auth/Login/Login";
import RegisterPage from "../pages/auth/Register/Register";
import Product from "../pages/product";
import Carts from "../pages/carts/Carts"


const router: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/cart",
    element: <Carts />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "auth/login",
    element: <LoginPage />,
  },
  {
    path: "auth/register",
    element: <RegisterPage />,
  },
];

export default router;
