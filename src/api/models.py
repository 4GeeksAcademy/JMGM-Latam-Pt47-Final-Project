from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Integer, Date, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timedelta
import enum
db = SQLAlchemy()


class RoleEnum(str, enum.Enum):
    ADMIN = 'admin'
    USER = 'user'

    @classmethod
    def get_all(cls):
        return [role.value for role in cls]


class RecoveryPassword(db.Model):
    __tablename__ = 'recovery'
    id: Mapped[int] = mapped_column(primary_key=True)
    uuid: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(120))
    fecha: Mapped[datetime] = mapped_column(
        default=datetime.now, nullable=False)


class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    role: Mapped[enum] = mapped_column(
        Enum(RoleEnum), default=RoleEnum.USER.value)
    company_id: Mapped[int] = mapped_column(ForeignKey('company_info.id'))
    company: Mapped['CompanyInfo'] = relationship(back_populates='user')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "role": self.role,
            "company": self.company.name
            # do not serialize the password, its a security breach
        }

    def __repr__(self):
        return self.email


class CompanyInfo(db.Model):
    __tablename__ = 'company_info'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=True)
    phone: Mapped[str] = mapped_column(String(20), nullable=True)
    inventory: Mapped[list['Inventory']] = relationship(
        back_populates='company', cascade='all')
    clients: Mapped[list['Clients']] = relationship(
        back_populates='company', cascade='all')
    user: Mapped['User'] = relationship(
        back_populates='company', cascade='all')
    compras: Mapped[list['Compras']] = relationship(
        back_populates='company', cascade='all')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "user": self.user,
            "inventory": list(map(lambda inventory: inventory.serialize(), self.inventory)),
            "clients": list(map(lambda clients: clients.serialize(), self.clients))
        }

    def __repr__(self):
        return self.name


class Inventory(db.Model):
    __tablename__ = 'inventory'
    id: Mapped[int] = mapped_column(primary_key=True)
    companyID: Mapped[int] = mapped_column(ForeignKey('company_info.id'))
    product_name: Mapped[str] = mapped_column(String(60), nullable=False)
    price: Mapped[int] = mapped_column(Integer, nullable=False)
    marca: Mapped[str] = mapped_column(String(120), nullable=False)
    stock: Mapped[int] = mapped_column(Integer())
    company: Mapped['CompanyInfo'] = relationship(back_populates='inventory')
    compras: Mapped[list['Compras']] = relationship(back_populates='producto')

    def serialize(self):
        return {
            "id": self.id,
            "product_name": self.product_name,
            "price": self.price,
            "marca": self.marca,
            "stock": self.stock
        }

    def __repr__(self):
        return self.product_name

    def delete_stock(self, quantity):
        self.stock = self.stock - quantity
        return self.stock


class Clients(db.Model):
    __tablename__ = 'clients'
    id: Mapped[int] = mapped_column(primary_key=True)
    companyId: Mapped[int] = mapped_column(ForeignKey('company_info.id'))
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    phone: Mapped[str] = mapped_column(String(60), unique=True, nullable=False)
    company: Mapped['CompanyInfo'] = relationship(back_populates='clients')
    compras: Mapped[list['Compras']] = relationship(back_populates='clientes')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "company": self.company.name,
            "companyId": self.companyId,
            "compras": list(map(lambda compras: compras.serialize(), self.compras))
        }

    def __repr__(self):
        return self.name


class Compras(db.Model):
    __tablename__ = 'compras'
    id: Mapped[int] = mapped_column(primary_key=True)
    clientsId: Mapped[int] = mapped_column(ForeignKey('clients.id'))
    companyId: Mapped[int] = mapped_column(ForeignKey('company_info.id'))
    productsId: Mapped[int] = mapped_column(ForeignKey('inventory.id'))
    producto: Mapped['Inventory'] = relationship(back_populates='compras')
    cantidad: Mapped[int] = mapped_column(Integer)
    # - editar en la tabla "fecha y hora" #
    fecha_compra: Mapped[datetime] = mapped_column(default=datetime.now)
    clientes: Mapped['Clients'] = relationship(back_populates='compras')
    company: Mapped['CompanyInfo'] = relationship(back_populates='compras')

    def serialize(self):
        return {
            "id": self.id,
            "clientsId": self.clientsId,
            "productsId": self.productsId,
            "companyId": self.companyId,
            "producto": self.producto.serialize(),
            "cantidad": self.cantidad,
            "fecha_compra": self.fecha_compra,
        }

    def __repr__(self):
        return self.clientes.name
