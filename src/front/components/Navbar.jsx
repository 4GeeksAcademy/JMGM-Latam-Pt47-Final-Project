import { Link } from "react-router-dom";
import logo from "./../assets/img/logo.png"
import profile from "./../assets/img/profile.png"
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
export const Navbar = () => {
	const navigate= useNavigate()
	const {dispatch}= useGlobalReducer()
	return (
		<>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<img src={logo} type="button" alt="Logo" width="105" height="40" className="d-inline-block align-text-top"></img>
					<form className="d-flex" role="search">
						<img src={profile} alt="Logo" width="50" height="50" className="d-inline-block align-text-top mt-1"></img>
						<input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
						<button className="btn btn-danger w-75"
							onClick={() => {
								localStorage.removeItem("token")
								dispatch({
									type: "set_current_user",
									payload: null
								})
								navigate("/")
							}}
						>Cerrar Sesion</button>
					</form>
				</div>
			</nav>
		</>
	);
};