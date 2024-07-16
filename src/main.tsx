import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import { Home } from '../src/pages/Home.tsx'
import Login from '../src/components/Login.tsx'
import CreateRoom from '../src/pages/CreateRoom.tsx'
// import JoinModal from "./components/JoinModal.tsx"
import { Toaster } from "./components/ui/sonner.tsx"
import JoinCall from './pages/JoinRoom.tsx'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: "/home/room/:id",
    element: < CreateRoom />
  },
  {
    path: "/home/room",
    element: <JoinCall />
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    <Toaster />
    {/* <App /> */}
  </React.StrictMode>,
)
