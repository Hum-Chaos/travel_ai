from flask import Blueprint, request, jsonify
from app.extensions import cache
from coze_sdk import CozeClient

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chat')
coze = CozeClient(api_key='your_coze_api_key')

@chat_bp.route('/send', methods=['POST'])
def send():
    data = request.json
    text = data.get("message")
    user_id = data.get("user_id")
    if not text:
        return jsonify({'error': 'Empty message'}), 400
    response = coze.chat(text)
    cache.set(f"chat:{user_id}", response, ex=3600)
    return jsonify({'reply': response})
