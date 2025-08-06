import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'

const router = createBrowserRouter([
  {path:'/', element: <App/>},
  {path:'/home', element: <Home/>},
  {path:'/about', element: <About/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
