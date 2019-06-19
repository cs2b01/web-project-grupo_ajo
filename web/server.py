from flask import Flask, render_template, request, session, Response, redirect, url_for
from flask_mail import Mail, Message
import json
from model import entities
from database import connector
import time

db = connector.Manager()
engine = db.createEngine()
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods = ['GET','POST'])
def send_message():
    contenido = json.loads(request.data)
    nombre= contenido['name']
    email = contenido['email']
    asunto = "[WEBSITE || CODE EN MI COLE] "+contenido['subject']
    mensaje = contenido['message']

    app.config.update(
        DEBUG=True,
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME='codeenmicole@gmail.com',
        MAIL_PASSWORD='Code110519!'
    )
    mail = Mail(app)
    msg = Message(
        asunto,
        sender='codeenmicole@gmail.com',
        recipients=
        ['codeenmicole@gmail.com'])
    msg.body = nombre+'\n'+'<'+email+'>'+"\n\n"+asunto+"\n\n"+mensaje
    mail.send(msg)

    return render_template('contacts.html')

@app.route('/users', methods = ['GET'])
def get_users():
    session = db.getSession(engine)
    dbResponse = session.query(entities.User)
    data = []
    for user in dbResponse:
        data.append(user)
    return Response(json.dumps(data, cls=connector.AlchemyEncoder), mimetype='application/json')

@app.route('/users/<id>', methods = ['PUT'])
def update_user(id):
    session = db.getSession(engine)
    user = session.query(entities.User).filter(entities.User.id == id).first()
    c = json.loads(request.data)
    setattr(user, c['key'], c['update'])
    session.add(user)
    session.commit()
    return 'Updated User'


@app.route('/users/<id>', methods = ['DELETE'])
def delete_users(id):
    session = db.getSession(engine)
    usuarios = session.query(entities.User).filter(entities.User.id == id)
    for esteUsuario in usuarios:
        session.delete(esteUsuario)
    session.commit()
    return "Deleted User"

#Listo
@app.route('/users/<id>', methods = ['GET'])
def get_user(id):
    db_session = db.getSession(engine)
    users = db_session.query(entities.User).filter(entities.User.id == id)
    for user in users:
        js = json.dumps(user, cls=connector.AlchemyEncoder)
        return  Response(js, status=200, mimetype='application/json')

    message = { 'status': 404, 'message': 'Not Found'}
    return Response(message, status=404, mimetype='application/json')

@app.route('/users', methods = ['POST'])
def create_user():
    c = json.loads(request.data)
    user = entities.User(
        username=c['username'],
        nickname=c['nickname'],
        name=c['name'],
        surname=c['surname'],
        password=c['password'],
        type=c['type'],
        points=c['points']
    )
    session = db.getSession(engine)
    session.add(user)
    session.commit()
    return 'Created User'

@app.route('/authenticate', methods = ["POST"])
def authenticate():
    message = json.loads(request.data)
    username = message['username']
    password = message['password']
    tipo = message['type']
    #2. look in database
    db_session = db.getSession(engine)
    try:
        user = db_session.query(entities.User
            ).filter(entities.User.username == username
            ).filter(entities.User.password == password
            ).filter(entities.User.type == tipo
            ).one()
        session['logged_user'] = user.id
        message = {'message': 'Authorized'}
        return Response(message, status=200, mimetype='application/json')
    except Exception:
        message = {'message': 'Unauthorized'}
        return Response(message, status=401, mimetype='application/json')

@app.route('/static/<content>')
def static_conten(content):
    return render_template(content)

@app.route('/current', methods = ["GET"])
def current_user():
    db_session = db.getSession(engine)
    user = db_session.query(entities.User).filter(
        entities.User.id == session['logged_user']
        ).first()
    return Response(json.dumps(
            user,
            cls=connector.AlchemyEncoder),
            mimetype='application/json'
        )

@app.route('/logout', methods = ["GET"])
def logout():
    session.clear()
    return render_template('index.html')

if __name__ == '__main__':
    app.secret_key = ".."
    app.run(port=8080, threaded=True, host=('127.0.0.1'))
