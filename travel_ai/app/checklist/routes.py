from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import Checklist

checklist_bp = Blueprint('checklist', __name__, url_prefix='/api/checklist')

@checklist_bp.route('/generate', methods=['POST'])
def generate():
    data = request.json
    destination = data.get('destination')
    travel_type = data.get('type')  # 如："商务", "亲子"
    template = Checklist.query.filter_by(destination=destination, type=travel_type).first()
    if not template:
        return jsonify({'error': 'No checklist found'}), 404
    return jsonify({'checklist': template.items})