import time
from flask import Flask

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['ENV'] = 'development'

@app.route('/time')
def get_current_time():
    return {'time': time.time()}