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
					<img src={logo} 
					type="button" 
					onClick={()=>{navigate("/")}}
					alt="Logo" 
					width="105" 
					height="40" 
					className="d-inline-block align-text-top"></img>
					<form className="d-flex" role="search">
						<img src={profile} alt="Logo" width="60" height="50" 
						className="d-inline-block align-text-top mt-1" style={{paddingRight: "10px"}}></img>
						<button className="btn btn-danger w-70"
							onClick={() => {
								localStorage.removeItem("token")
								localStorage.removeItem('currentUser')
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