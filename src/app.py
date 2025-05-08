"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, CompanyInfo, Inventory, Compras
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

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
@app.route('/companyinfo', methods= ['GET'])
def get_companies():
    companies= CompanyInfo.query.all()
    all_company = list(map(lambda company: company.serialize(), companies))
    return jsonify({'data' : all_company}), 200

@app.route('/companyinfo/<int:id>', methods = ['GET'])
def get_company_id(id):
    company = db.session.get(CompanyInfo, id)
    if company:
        return jsonify(company.serialize())
    return jsonify({'msg': 'Company not found'}), 404

@app.route('/companyinfo', methods = ['POST'])
def create_company():
    data = request.get_json()
    if not  data or not all(key in data for key in ('name', 'email', 'phone', 'password')):
        return jsonify({'msg': 'Missing required field'}), 400
    
    new_company = CompanyInfo(
        name = data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        password=data.get('password')
    )
    db.session.add(new_company)
    db.session.commit()
    return jsonify({'msg': 'Company created', 'company': new_company.serialize()}), 200

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

@app.route('/companyinfo/<int:id>', methods=['DELETE'])
def delete_company(id):
    company = db.session.get(CompanyInfo, id)
    if not company:
        return jsonify({'msg': 'Company not found'}), 400
    db.session.delete(company)
    db.session.commit()
    return jsonify({'msg': 'Company deleted'}), 200

#----INVENTORY ENDPOINTS----
@app.route('/inventory', methods = ['GET'])
def get_inventory():
    inventory = Inventory.query.all()
    inventory_serialized = list((map(lambda product: product.serialize(), inventory)))
    return jsonify({'data': inventory_serialized}), 200

@app.route('/company/inventory/<int:company_id>', methods = ['GET'])
def get_invetory_id( company_id):
    company = db.session.get(CompanyInfo, company_id)
    if not company:
        return jsonify({'msg': 'Company not found'}), 404
    
    invetory = Inventory.query.filter_by(companyID=company_id).all()
    inventory_serialized = list(map(lambda item: item.serialize(), invetory))

    company_info = company.serialize()
    return jsonify({'company_id': company_info['id'], 'company_name': company_info['name'], 'inventory': inventory_serialized}), 200

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

@app.route('/inventory/<int:id>', methods=['DELETE'])
def delete_inventory_item(id):
    item = db.session.get(Inventory, id)
    if not item:
        return jsonify({'msg': 'Item not found'}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({'msg': 'Item deleted'}), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
