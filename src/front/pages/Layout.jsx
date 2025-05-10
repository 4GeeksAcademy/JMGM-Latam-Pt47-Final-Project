import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { LandingNavbar } from "../components/LandingNavbar"
import { Footer } from "../components/Footer"

export const Layout = () => {
    return (
        <ScrollToTop>
            <LandingNavbar />
            <div style={{paddingTop:"5.5rem"}}>
            <Outlet />
            </div>
            <Footer />
        </ScrollToTop>
    )
}