import json
import sqlite3
from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, \
get_jwt_identity, unset_jwt_cookies 

auth_bp = Blueprint('auth', __name__)

def get_db_connection():
    conn = sqlite3.connect('data/database.db')
    conn.row_factory = sqlite3.Row
    return conn

@auth_bp.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()['exp']
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes = 30))
        
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity = get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data['access_token'] = access_token
                response.data = json.dumps(data)
        return response
    
    except (RuntimeError, KeyError):
        return response

@auth_bp.route('/token', methods=['POST'])
def create_token():
    data = request.get_json()
    email = data.get('email', None)
    password = data.get('password', None)

    with get_db_connection() as conn:
        cur = conn.cursor()

        cur.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
        row = cur.fetchone()
        if row is None:
            return {'msg': 'Invalid Email or Password'}, 401
        
        access_token = create_access_token(identity = row[0])

    return jsonify({'access_token': access_token}), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({'msg': 'Logout Successful!'})
    unset_jwt_cookies(response)
    return response