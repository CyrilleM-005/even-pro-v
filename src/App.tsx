// App.tsx
import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import LayoutApp from "./layouts/LayoutApp";
import Event from "./pages/Event";
import EventDetail from "./pages/EventDetail";
import Apropos from "./pages/Apropos";
import Auth from "./pages/Auth";
import MesInscriptions from "./pages/MesInscriptions";

// Context Providers
import { RegistrationProvider } from "./contexts/RegistrationContext";
import { AuthProvider } from "./contexts/AuthContext";
import CreateEventForm from "./components/Formulairs/CreateEventForm";
import Home from "./pages/Home";

const router = createHashRouter([
  {
    path: '/',
    element: <LayoutApp/>,
    children: [
      { index: true, element: <Home/> },
      { path: "evenement", element: <Event/> },
      { path: "evenement/:id", element: <EventDetail/> },
      { path: "evenement/create", element: <CreateEventForm/> },
      { 
        path: "auth", 
        element: <Auth/>,
        children: [
          { index: true, element: <Login/> },
          { path: "login", element: <Login/> },
          { path: "signup", element: <Signup/> },
        ]
      },
      { path: "apropos", element: <Apropos/> },
      { path: "mes-inscriptions", element: <MesInscriptions/> },
    ]
  }
]);

const App = () => {
  return (
    <>
      <AuthProvider>
        <RegistrationProvider>
            <div className="flex flex-col items-center gap-1 w-full">
              <RouterProvider router={router} />
            </div>
        </RegistrationProvider>
      </AuthProvider>
    </>
  );
};

export default App;