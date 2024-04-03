import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
// import axios from "axios";
import Single from "./pages/single/Single.jsx";
import Write from "./pages/write/Write.jsx";
import { AuthContext } from "./context/authContext.js";
import { useContext } from "react";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>

  );
};







function App() {

  const {currentUser} = useContext(AuthContext);
  const ProtectedUser = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedUser><Layout /></ProtectedUser>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/post/:id",
          element: <Single />
        },
        {
          path: "/write",
          element: <Write />
        },
      ],
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>

    </div>
  );
}

export default App;