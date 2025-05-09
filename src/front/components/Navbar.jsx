import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
				<img src="https://media.discordapp.net/attachments/873387605981544468/1369481575460241459/LogoMystock.png?ex=681c049b&is=681ab31b&hm=582c044290e
				6d4ef2b5359786c8da8c3b83d8a4210e484ac75f909242b76109f&=&format=webp&quality=lossless" type="button" alt="Logo" width="105" height="40" className="d-inline-block align-text-top"></img>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
						<img src="https://media.discordapp.net/attachments/873387605981544468/1369472019015667844/AdobeStock_692347763.png?ex=681bfbb4&is=681aaa34&hm=75f3a27ec89cff7
							32d28e294998809aea764e186287d16156f79da92087ef80f&=&format=webp&quality=lossless&width=963&height=968" alt="Logo" width="32" height="30" className="d-inline-block align-text-top mt-1"></img>
					</form>
				</div>
			</nav>
		</>
	);
};