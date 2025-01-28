import { StrictMode } from 'react'

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromChildren,
} from "react-router-dom";

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserForm from './components/Pages/UserForm.jsx';
import Greetings from './components/Pages/Greetings.jsx';
import ErrorPage from './components/Pages/ErrorPage.jsx';
import Login from './components/Pages/Login.jsx';
import Dashboard from './components/Pages/Dashboard.jsx';
import Register from './components/Pages/Register.jsx';
import Unauthorized from './components/Pages/Unauthoized.jsx';

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<App />}>
      <Route path="/" element={<UserForm />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="Dashboard" element={<Dashboard />} />
      <Route
        path="profile-saved"
        element={<Greetings />}
        errorElement={<ErrorPage />}
      />
      <Route path="unauth-req" element={<Unauthorized />} />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
