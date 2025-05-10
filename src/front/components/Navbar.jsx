import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
				<img src="src/front/assets/img/logo.png" type="button" alt="Logo" width="105" height="40" className="d-inline-block align-text-top"></img>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
						<img src="src/front/assets/img/profile.png" alt="Logo" width="32" height="30" className="d-inline-block align-text-top mt-1"></img>
					</form>
				</div>
			</nav>
		</>
	);
};