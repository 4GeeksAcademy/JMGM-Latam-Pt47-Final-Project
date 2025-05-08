import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
<<<<<<< HEAD
import LateralMenu from "../components/LateralMenu"

=======
import EnConstruccion from "../components/EnConstruccion"
>>>>>>> db7b6ea60613c08e5d5d595385fbbff0a7f72c1e

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
<<<<<<< HEAD
        <ScrollToTop>
            <Navbar />
            <LateralMenu />
            <Footer />
        </ScrollToTop>
=======
       <EnConstruccion/>
>>>>>>> db7b6ea60613c08e5d5d595385fbbff0a7f72c1e
    )
}