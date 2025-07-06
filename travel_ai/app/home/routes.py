from flask import Blueprint, jsonify

home_bp = Blueprint('home', __name__, url_prefix='/api/home')

@home_bp.route('/overview', methods=['GET'])
def overview():
    return jsonify({
        'top_recommendations': ['颐和园', '卢浮宫', '奈良公园'],
        'weather': {'北京': '晴', '巴黎': '多云'},
        'culture_tips': ['进入寺庙请脱鞋', '日本地铁请勿接打电话']
    })
