// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Landing } from "./pages/Landing";
import { DashboardLayout } from "./pages/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { InventoryView } from "./pages/InventoryView";
import { LayoutLanding } from "./pages/LayoutLanding";
import LoginUser from "./components/LoginUser";
import PerfilUser from "./components/PerfilUser";
import Clientes from "./pages/Clientes";
import Register from "./components/Register";
import AboutUs from "./components/AboutUs";
import { EnConstruccion } from "./components/EnConstruccion"
import RecoveryPassword from "./pages/RecoveryPasswrod";
export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.


    // Root Route: All navigation will start from here.
    <>

      // Root Route: All navigation will start from here.
      // Pagina que no necesite un usuario logeado van aqui
      <>
        <Route path="/" element={<LayoutLanding />} errorElement={<h1>Not found!</h1>} >



          {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
          <Route path="/" element={<Landing />} />

        </Route>
        <Route path="/recovery" element={<RecoveryPassword/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/loginuser" element={<LoginUser />} />
        <Route path="/app" element={<DashboardLayout />}>
        
        
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/inventario" element={<InventoryView />} />
          <Route path="/app/perfil" element={<PerfilUser />} />
          <Route path="/app/clientes" element={<Clientes />} />
          
        </Route>
      </>
    </>
  )
);