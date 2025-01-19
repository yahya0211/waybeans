import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./routers";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={createBrowserRouter(router)} />
    </>
  );
}

export default App;
