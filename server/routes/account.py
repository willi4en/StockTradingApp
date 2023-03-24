import sqlite3
from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import jwt_required 

account_bp = Blueprint('account', __name__)

def get_db_connection():
    conn = sqlite3.connect('data/database.db')
    conn.row_factory = sqlite3.Row
    return conn

@account_bp.route('/signup', methods=['POST'])
def create_account():
    data = request.get_json()
    firstname = data.get('firstname')
    email = data.get('email')
    password = data.get('password')

    if not firstname or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400
    
    with get_db_connection() as conn:
        conn.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, email TEXT, password TEXT)')
        cur = conn.cursor()

        cur.execute('SELECT * FROM users WHERE email = ?', (email,))
        row = cur.fetchone()
        if row is not None:
            return jsonify({'error': 'An account under this email already exists'}), 400
        
        cur.execute('INSERT INTO users (firstName, email, password) VALUES (?, ?, ?)', (firstname, email, password))
        conn.commit()

    return jsonify({'message': 'User created successfully'}), 201



@account_bp.route('/profile')
@jwt_required()
def my_profile():
    email = session.get('email')

    with get_db_connection() as conn:
        cur = conn.cursor()
        cur.execute('SELECT firstName, email FROM users WHERE email = ?', (email,))
        row = cur.fetchone()

    if not row:
        return jsonify({'error': 'Unauthorized'}), 401
    
    firstname, email = row
    response_body = {
        'name': firstname,
        'email': email
    }
    return jsonify(response_body)