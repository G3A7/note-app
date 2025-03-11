import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Notes from "./components/Notes";
import Completed from "./components/Completed";
import ContextTokenProvider from "./Context/ContextTokenProvider";
import { Toaster } from "react-hot-toast";
import ContextNotesProvider from "./Context/ContextNotesProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              ),
            },
            {
              path: "/notes",
              element: (
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              ),
            },
            {
              path: "/register",
              element: <Register />,
            },

            {
              path: "/login",
              element: <Login />,
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div>
      <ContextTokenProvider>
        <ContextNotesProvider>
          <RouterProvider router={routes} />
          <Toaster />
        </ContextNotesProvider>
      </ContextTokenProvider>
    </div>
  );
}

export default App;
