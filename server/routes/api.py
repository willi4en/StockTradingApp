import finnhub
from flask import Blueprint, request
from datetime import datetime, date, time

api_bp = Blueprint('api', __name__)

finnhub_client = finnhub.Client(api_key='cf7b9i2ad3iad4t5u5ugcf7b9i2ad3iad4t5u5v0')

@api_bp.route('/stocks/<string:symbol>')
def get_quote(symbol):
    return(finnhub_client.quote(symbol))

@api_bp.route('/search')
def get_stocks():
    stock = request.args.get('symbol')
    return(finnhub_client.symbol_lookup(stock))

@api_bp.route('/candlestick/<string:symbol>')
def get_candlestick(symbol):
    time_now = int(datetime.combine(date.today(), time.min).timestamp())
    time_1yr_ago = time_now - (24 * 60 * 60 * 365)
    return finnhub_client.stock_candles(symbol, 'D', time_1yr_ago, time_now)