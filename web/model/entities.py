from sqlalchemy import Column, Integer, String, Sequence, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationships
from database import connector


class User(connector.Manager.Base):
    __tablename__ = 'users'
    id = Column(Integer, Sequence('user_id_seq'),primary_key=True)
    nickname = Column(String(30))
    name = Column(String(50))
    surname = Column(String(50))
    password = Column(String(12))
    username = Column(String(12))
    type = Column(String(14))
    points = Column(Integer,default=0)
    cursos = Column(Text)
    notas = Column(Text)

class Cursos(connector.Manager.Base):
    __tablename__ = 'cursos'
    id = Column(Integer, Sequence('curso_id_seq'),primary_key=True)
    nombre = Column(String(50))
    descripcion = Column(String(300))
    horario = Column(String(100))
