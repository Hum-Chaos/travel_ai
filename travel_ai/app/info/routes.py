from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import CultureInfo

info_bp = Blueprint('info', __name__, url_prefix='/api/info')

@info_bp.route('/culture', methods=['GET'])
def culture():
    country = request.args.get('country')
    city = request.args.get('city')
    info = CultureInfo.query.filter_by(country=country, city=city).first()
    if not info:
        return jsonify({'error': 'No data found'}), 404
    return jsonify({'culture': info.culture_text})

@info_bp.route('/emergency', methods=['GET'])
def emergency():
    country = request.args.get('country')
    city = request.args.get('city')
    info = CultureInfo.query.filter_by(country=country, city=city).first()
    if not info:
        return jsonify({'error': 'No emergency info'}), 404
    return jsonify({'emergency_contacts': info.emergency_contacts})