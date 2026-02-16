import { createBrowserRouter } from "react-router";


import { Home } from "./paginas/home";
import { Admin } from "./paginas/admin";
import { Login } from "./paginas/login";
import { Network } from "./paginas/networks";
import { Private } from "./rotas/Private";
import { ErrorPage } from "./paginas/error";


const Router = createBrowserRouter([
  {
    element: <Home/>,
    path: "/"
  },
  {
    element: <Private><Admin/></Private>,
    path: "/admin"
  },
  {
    
    path: "/login",
    element: <Login/>
  },
  {
    element: <Private><Network/></Private>,
    path: "/admin/social"
  },
  {
    element: <ErrorPage/>,
    path: "*"
  }
])


export {Router}