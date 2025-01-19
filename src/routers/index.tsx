import { RouteObject } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import LoginPage from "../pages/auth/Login/Login";
import RegisterPage from "../pages/auth/Register/Register";
import Product from "../pages/product";
import MainLayout from "../MainLayout";
import Carts from "../pages/carts/Carts";
import Checkout from "../pages/checkout/Checkout";

import NotAuthenticated from "../pages/auth/NotAuthenticated/NotAuthenticated";

interface PrivateRoutesProops {
  element: JSX.Element;
}

const PrivateRoutes: React.FC<PrivateRoutesProops> = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? (
    element
  ) : (
    <>
      <NotAuthenticated />
    </>
  );
};

const router: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/carts",
        element: <PrivateRoutes element={<Carts />} />,
      },

      {
        path: "/checkout",
        element: <PrivateRoutes element={<Checkout />} />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
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
