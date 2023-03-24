from flask import Blueprint
from flask_jwt_extended import jwt_required 

account_bp = Blueprint('account', __name__)

@account_bp.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        'name': 'Jordan',
        'about': 'This Route Works!'
    }
    return response_body