import json
import finnhub
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import JWTManager, create_access_token, get_jwt, \
get_jwt_identity, unset_jwt_cookies, jwt_required 

api = Flask(__name__)
api.config['ENV'] = 'development'
api.config['JWT_SECRET_KEY'] = 'a-dog-named-mel'
api.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours = 1)

jwt = JWTManager(api)
finnhub_client = finnhub.Client(api_key='cf7b9i2ad3iad4t5u5ugcf7b9i2ad3iad4t5u5v0')

# Auth Functions
@api.after_request
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

# Auth Endpoints
@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email != 'test@mail.com' or password != 'test123':
        return {'msg': 'Incorrect Email or Password'}, 401
    
    access_token = create_access_token(identity = email)
    response = {'access_token': access_token}
    return response

@api.route('/logout', methods=['POST'])
def logout():
    response = jsonify({'msg': 'Logout Successful!'})
    unset_jwt_cookies(response)
    return response

@api.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        'name': 'Jordan',
        'about': 'This Route Works!'
    }
    return response_body

# API Endpoints
@api.route('/stocks/<string:symbol>')
def get_quote(symbol):
    return(finnhub_client.quote(symbol))

@api.route('/search')
def get_stocks():
    stock = request.args.get('symbol')
    return(finnhub_client.symbol_lookup(stock))

if __name__ == '__main__':
    api.run()