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
import AuthProvider from './provider/AuthProvider.jsx';
import PrivateRoute from "./routes/PrivateRoute.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import MyRecipes from "./pages/MyRecipes.jsx";
import Overview from "./pages/Dashboard/Overview.jsx";
import DashboardAllRecipes from "./pages/Dashboard/DashboardAllRecipes.jsx";
import DashboardAddRecipe from "./pages/Dashboard/DashboardAddRecipe.jsx";
import DashboardMyRecipes from "./pages/Dashboard/DashboardMyRecipes.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 🌟 Shared layout with Navbar
    children: [
      { path: "/", element: <Home /> },
      { path: "/recipes", element: <AllRecipes /> },
      {
  path: "/add-recipe",
  element: <PrivateRoute><AddRecipe /></PrivateRoute>
}
, 
 { path: "/my-recipes", element: <PrivateRoute><MyRecipes /></PrivateRoute> },
        {
    path: "/recipes/:id",
    element: <PrivateRoute><RecipeDetails /></PrivateRoute>
  },
  
  
     {
  path: "/dashboard",
  element: <PrivateRoute><Dashboard /></PrivateRoute>,
  children: [
    { path: "/dashboard", element: <Overview /> },
    { path: "/dashboard/all-recipes", element: <DashboardAllRecipes /> },
    { path: "/dashboard/add-recipe", element: <DashboardAddRecipe /> },
    { path: "/dashboard/my-recipes", element: <DashboardMyRecipes /> },
  ]
}
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
