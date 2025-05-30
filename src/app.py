"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, CompanyInfo, Inventory, Compras
from api.models import db, CompanyInfo, Inventory, Clients, Compras, User, RecoveryPassword
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from datetime import datetime, timedelta

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity, get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
import uuid

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_KEY")
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
url_frontend = os.getenv("VITE_FRONTEND_URL")
CORS(app)
app.config.update(dict(
    DEBUG=False,
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False,
    MAIL_USERNAME='mystock4geeks@gmail.com',
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD')
))
mail = Mail(app)


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response
# current_company_id = current_user['company_id']
#         clientes = Clients.query.filter_by(companyId=current_company_id).all()
#         all_clientes = list(
#             map(lambda clientes: clientes.serialize(), clientes))
#         return jsonify({'clientes': all_clientes}), 200


@app.route('/compras', methods=['GET'])
@jwt_required()
def compras():
    current_user = get_jwt()
    current_company_id = current_user['company_id']
    user = Clients.query.filter_by(companyId=current_company_id).first()
    if user is None:
        return jsonify({'msg': 'Usuario no existe'}), 400
    compras = Compras.query.filter_by(companyId=current_company_id).all()
    all_compras = list(map(lambda compras: compras.serialize(), compras))
    # UNIDADES_MES = [ENERO, FEBRERO, MARZO, ... , DICIEMBRE]
    unidades_mes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for compra in all_compras:
        unidades_mes[compra.get("fecha_compra").month-1] = unidades_mes[compra.get(
            "fecha_compra").month-1] + compra.get("cantidad")

    return jsonify({'compras': all_compras, "mes_compra": unidades_mes}), 200


@app.route('/send-mail', methods=['POST'])
def send_mail():
    body = request.get_json(silent=True)
    if not body:
        return jsonify({'msg': 'Debe enviar informacion'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'Debe enviar un correo'}), 400
    user = User.query.filter_by(email=body['email']).first()
    if user is None:
        return jsonify({'msg': 'Usuario no existe'}), 400

    msg = Message(
        subject='Correo enviado desde el endpoint',
        sender='mystock4geeks@gmail.com',
        recipients=[body['email']],
    )
    reset_uuid = str(uuid.uuid4())
    send_correo = RecoveryPassword()
    send_correo.email = body['email']
    send_correo.uuid = reset_uuid
    send_correo.fecha = datetime.now() + timedelta(hours=0.5)
    url_reset = f"{url_frontend}recovery/{reset_uuid}"
    msg.html = f'''<a href= {url_reset}>Reestablece tu contraseña aqui</a>'''
    mail.send(msg)
    db.session.add(send_correo)
    db.session.commit()
    return jsonify({'ok': 'Correo enviado'}), 200


@app.route('/recovery/<uuid>', methods=['PUT'])
def reset(uuid):

    verify_uuid = RecoveryPassword.query.filter_by(uuid=uuid).first()
    print(verify_uuid)
    if verify_uuid is None:
        return jsonify({'msg': 'Sin autorizacion'}), 400
    if not verify_uuid.fecha > datetime.now():
        return jsonify({'msg': 'uuid expirado'}), 400
    email = verify_uuid.email
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'msg': 'Usuario no existe'}), 400
    data = request.get_json(silent=True)
    if 'password' in data:
        user.password = bcrypt.generate_password_hash(
            data['password']).decode('utf-8')
    db.session.commit()
    return jsonify({'ok': 'Contraseña actualizada.'}), 200


@app.route('/user', methods=['GET'])
@jwt_required()
def user_id():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if user is None:
        return jsonify({'msg': 'El usuario no existe'}), 400
    return jsonify({'msg': 'ok', 'user': user.serialize()}), 200


# ---COMPANY INFO ENDPOINTS---
## -- Colocar token y verificar que el email sea de un admin--#
# -- preguntar como hacer--#
# @app.route('/companiesinfo', methods= ['GET'])
# @jwt_required()
# def get_companies():
#     company_id = get_jwt()
#     companies= CompanyInfo.query.filter_by(id = company_id).first()
#     all_company = list(map(lambda company: company.serialize(), companies))
#     return jsonify({'data' : all_company}), 200

# ##-- Colocar token y verificar que el email sea de un admin--#
# #-- preguntar como hacerlo--#
# @app.route('/companyinfo/<int:id>', methods = ['GET'])
# @jwt_required()
# def get_company_id(id):
#     company = CompanyInfo.query.filter_by(id=id).first()
#     if company:
#         return jsonify(company.serialize())

#     return jsonify({'msg': 'Company not found'}), 404

## -- Colocar token y verificar que el inventario le pertenezca a la compañia--#
# -- Verificar la cantidad de stock existente --#
# -- Listo--#
@app.route('/inventory/stock/<int:id>/<int:quantity>', methods=['DELETE'])
@jwt_required()
def delete_stock(id, quantity):
    current_user = get_jwt()
    current_company_id = current_user['company_id']
    product = Inventory.query.filter_by(id).first()
    if product.companyID != current_company_id:
        return jsonify({'msg': 'No tiene permiso para eliminar productos del inventario'}), 400
    if quantity > product.stock:
        return ({'msg': 'La cantidad es superior a la solicitada'}), 400

    try:
        product.stock = product.stock - quantity
        db.session.commit()
        return jsonify({'msg': 'Producto rebajado con exito', 'producto': product.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error eliminando Stock', 'error': str(e)}), 400
    finally:
        db.session.close()

# -- Verificar token
# verificar que el cliente corresponde a la compañia
# verificar que el producto corresponde a la compañia
# agregar fecha--#


@app.route('/compra/<int:id_client>', methods=['POST'])
@jwt_required()
def compra(id_client):
    token_data = get_jwt()
    company_id = token_data['company_id']
    print({'company_id': company_id})
    client = Clients.query.filter_by(id=id_client).first()
    print({'client': client.companyId})
    if company_id != client.companyId:
        return jsonify({'msg': 'Not found'}), 400
    """
        {
        "product_ID",
        "fecha_compra",
        "cantidad"}
    """
    body = request.get_json(silent=True)
    if not body:
        return jsonify({'msg': 'Debe enviar informacion en el body'}), 400
    if 'product_id' not in body:
        return jsonify({'msg': 'Debe enviar el id del producto'}), 400
    if 'cantidad' not in body:
        return jsonify({'msg': 'Debe enviar la cantidad solicitada'}), 400
    client = Clients.query.get(id_client)
    if client is None:
        return jsonify({'msg': 'Usuario no encontrado'}), 400

    producto = Inventory.query.get(body['product_id'])
    if producto is None:
        return jsonify({'msg': 'Producto no encontrado'}), 400

    if body['cantidad'] > producto.stock:
        return jsonify({'msg': 'Cantidad no disponible'}), 400

    new_compra = Compras()
    new_compra.productsId = body['product_id']
    new_compra.cantidad = body['cantidad']
    new_compra.fecha_compra = datetime.now()
    new_compra.clientsId = id_client
    new_compra.companyId = company_id
    producto.stock = producto.stock - body['cantidad']

    try:
        db.session.add(new_compra)
        db.session.commit()
        return jsonify(new_compra.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al generar la compra', 'error': str(e)}), 400
    finally:
        db.session.close()

# ---- Endpoints de clientes ----- #
# -- Verificar token de compañia -- #
# -- Get de los clientes de la compañia por la llave foranea-- #
# -- Listo -- #


@app.route('/clients', methods=['GET'])
@jwt_required()
def clients():
    try:
        current_user = get_jwt()
        current_company_id = current_user['company_id']
        clientes = Clients.query.filter_by(companyId=current_company_id).all()
        all_clientes = list(
            map(lambda clientes: clientes.serialize(), clientes))
        return jsonify({'clientes': all_clientes}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'error al crear el usuario', 'error': str(e)}), 400
    finally:
        db.session.close()

# -- Listo -- #


@app.route('/client/<int:id>', methods=['GET'])
@jwt_required()
def client_id(id):
    actual_client_id = get_jwt()
    company_id = actual_client_id['company_id']
    client = Clients.query.filter_by(id=id, companyId=company_id).first()
    if not company_id:
        return jsonify({'msg': 'No se pudo identificar la compañía'}), 401

    if client is None:
        return jsonify({'msg': 'Cliente no existe o no pertenece a esta compañía'}), 404
    return jsonify({'cliente': client.serialize()})


# -- listo -- #
@app.route('/client', methods=['POST'])
@jwt_required()
def add_client():
    token_info = get_jwt()
    current_company_id = token_info['company_id']
    company_info = CompanyInfo.query.filter_by(id=current_company_id).first()
    if current_company_id != company_info.id:
        return jsonify({'msg': 'No tienes permiso para crear un cliente'}), 400
    body = request.get_json(silent=True)
    """
    {
    "name",
    "email",
    "phone",
    }
    """
    if not body:
        return jsonify({'msg': 'Debe agregar informacion en el body'}), 400
    if 'name' not in body:
        return jsonify({'msg': 'Debe agregar el nombre del cliente'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'Debe agregar el correo del cliente'}), 400
    if 'phone' not in body:
        return jsonify({'Debe agregar el numero telefonico del cliente'}), 400
    verify_client = Clients.query.filter_by(email=body['email']).first()
    if verify_client:
        return jsonify({'msg': 'El cliente ya existe'}), 400
    new_client = Clients(
        name=body['name'],
        email=body['email'],
        phone=body['phone'],
        companyId=current_company_id
    )

    try:
        db.session.add(new_client)
        db.session.commit()
        return jsonify(new_client.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al crear nuevo cliente', 'error': str(e)}), 400
    finally:
        db.session.close()

# --Listo--#


@app.route('/client/<int:id_client>', methods=['PUT'])
@jwt_required()
def modify_client(id_client):
    client = Clients.query.filter_by(id=id_client).first()
    if client is None:
        return jsonify({'msg': 'Cliente no existe'}), 400
    data = request.get_json(silent=True)
    if 'name' in data:
        client.name = data['name']
    if 'email' in data:
        client.email = data['email']
    if 'phone' in data:
        client.phone = data['phone']
    db.session.commit()
    return jsonify({'ok': 'Cliente actualizado correctamente', 'cliente': client.serialize()})

# -- listo --#


@app.route('/client/<int:id_client>', methods=['DELETE'])
@jwt_required()
def delete_client(id_client):
    client = Clients.query.filter_by(id=id_client).first()
    if client is None:
        return jsonify({'msg': 'El cliente no existe'}), 404
    try:
        db.session.delete(client)
        db.session.commit()
        user_delete = Clients.query.all()
        all_client = list(
            map(lambda clients: clients.serialize(), user_delete))
        return jsonify({'ok': 'Cliente eliminado exitosamente', 'data': all_client}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al eliminar el cliente', 'error': str(e)}), 400
    finally:
        db.session.close()

# -- listo --#


@app.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({'msg': 'se requiere informacion en el body'}), 400
    if 'email' not in data:
        return jsonify({'msg': 'el email es requerido'}), 400
    if 'password' not in data:
        return jsonify({'msg': 'el password es requerido'}), 400
    if 'company_name' not in data:
        return jsonify({'msg': 'el nombre de la empresa es requerido'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'msg': 'el email ya existe'}), 400

    password = data.get('password')

    if len(password) < 8:
        return jsonify({'msg': 'la contraseña debe tener al menos 8 caracteres'}), 400

    new_company = CompanyInfo(
        name=data.get('company_name')
    )

    try:
        db.session.add(new_company)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'error al crear la empresa', 'error': str(e)}), 400

    new_user = User(
        email=data.get('email'),
        password=bcrypt.generate_password_hash(
            data.get('password')).decode('utf-8'),
        is_active=True,
        company_id=new_company.id
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'ok': 'Company created'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'error al crear el usuario', 'error': str(e)}), 400
    finally:
        db.session.close()


# -- Listo -- #
@app.route('/companyinfo/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_company(id):
    actual_company_id = get_jwt()
    company_id = actual_company_id['company_id']
    company = CompanyInfo.query.filter_by(id=id).first()

    if not company:
        return jsonify({'msg': 'Company not found'}), 404

    try:
        db.session.delete(company)
        db.session.commit()
        return jsonify({'msg': 'Company deleted'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error deleting company', 'error': str(e)}), 400
    finally:
        db.session.close()

# ----INVENTORY ENDPOINTS----#


# -- listo-- #
@app.route('/company/inventory', methods=['GET'])
@jwt_required()
def get_invetory_id():
    company_data = get_jwt()
    current_company_id = company_data['company_id']
    company = CompanyInfo.query.filter_by(id=current_company_id).first()

    inventory_objects = Inventory.query.filter_by(
        companyID=current_company_id).all()
    inventory_serialized = list(
        map(lambda item: item.serialize(), inventory_objects))

    if not company:
        return jsonify({'msg': 'Company not found'}), 404
    company_info = company.serialize()

    return jsonify({
        'company_id': company_info['id'],
        'company_name': company_info['name'],
        'inventory': inventory_serialized}), 200

# -- Listo -- #


@app.route('/inventory', methods=['POST'])
@jwt_required()
def create_inventory():
    data = request.get_json()
    if not data or not all(key in data for key in ('product_name', 'price', 'marca', 'stock')):
        return jsonify({'msg': 'Missing required field'}), 400

    current_user = get_jwt()
    current_company_id = current_user['company_id']

    items = Inventory.query.filter_by(
        product_name=data.get('product_name'),
        marca=data.get('marca'),
        companyID=current_company_id
    ).first()

    try:
        if items:
            items.stock += int(data.get('stock'))
            db.session.commit()
            return jsonify({'msg': 'Inventario actualizado', 'item': items.serialize()}), 200
        else:
            new_item = Inventory(
                companyID=current_company_id,
                product_name=data.get('product_name'),
                price=data.get('price'),
                marca=data.get('marca'),
                stock=data.get('stock')
            )
        db.session.add(new_item)
        db.session.commit()
        return jsonify({'msg': 'Producto creado exitosamente', 'item': new_item.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al crear un nuevo producto', 'error': str(e)}), 400
    finally:
        db.session.close()

# -- Verificar token y verificar que el inventario pertenezca a la compañia
# Y obtener el company id desde el token, y eliminarlo del body-- #


@app.route('/compras/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_compra(id):

    compra_existente = Compras.query.filter_by(id=id).first()

    if compra_existente is None:
        return jsonify({'msg': 'Buy not found'}), 404

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'msg': 'necesitas informacion en el body'}), 400
    if 'clientsId' in data:
        compra_existente.clientsId = data['clientsId']
    if 'productsId' in data:
        compra_existente.productsId = data['productsId']
    if 'cantidad' in data:
        compra_existente.cantidad = data['cantidad']
    if 'fecha_compra' in data:
        compra_existente.fecha_compra = data['fecha_compra']

    db.session.commit()
    return jsonify({'msg': 'Buy updated'}), 200

# -- listo -- ##


@app.route('/stock/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_inventory_item(product_id):
    current_user = get_jwt()
    current_company_id = current_user['company_id']
    product = Inventory.query.filter_by(id=product_id).first()
    if product.companyID != current_company_id:
        return ({'msg': 'No tienes permiso para eliminar este producto'}), 400
    if product is None:
        return jsonify({'msg': 'El producto no existe'}), 400

    # -- try expect--#
    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'ok': 'Product deleted'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'error al eliminar el producto', 'error': str(e)}), 400
    finally:
        db.session.close()

# --listo--#


@app.route('/login', methods=['POST'])
def login():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'Debe agregar informacion en el body'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'El campo email es obligatorio'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es obligatorio'}), 400
    user = User.query.filter_by(email=body['email']).first()
    if user is None:
        return jsonify({'msg': 'Usuario o contraseña incorrecta'}), 400
    valid_password = bcrypt.check_password_hash(
        user.password, body['password'])
    if not valid_password:
        return jsonify({'msg': 'Usuario o contraseña incorrecta'}), 400
    access_token = create_access_token(identity=user.email, additional_claims={
                                       'company_id': user.company_id})
    return jsonify({'msg': 'Usuario logeado correctamente', 'token': access_token, 'user': user.serialize()})


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
