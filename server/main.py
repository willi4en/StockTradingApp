import time
import finnhub
from flask import Flask

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['ENV'] = 'development'

finnhub_client = finnhub.Client(api_key="cf7b9i2ad3iad4t5u5ugcf7b9i2ad3iad4t5u5v0")

@app.route('/<string:symbol>')
def get_quote(symbol):
    return(finnhub_client.quote(symbol))

if __name__ == '__main__':
    app.run()