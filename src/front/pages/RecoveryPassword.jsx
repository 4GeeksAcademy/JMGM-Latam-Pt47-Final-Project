import React, { useState } from 'react'
import logo from './../assets/img/logo.png'
import { Footer } from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'

const backend_url = import.meta.env.VITE_BACKEND_URL;

const RecoveryPassword = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [recovery, setRecovery] = useState({
        password: "",
        confirm_password: ""
    })
    function recoveryPassword() {
        if (recovery.confirm_password != recovery.password) {
            return Swal.fire({
                icon: "error",
                title: "Algo salio mal!",
                text: "Las contraseñas no coinciden.",
            });
        }
        fetch(`${backend_url}/recovery/${params.uuid}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(recovery)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    Swal.fire({
                        title: "Contraseña recuperada exitosamente!",
                        icon: "success",
                        draggable: true
                    });
                    navigate("/loginuser")
                } else {
                    alert(data.msg)
                    Swal.fire({
                        icon: "error",
                        title: "Oops... ¡Ah ocurrido un error!",
                        text: (data.msg),
                    });
                }
            })
            .catch((err) => { return err })
    }
    return (
        <>
            <form className="container text-center recovery">
                <div className="mb-3">
                    <h3 for="exampleInputEmail1" className="form-label">Nueva Contraseña</h3>
                    <input type="password"
                        value={recovery.password}
                        onChange={(e) => setRecovery({ ...recovery, password: e.target.value })}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <h3 for="exampleInputPassword1" className="form-label">Reingrese nueva contraseña</h3>
                    <input type="password"
                        value={recovery.confirm_password}
                        onChange={(e) => setRecovery({ ...recovery, confirm_password: e.target.value })}
                        className="form-control"
                        id="exampleInputPassword1" />
                    {recovery.confirm_password.length > 0 && (
                        <p className='mt-2' style={{ color: recovery.password === recovery.confirm_password ? 'green' : 'red' }}>
                            {recovery.password === recovery.confirm_password ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                        </p>
                    )}
                </div>
                <button type="button"
                    onClick={recoveryPassword}
                    style={{ backgroundColor: '#6C11D9' }}
                    className="btn">Submit</button>
            </form>
        </>
    )
}
export default RecoveryPassword