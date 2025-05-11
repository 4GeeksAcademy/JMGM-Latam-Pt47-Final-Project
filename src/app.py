"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, CompanyInfo, Inventory, Compras
from api.models import db, CompanyInfo, Inventory, Clients, Compras, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity, get_jwt
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
#-- preguntar como hacer--#
@app.route('/companyinfo', methods= ['GET'])
@jwt_required()
def get_companies():
    company_id = get_jwt()
    companies= CompanyInfo.query.filter_by(id = company_id).first()
    all_company = list(map(lambda company: company.serialize(), companies))
    return jsonify({'data' : all_company}), 200

##-- Colocar token y verificar que el email sea de un admin--#
#-- preguntar como hacerlo--#
@app.route('/companyinfo/<int:id>', methods = ['GET'])
@jwt_required()
def get_company_id(id):
    company = CompanyInfo.query.filter_by(id=id).first()
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

#--Listo--#
@app.route('/client/<int:id_client>', methods=['PUT'])
@jwt_required()
def modify_client(id_client):
    client = Clients.query.filter_by(id=id_client).first()
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

#-- listo --#
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
        all_client = list(map(lambda clients: clients.serialize(), user_delete))
        return jsonify({'msg': 'Cliente eliminado exitosamente', 'data': all_client}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al eliminar el cliente', 'error': str(e)}), 400
    finally:
        db.session.close()

#-- listo--#
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
#-- verificar la contraseña es fuerte, minimo 8 caracateres--#
    new_company = CompanyInfo(
        name = data.get('company_name')
    )
    
    try:
        db.session.add(new_company)
        db.session.commit()
    except Exception as e: 
        db.session.rollback()
        return jsonify({'msg': 'error al crear la empresa', 'error': str(e)}), 400
    

    new_user = User(
        email = data.get('email'),
        password= bcrypt.generate_password_hash(data.get('password')).decode('utf-8'),
        is_active = True,
        company_id = new_company.id
    )
     
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'msg': 'Company created'}), 201
    except Exception as e: 
        db.session.rollback()
        return jsonify({'msg': 'error al crear el usuario', 'error': str(e)}), 400
    finally:
        db.session.close()
    


#-- Este para uso de admin -- #
@app.route('/companyinfo/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_company(id):
    company_id = get_jwt()

    company = CompanyInfo.query.filter_by(id=id).first()

    if not company:
        return jsonify({'msg': 'Company not found'}), 404
    
    if company.id != company_id:
        return jsonify({'msg': 'Unauthorized to delete this company'}), 400
    
    try:
        db.session.delete(company)
        db.session.commit()
        return jsonify({'msg': 'Company deleted'}), 200
    except Exception as e: 
        db.session.rollback()
        return jsonify({'msg': 'Error deleting company', 'error': str(e)}), 400
    finally:
        db.session.close()

#----INVENTORY ENDPOINTS----#

#-- listo-- #
@app.route('/company/inventory', methods=['GET'])
@jwt_required()
def get_invetory_id():
    company_data = get_jwt()
    current_company_id = company_data['company_id']
    company = CompanyInfo.query.filter_by(id=current_company_id).first()

    inventory_objects = Inventory.query.filter_by(companyID=current_company_id).all()
    inventory_serialized = list(map(lambda item: item.serialize(), inventory_objects))

    if not company:
        return jsonify({'msg': 'Company not found'}), 404
    company_info = company.serialize()

    return jsonify({
        'company_id': company_info['id'],
        'company_name': company_info['name'],
        'inventory': inventory_serialized}), 200

#-- Casi listo -- #
@app.route('/inventory', methods=['POST'])
@jwt_required()
def create_inventory():
    data = request.get_json()
    if not  data or not all(key in data for key in ('product_name', 'price', 'marca', 'stock')):
        return jsonify({'msg': 'Missing required field'}), 400
    
    current_user= get_jwt()
    current_company_id= current_user['company_id']
    
    new_item = Inventory(
        companyID = current_company_id,
        product_name = data.get('product_name'),
        price = data.get('price'),
        marca = data.get('marca'),
        stock = data.get('stock')
    )
    
    try:
        db.session.add(new_item)
        db.session.commit()
        return jsonify({'item creado': new_item.serialize()}), 200
    except Exception as e: 
        db.session.rollback()
        return jsonify({'msg': 'Error al crear un nuevo producto', 'error': str(e)}), 400
    finally:
        db.session.close()

#-- Verificar token y verificar que el inventario pertenezca a la compañia
# Y obtener el company id desde el token, y eliminarlo del body-- #
@app.route('/compras/<int:id>', methods=['PUT'])
@jwt_required()
def actualizar_compra(id):
    compra_existente = Compras.query.filter_by(id).first()

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

#-- listo -- ##
@app.route('/inventory/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_inventory_item(product_id):
    user_email = get_jwt_identity()

    user = User.query.filter_by(email= user_email).first()

    company_id = user.company_id

    product = Inventory.query.filter_by(
        companyID = company_id,
        id = product_id
    ).first()
    if not product:
        return jsonify({'msg': 'Product not found'}), 404
    
    #-- try expect--#
    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'msg': 'Product deleted'}), 200
    except Exception as e: 
        db.session.rollback()
        return jsonify({'msg': 'error al eliminar el producto', 'error': str(e)}), 400
    finally:
        db.session.close()

@app.route('/login', methods=['POST'])
def login():
    body= request.get_json(silent= True)
    if body is None:
        return jsonify({'msg': 'Debe agregar informacion en el body'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'El campo email es obligatorio'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'El campo password es obligatorio'}), 400
    user= User.query.filter_by(email= body['email']).first()
    if user is None:
        return jsonify({'msg': 'Usuario o contraseña incorrecta'}), 400
    valid_password = bcrypt.check_password_hash(user.password, body['password'])
    if not valid_password:
        return jsonify({'msg': 'Usuario o contraseña incorrecta'}), 400
    access_token = create_access_token(identity =user.email, additional_claims={'company_id': user.company_id})
    return jsonify({'msg': 'Usuario logeado correctamente', 'token': access_token, 'company' : user.serialize()})
    

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
