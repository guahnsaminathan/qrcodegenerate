
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, HomeLayout, Landing, Login, Logout, Register, UserPage } from "./pages";
import { ToastContainer, toast } from 'react-toastify';
import AdminRegister from "./pages/AdminRegister";
import Home from "./pages/Home"
import Hostel from"./pages/Hostel"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path:"hostel",
        element:<Hostel />,
      },
      {
        path:"home",
        element:<Home />,
      },
      {
        path: "admin",
        element: <AdminRegister />,
      },
      
      {
        path: "userpage",
        element: <UserPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "logout",
        element: <Logout />,
      }
    ],
  },
]);

function App() {


  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer position='top-center' />
    </>
  )
}

export default App
