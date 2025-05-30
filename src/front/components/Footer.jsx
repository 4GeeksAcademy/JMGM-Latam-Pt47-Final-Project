import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/img/logo.png"



export const Footer = () => {
	const navigate = useNavigate()
	return(
	<footer className="footer mt-auto py-3 text-center border-top" style={{ backgroundColor: "white" }}>
		<div className="container-fluid d-flex justify-content-between mb-2">
			<div className="col-3 d-flex justify-content-start px-4">
				<img src={logo} type="button" alt="Logo" width="105" height="40" className="d-inline-block align-text-top"></img>
			</div>
			<div className="d-flex justify-content-end px-5">
				<button type="button" className="btn" href="/" onClick={() => { navigate("/") }}>Homepage</button>
				<button type="button" className="btn" href="/" onClick={() => { navigate("/app") }}>Inicio</button>
				<button type="button" className="btn" href="/" onClick={() => { navigate("/app/perfil") }}>Perfil</button>
				<button type="button" className="btn" href="/" onClick={() => { navigate("/") }}>Contáctanos</button>
			</div>
		</div>
		<div className="container-fluid d-flex justify-content-between">
			<div className="col-3">
				<p className="text-start px-5">¡Gestiona tu inventario de la mejor manera!
					<br />
					Visualiza tu Stock en MyStock</p>
			</div>
			<div className="d-flex justify-content-end px-5 fs-4">
				<button type="button" className="btn btn-link"><i className="fa-brands fa-square-facebook fs-2" style={{color:"#6C11D9"}} /></button>
				<button type="button" className="btn btn-link"><i className="fa-brands fa-square-instagram fs-2" style={{color:"#6C11D9"}} /></button>
				<button type="button" className="btn btn-link"><i className="fa-brands fa-square-twitter fs-2" style={{color:"#6C11D9"}} /></button>
			</div>
		</div>
		<div className="container border-top">
		</div>
		<div className="d-flex justify-content-between mx-5 my-2">
			<button type="button" className="btn btn-link">Política de Privacidad</button>
			<button type="button" className="btn" aria-disabled="true">© 2025 MyStock WebApp S.A.</button>
			<button type="button" className="btn btn-link">Términos & Condiciones</button>
		</div>
	</footer>
	)
};
