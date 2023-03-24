import finnhub
from flask import Blueprint, request, jsonify
from datetime import datetime, date, time

api_bp = Blueprint('api', __name__)

finnhub_client = finnhub.Client(api_key='cf7b9i2ad3iad4t5u5ugcf7b9i2ad3iad4t5u5v0')

@api_bp.route('/stocks/<string:symbol>')
def get_quote(symbol):
    try: 
        quote = finnhub_client.quote(symbol)
        return jsonify(quote), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/search')
def get_stocks():
    try:
        stock = request.args.get('symbol')
        results = finnhub_client.symbol_lookup(stock)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/candlestick/<string:symbol>')
def get_candlestick(symbol):
    try:
        time_now = int(datetime.combine(date.today(), time.min).timestamp())
        time_1yr_ago = time_now - (24 * 60 * 60 * 365)
        data = finnhub_client.stock_candles(symbol, 'D', time_1yr_ago, time_now)
        return jsonify(data), 200
    except Exception as e: 
        return jsonify({'error': str(e)}), 500