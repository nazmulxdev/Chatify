import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Layouts/RootLayouts/Root";
import Auth from "../Layouts/AuthLayouts/Auth";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import ChatPage from "../Pages/Chat/ChatPage";
import PrivateRoutes from "../Routes/privateRoutes";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/chat",
        element: (
          <PrivateRoutes>
            <ChatPage></ChatPage>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/auth",
    Component: Auth,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/signup",
        Component: SignUp,
      },
    ],
  },
]);

export default Router;
