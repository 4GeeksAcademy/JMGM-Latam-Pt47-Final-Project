import React from 'react'

const FeatureCard = () => {
    return (
        <div className="card mb-3" style={{maxWidth: "18rem", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"}}>
            <img src="src/front/assets/img/placeholder.png" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title fw-bold">Primary card title</h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu viverra sem, in gravida velit. Quisque faucibus rutrum velit, eu molestie dolor interdum sed. Donec elementum tristique vehicula. Nulla consequat laoreet sapien, ac ornare ligula molestie quis.</p>
            </div>
        </div>
    )
}

export default FeatureCard