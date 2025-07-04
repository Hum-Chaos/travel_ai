from flask import Blueprint, request, jsonify
from ..models import ChatHistory, db

bp = Blueprint('history', __name__, url_prefix='/api/history')


@bp.route('/<int:user_id>', methods=['GET'])
def get_history(user_id):
    # 获取最近50条记录
    histories = ChatHistory.query.filter_by(user_id=user_id) \
        .order_by(ChatHistory.timestamp.desc()) \
        .limit(50) \
        .all()

    history_list = [{
        "id": h.id,
        "role": h.role,
        "content": h.content,
        "timestamp": h.timestamp.isoformat()
    } for h in histories]

    return jsonify({
        "success": True,
        "history": history_list
    })