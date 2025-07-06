from flask import Blueprint, request, jsonify
import requests
import json

itinerary_bp = Blueprint('itinerary', __name__, url_prefix='/api/itinerary')

@itinerary_bp.route('/adjust', methods=['POST'])
def adjust():
    data = request.json
    city = data.get('city')
    if not city:
        return jsonify({'error': 'City required'}), 400
    key = 'your_amap_api_key'
    weather_url = f"https://restapi.amap.com/v3/weather/weatherInfo?city={city}&key={key}"
    resp = requests.get(weather_url)
    weather = resp.json()
    if 'rain' in json.dumps(weather).lower():
        return jsonify({'adjusted': True, 'note': '当前有雨，建议更改为室内行程'})
    return jsonify({'adjusted': False, 'note': '天气良好，无需更改'})