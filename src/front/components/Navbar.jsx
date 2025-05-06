import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<>
		<nav classname="navbar navbar-expand-lg bg-body-tertiary">
			<div classname="container-fluid">
				<a classname="navbar-brand" href="#">Navbar</a>
					<form classname="d-flex" role="search">
						<input classname="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
						<button classname="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
		</nav>
		</>
	);
};