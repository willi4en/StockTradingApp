from flask import Flask, jsonify
from flask_mysqldb import MySQL
import datetime
import yaml

dbconfig = yaml.load(open('sqlconfig.yaml'), Loader=yaml.FullLoader)

app = Flask(__name__)

app.config['MYSQL_HOST'] = dbconfig['mysql_host']
app.config['MYSQL_USER'] = dbconfig['mysql_user']
app.config['MYSQL_PASSWORD'] = dbconfig['mysql_password']
app.config['MYSQL_DB'] = dbconfig['mysql_db']
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
print(mysql.connection)


@app.route('/')
def index():
    return jsonify({"Hello": "World"})


if __name__ == "__main__":
    app.run(debug=True)
