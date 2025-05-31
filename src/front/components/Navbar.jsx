import { Link } from "react-router-dom";
import logo from "./../assets/img/logo.png"
import profile from "./../assets/img/profile.png"
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useEffect, useState } from 'react'

export const Navbar = () => {
	const navigate = useNavigate()
	const { dispatch } = useGlobalReducer()
	const [company, setCompany] = useState()
	const [email, setEmail] = useState()
	const backendUrl = import.meta.env.VITE_BACKEND_URL

	const userInfo = () => {

		let accessToken = localStorage.getItem("token")
		if (!accessToken) {
			setError("No se encontró el token de autenticación. Por favor, inicia sesión.")
			setLoading(false)
			return
		}

		fetch(`${backendUrl}/user`, {
			method: 'GET',
			headers: {
				"Authorization": `Bearer ${accessToken}`
			}
		})
			.then(resp => resp.json())
			.then((data) => {
				console.log("Success!!", data)
				if (data) {
					setCompany(data.user.company)
					setEmail(data.user.email)
				} else {

					throw new Error("Formato de datos de usuario inesperado del servidor.")
				}
			})
			.catch(error => console.log(error))
	}

	useEffect(() => {
		userInfo()
		document.title = "MyStock"
	}, []);

	return (
		<>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<img src={logo}
						type="button"
						onClick={() => { navigate("/") }}
						alt="Logo"
						width="105"
						height="40"
						className="d-inline-block align-text-top"></img>
					<form className="d-flex" role="search">
						<div className="btn-group">
							<button className="btn btn-sm d-flex" type="button" onClick={() => { navigate("/app/perfil") }}>
								<img src={profile} alt="Logo" width="60" height="50"
									className="d-inline-block align-text-top mt-1" style={{ paddingRight: "10px" }}></img>
								<p className="text-start fw-light mb-0 me-2"><b className="fs-6 fw-bold">{company}</b>
									<br></br>
									{email}</p>
							</button>
							<button type="button" className="btn btn-sm dropdown-toggle-split rounded logout" style={{ backgroundColor: '#dc3545', color: "white" }} 
							data-bs-toggle="dropdown" aria-expanded="false" >
								<i className="fa-solid fa-right-from-bracket" />
							</button>
							<ul className="dropdown-menu dropdown-menu-end" style={{backgroundColor:"#dc3545", color:"white"}}>
								<li>
									<a className="dropdown-item text-white logout"
										onClick={() => {
											localStorage.removeItem("token")
											localStorage.removeItem('currentUser')
											dispatch({
												type: "set_current_user",
												payload: null
											})
											navigate("/")
										}}>
										<b>Cerrar Sesión</b>
									</a>
								</li>
							</ul>
						</div>
					</form>
				</div>
			</nav>
		</>
	);
};