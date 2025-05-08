"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, CompanyInfo, Inventory, Compras
from api.models import db, CompanyInfo, Inventory, Clients, Compras
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_KEY")
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app)

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

#---COMPANY INFO ENDPOINTS---
##-- Colocar token y verificar que el email sea de un admin--#
@app.route('/companyinfo', methods= ['GET'])
def get_companies():
    companies= CompanyInfo.query.all()
    all_company = list(map(lambda company: company.serialize(), companies))
    return jsonify({'data' : all_company}), 200

##-- Colocar token y verificar que el email sea de un admin--#
@app.route('/companyinfo/<int:id>', methods = ['GET'])
def get_company_id(id):
    company = db.session.get(CompanyInfo, id)
    if company:
        return jsonify(company.serialize())
    return jsonify({'msg': 'Company not found'}), 404

##-- Colocar token y verificar que el inventario le pertenezca a la compañia--#
#-- Verificar la cantidad de stock existente --#
@app.route('/inventory/stock/<int:id>/<int:quantity>', methods= ['DELETE'])
def delete_stock(id, quantity):
    product= Inventory.query.get(id)
    product.stock= product.stock - quantity

    try: 
        db.session.commit()
        return jsonify(product.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error eliminando Stock', 'error': str(e)}), 400
    finally:
        db.session.close()

#-- Verificar token 
# verificar que el cliente corresponde a la compañia
# verificar que el producto corresponde a la compañia
# agregar fecha--#
@app.route('/compra/<int:id_client>', methods= ['POST'])
def compra(id_client):
    """
        {
        "product_ID",
        "fecha_compra",
        "cantidad"}
    """
    body= request.get_json(silent= True)
    if not body:
        return jsonify({'msg': 'Debe enviar informacion en el body'}), 400
    if 'product_ID' not in body:
        return jsonify({'msg': 'Debe enviar el id del producto'}), 400
    if 'cantidad' not in body:
        return jsonify({'msg': 'Debe enviar la cantidad solicitada'}), 400

    client= Clients.query.get(id_client)
    if client is None:
        return jsonify({'msg': 'Usuario no encontrado'}), 400
    
    producto= Inventory.query.get(body['product_ID'])
    if producto is None:
        return jsonify({'msg': 'Producto no encontrado'}), 400
    
    if body['cantidad'] > producto.stock:
        return jsonify({'msg': 'Cantidad no disponible'}), 400
    
    new_compra= Compras()
    new_compra.productsId = body['product_ID']
    new_compra.cantidad = body['cantidad']
    # enviar la fecha y hora a la tabla#
    new_compra.clientsId= id_client
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
    
#---- Endpoints de clientes ----- #
#-- Verificar token de compañia -- #
#-- Get de los clientes de la compañia por la llave foranea-- #
@app.route('/clients', methods= ['GET'])
def clients():
    clientes = Clients.query.all()
    all_clientes = list(map(lambda clientes: clientes.serialize(), clientes))
    return jsonify({'clientes' : all_clientes})

#-- Verificar token de compañia -- #
#-- Get de los clientes de la compañia por la llave foranea-- #
@app.route('/client/<int:id>', methods=['GET'])
def client_id(id):
    cliente= Clients.query.get(id)
    if cliente is None:
        return jsonify({'msg': 'Cliente no existe'}), 404
    return jsonify({'cliente': cliente.serialize()})

#-- Verificar token -- #
#-- obtener id company desde el token
# y quitar id_company de la ruta -- #
@app.route('/client/<int:id_company>', methods=['POST'])
def add_client(id_company):
    body= request.get_json(silent= True)
    """
    {
    "nombre",
    "email",
    "phone",
    }
    """
    if not body:
        return jsonify({'msg': 'Debe agregar informacion en el body'}), 400
    if 'nombre' not in body:
        return jsonify({'msg': 'Debe agregar el nombre del cliente'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'Debe agregar el correo del cliente'}), 400
    if 'telefono' not in body:
        return jsonify({'Debe agregar el numero telefonico del cliente'}), 400
    verify_client = Clients.query.filter_by(email= body['email']).first()
    if verify_client:
        return jsonify({'msg': 'El cliente ya existe'}), 400
    new_client= Clients()
    new_client.name= body['nombre']
    new_client.email= body['email']
    new_client.phone= body['telefono']
    new_client.companyId= id_company
    try:
        db.session.add(new_client)
        db.session.commit()
        return jsonify(new_client.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al crear nuevo cliente', 'error': str(e)}), 400
    finally:
        db.session.close()

#-- Verificar token --#
#-- Verificar que el cliente le pertenece a la compañia --#

@app.route('/client/<int:id_client>', methods=['PUT'])
def modify_client(id_client):
    client= Clients.query.get(id_client)
    if client is None:
        return jsonify({'msg': 'Cliente no existe'}), 400
    data= request.get_json(silent= True)
    if 'nombre' in data:
        client.name= data['nombre']
    if 'email' in data:
        client.email= data['email']
    if 'telefono' in data:
        client.phone= data['telefono']
    db.session.commit()
    return jsonify({'msg': 'Cliente actualizado correctamente', 'cliente': client.serialize()})

#-- Verificar token --#
#-- Verificar que el cliente le pertenece a la compañia --#
@app.route('/client/<int:id_client>', methods=['DELETE'])
def delete_client(id_client):
    client= Clients.query.get(id_client)
    if client is None:
        return jsonify({'msg': 'El cliente no existe'}), 404
    try:   
        db.session.delete(client)
        db.session.commit()
        user_delete = Clients.query.all()
        all_client = list(map(lambda clients: clients.serialize(), user_delete))
        return jsonify({'msg': 'Cliente eliminado exitosamente', 'data': all_client}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al eliminar el cliente', 'error': str(e)}), 400
    finally:
        db.session.close()

#-- Falta la ruta para logearse
# y debe generar un token-- #
@app.route('/register', methods = ['POST'])
def create_company():
    data = request.get_json()
    if not  data or not all(key in data for key in ('name', 'email', 'phone', 'password')):
        return jsonify({'msg': 'Missing required field'}), 400
    
    verify_email= CompanyInfo.query.filter_by(email= data.get('email')).first()
    if verify_email:
        return jsonify({'msg': 'Esta compañia ya esta registrada'}), 400

    new_company = CompanyInfo(
        name = data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        password= bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
    )
    db.session.add(new_company)
    db.session.commit()
    return jsonify({'msg': 'Company created', 'company': new_company.serialize()}), 200

#-- verifiar el token y obtener el id desde el token --#
@app.route('/companyinfo/<int:id>', methods=['PUT'])
def update_company(id):
    company = db.session.get(CompanyInfo, id)
    if company:
        data = request.get_json()
        company.name = data.get('name', company.name)
        company.email = data.get('email', company.email)
        company.phone = data.get('phone', company.phone)
        company.password = data.get('password', company.password)
        db.session.commit()
        return jsonify(company.serialize()), 200
    return jsonify({'msg': 'Company not found'}), 400

#-- verifiar el token y obtener el id desde el token --#
@app.route('/companyinfo/<int:id>', methods=['DELETE'])
def delete_company(id):
    company = db.session.get(CompanyInfo, id)
    if not company:
        return jsonify({'msg': 'Company not found'}), 400
    db.session.delete(company)
    db.session.commit()
    return jsonify({'msg': 'Company deleted'}), 200

#----INVENTORY ENDPOINTS----
#-- Verificar el token y verificar el inventario le pertenezca a la compañia--#
@app.route('/inventory', methods = ['GET'])
def get_inventory():
    inventory = Inventory.query.all()
    inventory_serialized = list((map(lambda product: product.serialize(), inventory)))
    return jsonify({'data': inventory_serialized}), 200

#-- Verificar token y obtener id desde el token-- #
@app.route('/company/inventory/<int:company_id>', methods = ['GET'])
def get_invetory_id( company_id):
    company = db.session.get(CompanyInfo, company_id)
    if not company:
        return jsonify({'msg': 'Company not found'}), 404
    invetory = Inventory.query.filter_by(companyID=company_id).all()
    inventory_serialized = list(map(lambda item: item.serialize(), invetory))

    company_info = company.serialize()
    return jsonify({'company_id': company_info['id'], 'company_name': company_info['name'], 'inventory': inventory_serialized}), 200

#-- Verificar token y verificar que el inventario pertenezca a la compañia
# Y obtener el company id desde el token, y eliminarlo del body-- #
@app.route('/inventory', methods=['POST'])
def create_inventory():
    data = request.get_json()
    if not  data or not all(key in data for key in ('product_name', 'price', 'marca', 'stock', 'companyID')):
        return jsonify({'msg': 'Missing required field'}), 400
    
    new_item = Inventory(
        companyID = data.get('companyID'),
        product_name = data.get('product_name'),
        price = data.get('price'),
        marca = data.get('marca'),
        stock = data.get('stock')
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.serialize()), 200

@app.route('/compras/<int:id>', methods=['PUT'])
def actualizar_compra(id):
    compra_existente= Compras.query.get(id)

    if compra_existente is None:
        return jsonify({'msg:' 'Buy not found'}), 400
    
    data = request.get_json(silent= True)
    if data is None:
        return jsonify({'msg': 'debes enviar informacion en el body'}), 400
    if 'clientsId' in data:
        compra_existente.clientsId = data['clientsId']
    if 'productsId' in data:
        compra_existente.productsId = data['productsId']
    if 'cantidad' in data:
        compra_existente.cantidad = data['cantidad']
    if 'fecha_compra' in data:
        compra_existente.fecha_compra = data['fecha_compra']
        
    db.session.commit()
    return jsonify({'msg': 'Buy update'}), 200
#-- Verificar token y verificar que el inventario pertenezca a la compañia
# Y obtener el company id desde el token, y eliminarlo del body-- #
@app.route('/inventory/<int:id>', methods=['PUT'])
def update_inventory_item(id):
    item = db.session.get(Inventory, id)
    if item:
        data = request.get_json()
        item.companyID = data.get('companyID', item.companyID)
        item.product_name = data.get('product_name', item.product_name)
        item.price = data.get('price', item.price)
        item.marca = data.get('marca', item.marca)
        item.stock = data.get('stock', item.stock)
        db.session.commit()
        return jsonify(item.serialize()), 200
    return jsonify({'msg': 'Item not found'}), 404

#-- Verificar token y mirar si el id del inventario le corresponde a la compañia del token-- ##
@app.route('/inventory/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_inventory_item(id):
    company_id = get_jwt_identity()

    item = db.session.get(Inventory, id)
    if not item:
        return jsonify({'msg': 'Item not found'}), 404

    if item.companyID != company_id:
        return jsonify({'msg': 'Unauthorized to delete this item'}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({'msg': 'Item deleted'}), 200

@app.route('/login', methods=['POST'])
def login():
    body= request.get_json(silent= True)
    if body is None:
        return jsonify({'msg': 'Debe agregar informacion en el body'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'El campo email es obligatorio'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es obligatorio'}), 400
    company= CompanyInfo.query.filter_by(email= body['email']).first()
    if company is None:
        return jsonify({'msg': 'Usuario o contraseña incorrecta'}), 400
    valid_password = bcrypt.check_password_hash(company.password, body['password'])
    if not valid_password:
        return jsonify({'msg': 'Usuario o contraseña incorrecta'}), 400
    access_token = create_access_token(identity = company.id)
    return jsonify({'msg': 'Usuario logeado correctamente', 'token': access_token, 'company' : company.serialize()})
    

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
