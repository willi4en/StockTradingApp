import json
import time
from flask import Flask
from datetime import timedelta
from flask_jwt_extended import JWTManager 

from routes.api import api_bp
from routes.auth import auth_bp
from routes.account import account_bp

app = Flask(__name__)
app.config['ENV'] = 'development'
app.config['JWT_SECRET_KEY'] = 'a-dog-named-mel'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours = 1)

app.register_blueprint(api_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(account_bp)

jwt = JWTManager(app)

if __name__ == '__main__':
    app.run()