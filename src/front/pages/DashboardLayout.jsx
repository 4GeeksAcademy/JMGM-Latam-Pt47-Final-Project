import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import LateralMenu from "../components/LateralMenu"

export const DashboardLayout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <div className="d-flex row">
                <div className="col-3">
                    <LateralMenu />
                </div>
                <div className="col-9">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </ScrollToTop>
    )
}