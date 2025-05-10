  
import os
from flask_admin import Admin
from .models import db, User, CompanyInfo, Inventory, Clients, Compras
from flask_admin.contrib.sqla import ModelView

class UserView(ModelView):
    column_list= ['id', 'email','password', 'is_active', 'role', 'company_id', 'company']

class CompanyInfoView(ModelView):
    column_list= ['id', 'name', 'email', 'phone', 'inventory', 'clients', 'users']

class InventoryView(ModelView):
    column_list= ['id', 'companyID', 'product_name', 'marca', 'stock', 'company', 'compras', 'price']

class ClientsView(ModelView):
    column_list= ['id', 'companyId', 'name', 'email', 'phone', 'company', 'compras']

class ComprasView(ModelView):
    column_list= ['id', 'clientsId', 'productsId', 'producto', 'cantidad', 'fecha_compra', 'clientes']

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(UserView(User, db.session))
    admin.add_view(CompanyInfoView(CompanyInfo, db.session))
    admin.add_view(InventoryView(Inventory, db.session))
    admin.add_view(ClientsView(Clients, db.session))
    admin.add_view(ComprasView(Compras, db.session))



    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))