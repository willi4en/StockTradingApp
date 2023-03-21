import time
import finnhub
from flask import Flask, request

app = Flask(__name__)
app.config['ENV'] = 'development'

finnhub_client = finnhub.Client(api_key="cf7b9i2ad3iad4t5u5ugcf7b9i2ad3iad4t5u5v0")

@app.route('/stocks/<string:symbol>')
def get_quote(symbol):
    return(finnhub_client.quote(symbol))

@app.route('/search')
def get_stocks():
    stock = request.args.get('symbol')
    return(finnhub_client.symbol_lookup(stock))

if __name__ == '__main__':
    app.run()