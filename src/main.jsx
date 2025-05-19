import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import AllRecipes from "./pages/AllRecipes";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage.jsx";
import AuthProvider from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 🌟 Shared layout with Navbar
    children: [
      { path: "/", element: <Home /> },
      { path: "/recipes", element: <AllRecipes /> },
      { path: "/add-recipe", element: <AddRecipe /> }, 
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <ErrorPage /> }, // 404 page
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
