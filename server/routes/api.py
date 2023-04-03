import sqlite3
import finnhub
from flask import Blueprint, request, jsonify
from datetime import datetime, date, time
from flask_jwt_extended import get_jwt_identity, jwt_required

api_bp = Blueprint('api', __name__)

finnhub_client = finnhub.Client(api_key='cf7b9i2ad3iad4t5u5ugcf7b9i2ad3iad4t5u5v0')

def get_db_connection():
    conn = sqlite3.connect('data/database.db')
    conn.row_factory = sqlite3.Row
    return conn

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
    
@api_bp.route('/buy', methods=['POST'])
def buy():
    data = request.get_json()
    stock = data.get('stock')
    price = data.get('price')
    user_id = data.get('user_id')
    now = datetime.now()
    bought_at = now.strftime("%Y-%m-%d %H:%M:%S")

    if not stock or not price:
        return jsonify({'error': 'Something went wrong'}), 400
    
    with get_db_connection() as conn:
        conn.execute('CREATE TABLE IF NOT EXISTS buys (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, stock TEXT, price TEXT, bought_at TEXT, FOREIGN KEY (user_id) REFERENCES users (id))')
        cur = conn.cursor()

        cur.execute('INSERT INTO buys (user_id, stock, price, bought_at) VALUES (?, ?, ?, ?)', (user_id, stock, price, bought_at))
        conn.commit()

    return jsonify({'message': 'Stock has been bought for {price}'}), 201

@api_bp.route('/sell', methods=['POST'])
def sell():
    data = request.get_json()
    stock = data.get('stock')
    price = data.get('price')
    user_id = data.get('user_id')
    now = datetime.now()
    sold_at = now.strftime("%Y-%m-%d %H:%M:%S")

    if not stock or not price:
        return jsonify({'error': 'Something went wrong'}), 400
    
    with get_db_connection() as conn:
        conn.execute('CREATE TABLE IF NOT EXISTS sells (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, stock TEXT, price TEXT, sold_at TEXT, FOREIGN KEY (user_id) REFERENCES users (id))')
        cur = conn.cursor()

        cur.execute('INSERT INTO sells (user_id, stock, price, sold_at) VALUES (?, ?, ?, ?)', (user_id, stock, price, sold_at))
        conn.commit()

    return jsonify({'message': 'Stock has been sold for {price}'}), 201


@api_bp.route('/get-buys', methods=['GET'])
def get_buys():
    user_id = request.args.get('user_id', '')
    
    with get_db_connection() as conn:
        cur = conn.cursor()
        cur.execute('SELECT * FROM buys WHERE user_id = ?', (user_id,))
        rows = cur.fetchall()

    buys = [dict(row) for row in rows]
    return jsonify(buys), 201

@api_bp.route('/get-sells', methods=['GET'])
def get_sells():
    user_id = request.args.get('user_id', '')
    
    with get_db_connection() as conn:
        cur = conn.cursor()
        cur.execute('SELECT * FROM sells WHERE user_id = ?', (user_id,))
        rows = cur.fetchall()

    sells = [dict(row) for row in rows]
    return jsonify(sells), 201

@api_bp.route('/get-buys/<string:symbol>', methods=['GET'])
def get_buy(symbol):
    user_id = request.args.get('user_id', '')
    stock = symbol
    
    with get_db_connection() as conn:
        cur = conn.cursor()
        cur.execute('SELECT * FROM buys WHERE user_id = ? AND stock = ?', (user_id, stock))
        rows = cur.fetchall()

    buys = [dict(row) for row in rows]
    return jsonify(buys), 201

@api_bp.route('/get-sells/<string:symbol>', methods=['GET'])
def get_sell(symbol):
    user_id = request.args.get('user_id', '')
    stock = symbol
    
    with get_db_connection() as conn:
        cur = conn.cursor()
        cur.execute('SELECT * FROM sells WHERE user_id = ? AND stock = ?', (user_id, stock))
        rows = cur.fetchall()

    sells = [dict(row) for row in rows]
    return jsonify(sells), 201