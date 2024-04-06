import './App.css';
import { 
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
import Start from './Start';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Start/>,
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
      path: '/home',
      element: <Home/>
    },
    {
      path: '/profile',
      element: <Profile/>
    }
  ]);

export default function App(){
    return (
        <RouterProvider router={router} />
    )
}