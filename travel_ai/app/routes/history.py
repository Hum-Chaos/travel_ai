from flask import Blueprint, request, jsonify
from ..models import ChatHistory, User, db

bp = Blueprint('history', __name__, url_prefix='/api/history')

@bp.route('/<int:user_id>', methods=['GET'])
def get_history(user_id):
    """根据用户ID获取其最近的聊天记录"""
    # 检查用户是否存在，这是一个好习惯
    user = User.query.get(user_id)
    if not user:
        return jsonify({"success": False, "message": "用户不存在"}), 404

    # 查询该用户的所有聊天记录，按时间戳降序排列，最多取50条
    histories = ChatHistory.query.filter_by(user_id=user_id) \
        .order_by(ChatHistory.timestamp.desc()) \
        .limit(50) \
        .all()

    # 将查询结果格式化为列表
    history_list = [{
        "id": h.id,
        "role": h.role, # 'user' 或 'coze'
        "content": h.content,
        "timestamp": h.timestamp.isoformat() + 'Z' # 使用ISO 8601标准格式，方便前端解析
    } for h in histories]

    # 【建议】因为查询是降序的，但前端显示通常是升序（旧消息在上面）
    # 所以在这里反转列表，前端可以直接渲染
    history_list.reverse()

    return jsonify({
        "success": True,
        "history": history_list
    })
