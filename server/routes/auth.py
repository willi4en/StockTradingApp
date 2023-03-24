import json
from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, \
get_jwt_identity, unset_jwt_cookies 

auth_bp = Blueprint('auth', __name__)

@auth_bp.after_request
def refresh_expiring_jwts(response):
    # This refreshes the JWT before it can expire
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
    
    # This handles instances where there is not a valid JWT
    except (RuntimeError, KeyError):
        return response

@auth_bp.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email != 'test@mail.com' or password != 'test123':
        return {'msg': 'Incorrect Email or Password'}, 401
    
    access_token = create_access_token(identity = email)
    response = {'access_token': access_token}
    return response

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({'msg': 'Logout Successful!'})
    unset_jwt_cookies(response)
    return response