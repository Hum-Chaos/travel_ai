from flask import Blueprint, request, jsonify
import requests

phrase_bp = Blueprint('phrase', __name__, url_prefix='/api/phrases')

@phrase_bp.route('/list', methods=['GET'])
def list_phrases():
    phrases = [
        {"phrase": "Where is the toilet?", "lang": "en"},
        {"phrase": "请问怎么去火车站？", "lang": "zh"},
    ]
    return jsonify({'phrases': phrases})

@phrase_bp.route('/translate', methods=['POST'])
def translate():
    data = request.json
    phrase = data.get('phrase')
    target = data.get('target_lang')
    if not phrase or not target:
        return jsonify({'error': 'Invalid input'}), 400
    # 示例翻译服务
    resp = requests.get(f'https://api-free.deepl.com/v2/translate?auth_key=your_key&text={phrase}&target_lang={target}')
    trans = resp.json()
    return jsonify({'translated': trans['translations'][0]['text'], 'voice_url': f"/static/audio/{target}.mp3"})