import React from 'react';
import { LandingNavbar } from './LandingNavbar';
import { Footer } from './Footer';

function AboutUs() {
    return <>
        <LandingNavbar />

            <div className="container-fluid mt-5 card text-center" style={{background: "#F5FFFA", border: 'solid 3px' }}>
                <div className="row g-0 align-items-center">
                    <div className="col-md-6">
                        <img src="https://cdn.pixabay.com/photo/2018/01/11/06/26/construction-3075498_1280.jpg" className="img-fluid rounded-start" alt="https://cdn.pixabay.com/photo/2018/01/11/06/26/construction-3075498_1280.jpg" />
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <div className="card-body card-text-center" style={{ minHeight: '200px' }}>
                            <h1 className="card-title" style={{ fontFamily: 'Geneva' }}>Sobre nuestra empresa</h1>
                            <p className="card-text" style={{ fontFamily: 'Geneva' }}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text" style={{ fontFamily: 'Geneva' }}><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>

        <div className="container-fluid mt-2 card text-center" style={{background: '#f8eced',  border: 'solid 3px'}}>
            <div className="row g-0 flex-row-reverse align-items-center">
                <div className="col-md-6">
                    <img src="https://cdn.pixabay.com/photo/2018/01/11/06/26/construction-3075498_1280.jpg" className="img-fluid rounded-end" alt="..."/>
                </div>
                <div className="col-md-6  align-items-center justify-content-center">
                    <div className="card-body">
                        <h1 className="card-title" style={{ fontFamily: 'Geneva' }}>Nuesta mision</h1>
                        <p className="card-text" style={{ fontFamily: 'Geneva' }}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text" style={{ fontFamily: 'Geneva' }}><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default AboutUs