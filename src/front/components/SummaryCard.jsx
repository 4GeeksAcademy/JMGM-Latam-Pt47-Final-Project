import React from 'react'

export const SummaryCard = () => {
    return (
        <div className="card d-flex p-2 text-start px-4" style={{ width: "40%" }}>
            <div className='d-flex'>
                <div className='mx-2' style={{ minWidth: "50px" }}>
                    <img className='rounded-circle my-3' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" style={{ width: "50px", height: "50px" }} />
                </div>
                <div className="col">
                    <div className='mx-3 py-3 text-start'>
                        <b>CLIENTNAME</b>
                        <br />
                        <p className='text-body-secondary'> hace 6 minutos</p>
                    </div>
                </div>
            </div>
        </div>
    )
}