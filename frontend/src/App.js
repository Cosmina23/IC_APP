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
import Nivel from './Pages/Nivel';
import Rezultat from './Pages/Rezultat';
import Materie from './Pages/Materie'
import HomeMaterie from './Pages/HomeMaterie';

  
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
    },
    {
      path: '/nivel',
      element: <Nivel/>
    },
    {
      path: '/rezultat',
      element: <Rezultat/>
    },
    {
      path: '/materie',
      element: <Materie/>
    },
    {
      path: '/homeMaterie',
      element: <HomeMaterie/>
    }
  ]);

export default function App(){
    return (
        <RouterProvider router={router} />
    )
}