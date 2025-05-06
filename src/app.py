"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, CompanyInfo, Inventory, Clients, Compras
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

@app.route('/companyinfo', methods= ['GET'])
def company():
    company= CompanyInfo.query.all()
    all_company = list(map(lambda company: company.serialize(), company))
    return (
        jsonify({'data' : all_company})
    )

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
        return jsonify({'msg': 'Debe enviar un el id del producto'}), 400
    if 'cantidad' not in body:
        return jsonify({'msg': 'Debe enviar la cantidad solicitada'}), 400
    if 'fecha_compra' not in body:
        return jsonify({'msg': 'Debe enviar la fecha'}), 400

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
    new_compra.fecha_compra= body['fecha_compra']
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
    

    
 


    

    
    


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
