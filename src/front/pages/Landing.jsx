import React from 'react'
import LandingBanner from '../components/LandingBanner'
import FeatureCard from '../components/FeatureCard'
import AboutUs from '../components/AboutUs'

export const Landing = () => {
    return (
        <>
            <LandingBanner />
            <div id="features" className='my-4'/>
            <div className='pt-4'>
                <h2 className='fw-bold text-center' style={{color:"#6C11D9"}}>Transforma la manera en la que gestionas tu inventario</h2>
            </div>
            <div className='d-flex p-4 mx-2 justify-content-evenly'>
                <FeatureCard className="col-4"/>
                <FeatureCard className="col-4"/>
                <FeatureCard className="col-4"/>
            </div>
            <div id="about-us">
            <AboutUs></AboutUs>
            </div>
            <div id="faq">

            </div>
        </>

    )
}