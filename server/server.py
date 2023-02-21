from flask import Flask, request
from flask_mysqldb import MySQL
import yaml

db = yaml.load(open('sqlconfig.yaml'), Loader=yaml.FullLoader)

app = Flask(__name__)

app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
print(mysql.connection)
# Members API Route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method == 'POST':
        return 'success'
    
@app.route('/goog')
def goog():
    cur = mysql.connection.cursor()
    resultVal = cur.execute('SELECT * FROM goog LIMIT 1')
    if resultVal > 0:
        results = cur.fetchall()
        print(results[0]['high'])
        return 'Succeeded'
    else:
        return 'Failed'

if __name__ == "__main__":
    app.run(port=5000,debug=True)