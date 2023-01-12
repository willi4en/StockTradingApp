from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime
import yaml

# db = yaml.load(open('sqlconfig.yaml'), Loader=yaml.FullLoader)

app = Flask(__name__)

# app.config['MYSQL_HOST'] = db['mysql_host']
# app.config['MYSQL_USER'] = db['mysql_user']
# app.config['MYSQL_PASSWORD'] = db['mysql_password']
# app.config['MYSQL_DB'] = db['mysql_db']
# app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# mysql = MySQL(app)
# print(mysql.connection)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, username, password):
        self.username = username
        self.password = password


@app.route('/', methods=['GET'])
def get_articles():
    return jsonify({"Hello": "World"})


if __name__ == "__main__":
    app.run(debug=True)
