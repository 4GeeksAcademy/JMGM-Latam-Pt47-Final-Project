import { Outlet, useNavigate } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import LateralMenu from "../components/LateralMenu"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect } from "react"

export const DashboardLayout = () => {
    const navigate= useNavigate()
    const { store }= useGlobalReducer()
    useEffect(()=>{
        if (!store.currentUser) navigate("/")
    },[])
    return (

        <ScrollToTop>
            <Navbar />
            <div className="d-flex row me-0">
                <div className="col-2 p-0">
                    <LateralMenu />
                </div>
                <div className="col-10 p-0">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </ScrollToTop>
    )
}