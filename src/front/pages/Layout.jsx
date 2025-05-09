import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import LateralMenu from "../components/LateralMenu"

export const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <LateralMenu />
            <Footer />
        </ScrollToTop>
    )
}