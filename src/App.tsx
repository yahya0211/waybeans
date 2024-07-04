import {RouterProvider, createBrowserRouter } from "react-router-dom"
import router from "./routers";

function App() {
  return (
   <RouterProvider router={createBrowserRouter(router)}/>
  );
}

export default App;
