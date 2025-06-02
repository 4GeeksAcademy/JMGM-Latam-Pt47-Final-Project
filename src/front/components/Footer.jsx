import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/img/logo.png"



export const Footer = () => {
	const navigate = useNavigate()
	return (
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
					<button type="button" className="btn btn-link"><i className="fa-brands fa-square-facebook fs-2" style={{ color: "#6C11D9" }} /></button>
					<button type="button" className="btn btn-link"><i className="fa-brands fa-square-instagram fs-2" style={{ color: "#6C11D9" }} /></button>
					<button type="button" className="btn btn-link"><i className="fa-brands fa-square-twitter fs-2" style={{ color: "#6C11D9" }} /></button>
				</div>
			</div>
			<div className="container border-top">
			</div>
			<div className="d-flex justify-content-between mx-5 my-2">
								{/* <!-- Privacidad modal --> */}
				<button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#privacyModal">Política de Privacidad</button>


				{/* <!-- Modal --> */}
				<div class="modal fade" id="privacyModal" tabindex="-1" aria-labelledby="TerminosModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
						<div class="modal-content">
							<div class="modal-header">
								<h1 class="modal-title fs-5 fw-bold" id="TerminosModalLabel">POLÍTICA DE PRIVACIDAD</h1>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body text-start">
							<h3>Política de Privacidad de MyStock</h3><br/>

Su privacidad es importante para nosotros. La política de MyStock es respetar su privacidad y cumplir con todas las leyes y regulaciones aplicables con respecto a cualquier información personal que recopilemos sobre usted, incluyendo nuestro sitio web, www.mystock.ve, y otros sitios web que poseemos y operamos.

Esta política entra en vigor a partir del 02 de Junio de 2025 y se actualizó por última vez esta misma fecha.
<br/><br/><h5>Información que Recopilamos</h5>

La información que recopilamos incluye tanto la que usted nos proporciona consciente y activamente al usar o participar en cualquiera de nuestros servicios y promociones, como cualquier información enviada automáticamente por sus dispositivos al acceder a nuestros productos y servicios.

<br/><br/><h5>Datos de Registro</h5>
Cuando visita nuestro sitio web, nuestros servidores pueden registrar automáticamente los datos estándar proporcionados por su navegador web. Estos pueden incluir la dirección IP de su dispositivo, el tipo y la versión de su navegador, las páginas que visita, la hora y fecha de su visita, el tiempo dedicado a cada página, otros detalles sobre su visita y detalles técnicos relacionados con cualquier error que pueda encontrar.

<br/><br/>Tenga en cuenta que, si bien esta información puede no ser personalmente identificable por sí misma, es posible combinarla con otros datos para identificar personalmente a personas individuales.
Información Personal

<br/><br/>Podemos solicitar información personal, que puede incluir uno o más de los siguientes datos:

<br/><br/>Nombre
<br/>Correo electrónico
<br/>Perfiles en redes sociales
<br/>Fecha de nacimiento
<br/>Número de teléfono móvil
<br/>Dirección particular

<br/><br/>Razones legítimas para el procesamiento de su información personal

<br/><br/>Solo recopilamos y utilizamos su información personal cuando tenemos una razón legítima para hacerlo. En ese caso, solo recopilamos la información personal que sea razonablemente necesaria para prestarle nuestros servicios. Recopilación y uso de información

<br/><br/>Podemos recopilar información personal suya cuando realiza alguna de las siguientes acciones en nuestro sitio web:

<br/><br/>Participa en nuestros concursos, sorteos y encuestas
<br/>Se registra para recibir nuestras actualizaciones por correo electrónico o redes sociales
<br/>Utiliza un dispositivo móvil o un navegador web para acceder a nuestro contenido
<br/>Contáctanos por correo electrónico, redes sociales o cualquier tecnología similar
<br/>Cuando nos menciona en redes sociales

<br/><br/>Podemos recopilar, almacenar, utilizar y divulgar información para los siguientes fines, y la información personal no se procesará de forma incompatible con estos fines:

<br/><br/>Para permitirle personalizar su experiencia en nuestro sitio web
<br/>Para contactarle y comunicarnos con usted
<br/>Para análisis, estudios de mercado y desarrollo empresarial, incluyendo la operación y mejora de nuestro sitio web, aplicaciones asociadas y plataformas de redes sociales
<br/>Para publicidad y marketing, incluyendo el envío de información promocional sobre nuestros productos y servicios e información sobre terceros que consideremos que puedan ser de su interés
<br/>Para considerar su solicitud de empleo
<br/>Para permitirle acceder y utilizar nuestro sitio web, aplicaciones asociadas y plataformas de redes sociales
<br/>Para el mantenimiento de registros internos y fines administrativos Fines

<br/>Para realizar concursos, sorteos y/u ofrecerle beneficios adicionales

<br/>Para cumplir con nuestras obligaciones legales y resolver cualquier disputa que podamos tener

<br/>Para la seguridad y la prevención del fraude, y para garantizar que nuestros sitios y aplicaciones sean seguros y se utilicen de acuerdo con nuestros términos de uso

<br/>Tenga en cuenta que podemos combinar la información que recopilamos sobre usted con información general o datos de investigación que recibimos de otras fuentes confiables.

<br/>Seguridad de su información personal

<br/>Cuando recopilamos y procesamos información personal, y mientras la conservamos, la protegemos con medios comercialmente aceptables para evitar pérdidas y robos, así como el acceso, la divulgación, la copia, el uso o la modificación no autorizados.


<br/><br/>Si bien haremos todo lo posible para proteger la información personal que nos proporcione, le advertimos que ningún método de transmisión o almacenamiento electrónico es 100% seguro y nadie puede garantizar la seguridad absoluta de los datos. Cumpliremos con las leyes que nos sean aplicables en relación con cualquier filtración de datos.

<br/>Usted es responsable de seleccionar cualquier contraseña y de su nivel de seguridad general, garantizando así la seguridad de su información dentro del alcance de nuestros servicios. Cuánto tiempo conservamos su información personal

<br/>Conservamos su información personal solo el tiempo que sea necesario. Este periodo puede depender del uso que le demos, de acuerdo con esta política de privacidad. Si su información personal ya no es necesaria, la eliminaremos o la haremos anónima eliminando todos los datos que le identifiquen.

<br/>Sin embargo, si es necesario, podremos conservar su información personal para cumplir con una obligación legal, contable o de presentación de informes, o con fines de archivo en interés público, con fines de investigación científica o histórica o con fines estadísticos.
<br/><br/>Nuestro sitio web puede enlazar a sitios externos que no operamos. Tenga en cuenta que no tenemos control sobre el contenido ni las políticas de dichos sitios, y no nos hacemos responsables de sus respectivas prácticas de privacidad.
Cambios a esta Política

<br/>A nuestra discreción, podemos cambiar nuestra política de privacidad para reflejar actualizaciones en nuestros procesos comerciales, prácticas aceptables actuales o cambios legislativos o regulatorios. Si decidimos cambiar esta política de privacidad, publicaremos los cambios aquí, en el mismo enlace desde el que accede a esta política de privacidad.

<br/><br/>Si la ley lo exige, solicitaremos su permiso o le daremos la oportunidad de aceptar o rechazar, según corresponda, cualquier nuevo uso de su información personal. Contáctenos

<br/><br/>Si tiene alguna pregunta o inquietud sobre su privacidad, puede contactarnos a help@mystock.com

							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
							</div>
						</div>
					</div>
				</div>


				<button type="button" className="btn" aria-disabled="true">© 2025 MyStock WebApp S.A.</button>
				{/* <!-- Terminos modal --> */}
				<button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">Términos & Condiciones</button>


				{/* <!-- Modal --> */}
				<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
						<div class="modal-content">
							<div class="modal-header">
								<h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">TERMINOS Y CONDICIONES</h1>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body text-start">
								<h5>Introducción</h5><br/>
<b>1.1 Declaración de Propósito:</b> ¡Bienvenido a MyStock! Nuestros Términos y Condiciones establecen las reglas para el uso de nuestros servicios, promoviendo la equidad y la transparencia en nuestra comunidad digital.
<br/>
<b>1.2 Cláusula de Aceptación:</b> Al usar nuestra plataforma, usted acepta los términos descritos en estos Términos y Condiciones. Su uso continuado implica su comprensión y aceptación de estas condiciones.
<br/><br/><h5>Derechos y Responsabilidades del Usuario</h5><br/>
<b>2.1 Conducta del Usuario:</b> Se espera que los usuarios se comporten de manera respetuosa y legal en nuestra plataforma. Las infracciones pueden conllevar las consecuencias descritas en la Sección 7, lo que garantiza un entorno en línea positivo y seguro.
<br/><b>2.2 Seguridad de la Cuenta: </b>Proteger su cuenta es crucial. Los usuarios son responsables de mantener la seguridad de sus cuentas y contraseñas, contribuyendo así a la seguridad general de nuestra comunidad digital.
<br/><br/><h5>Descripción del Servicio</h5><br/>
<b>3.1 Resumen de los Servicios:</b> En MyStock, ofrecemos una plataforma dinamica de administración de inventarios. Manténgase informado sobre cualquier cambio a través de nuestra Cláusula de Modificaciones para disfrutar de una experiencia de usuario fluida. 
<br/>3.2 Cláusula de Modificaciones: Nos reservamos el derecho a modificar o discontinuar los servicios para mejorarlos. Se notificará a los usuarios sobre cambios significativos, manteniendo la transparencia y la información del usuario.
<br/><br/><h5>Condiciones de Pago</h5>
<br/><b>4.1 Estructura de Tarifas:</b> Los usuarios aceptan pagar las tarifas especificadas por nuestros servicios. Los métodos de pago aceptados incluyen transferencias, tarjetas de crédito y Paypal, lo que garantiza un proceso de transacción financiera sencillo.
<br/><b>4.2 Políticas de Facturación:</b> La facturación se realiza de manera mensual según los criterios escogidos por el usuario, siendo la via principal la subscripción. Familiarícese con nuestras políticas de facturación para evitar interrupciones y gestionar su compromiso financiero.
<br/><br/><h5>Integración con la Política de Privacidad</h5>
<br/><b>5.1 Manejo de Datos:</b> Gestionamos los datos de los usuarios según lo descrito en nuestra Política de Privacidad, respetando su privacidad y cumpliendo con la normativa de protección de datos.
<br/><b>6.1 Declaración de Propiedad:</b> MyStock conserva la propiedad de toda la propiedad intelectual, lo que garantiza un entorno seguro e innovador para nuestra comunidad. 6.2 Derechos de Contenido del Usuario: Los usuarios otorgan a MyStock derechos para usar el contenido que generan en nuestra plataforma, buscando un equilibrio entre el contenido generado por el usuario y los intereses de la plataforma.
<br/><br/><h5>Terminación y Suspensión</h5>
<br/><b>7.1 Causales de Terminación:</b> Podemos cancelar cuentas por mal uso de la aplicación, irregularidades en el pago o incumplimiento de la ley. El cumplimiento de las normas de nuestra comunidad garantiza un entorno en línea positivo para todos.
<br/><b>7.2 Consecuencias de la Terminación:</b> La terminación puede resultar en la perdida de datos asociados a su cuenta. El cumplimiento garantiza el acceso ininterrumpido a nuestros servicios y fomenta una comunidad en línea saludable.
<br/><br/><h5>Resolución de Disputas</h5>
<br/><b>8.1 Métodos de Resolución:</b> Las disputas se resolverán mediante el proceso de arbitraje/mediación estipulado por la ley, lo que garantiza un mecanismo de resolución de conflictos justo y eficiente.
<br/><b>8.2 Cláusula de Jurisdicción:</b> La ley aplicable para disputas es la ley de Venezuela, lo que proporciona claridad jurídica y establece expectativas para los usuarios.
<br/><br/>
Al utilizar nuestros servicios, usted reconoce haber leído y aceptado estos <b>Términos y Condiciones.</b>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
							</div>
						</div>
					</div>
				</div>


			</div>
		</footer>
	)
};
