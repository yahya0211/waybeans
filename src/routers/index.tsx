import { RouteObject } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import LoginPage from "../pages/auth/Login/Login";
import RegisterPage from "../pages/auth/Register/Register";
import Product from "../pages/product";
import MainLayout from "../MainLayout";
import Carts from "../pages/carts/Carts";
import Checkout from "../pages/checkout/Checkout";

import NotAuthenticated from "../pages/auth/NotAuthenticated/NotAuthenticated";
import Profile from "../pages/profile/Profile";
import Income from "../pages/income/Income";
import AddProducts from "../pages/product/AddProducts";
import SellerRegisterPage from "../pages/auth/SellerRegister/Register";

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
        path: "/checkout/:id",
        element: <PrivateRoutes element={<Checkout />} />,
      },
      {
        path: "/profile",
        element: <PrivateRoutes element={<Profile />} />,
      },
      {
        path: "/income",
        element: <PrivateRoutes element={<Income />} />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/add-product",
        element: <PrivateRoutes element={<AddProducts />} />,
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
  {
    path: "auth/register/seller-register",
    element: <SellerRegisterPage />,
  },
];
export default router;
