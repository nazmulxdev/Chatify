import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./Router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalContextProvider from "./Context/globalContextProvider";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <RouterProvider router={Router}></RouterProvider>
      </GlobalContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
