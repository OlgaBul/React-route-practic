import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../../components/Layout";
import Home from "../../pages/Home";
import Users from "../../pages/Users";
import UserProfile from "../../pages/UserProfile";
import NotFound from "../../pages/NotFound";
import UserPosts from "../../pages/UserPosts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "users",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: "/users/:userId",
            element: <UserProfile />,
          },
          {
            path: "/users/:userId/posts",
            element: <UserPosts />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
