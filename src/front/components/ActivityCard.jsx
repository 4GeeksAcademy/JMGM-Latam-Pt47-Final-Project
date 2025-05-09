import React from 'react'

const ActivityCard = () => {
    return (
        <div className="card d-flex p-2 text-start px-4" style={{ width: "40%" }}>
            <h5 className=''>Ordenó <b className='text-primary'>x</b> productos</h5>
            <div className='row'>
                <div className='col-2'>
                    <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" style={{ width: "50px", height: "50px" }} />
                </div>
                <div className="col">
 <div className='py-3 text-start'>
    CLIENTNAME &emsp; &emsp;- &emsp;&emsp; <b className='text-primary'> hace 6 minutos</b>
 </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityCard