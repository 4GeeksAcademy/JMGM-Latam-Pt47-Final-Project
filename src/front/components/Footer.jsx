import { Link, Navigate } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center border-top">
		<div className="container-fluid d-flex justify-content-between mb-2">
			<div className="col-3 d-flex justify-content-start px-4">
				<img src="https://media.discordapp.net/attachments/873387605981544468/1369481575460241459/
				LogoMystock.png?ex=681c049b&is=681ab31b&hm=582c044290e6d4ef2b5359786c8da8c3b83d8a4210e484ac75f909242b76109f&=&format=webp&quality=lossless" style={{ width: "7vw" }} />
			</div>
			<div className="d-flex justify-content-end px-5">
				<button type="button" class="btn" href="/">Homepage</button>
				<button type="button" class="btn" href="/">Inicio</button>
				<button type="button" class="btn" href="/">Configuración</button>
				<button type="button" class="btn" href="/">Perfil</button>
				<button type="button" class="btn" href="/">Contáctanos</button>
			</div>
		</div>
		<div className="container-fluid d-flex justify-content-between">
			<div className="col-3">
				<p className="text-start px-5">¡Gestiona tu inventario de la mejor manera!
					<br />
					Visualiza tu Stock en MyStock</p>
			</div>
			<div className="d-flex justify-content-end px-5 fs-4">
				<button type="button" className="btn btn-link"><i className="fa-brands fa-square-facebook fs-2" /></button>
				<button type="button" className="btn btn-link"><i className="fa-brands fa-square-instagram fs-2" /></button>
				<button type="button" className="btn btn-link"><i class="fa-brands fa-square-twitter fs-2" /></button>
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
);
