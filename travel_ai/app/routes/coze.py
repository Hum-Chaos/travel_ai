from flask import Blueprint, request, jsonify, current_app
from ..models import User, ChatHistory, db  # 按照你的习惯从 models 导入
import requests

# 使用你定义的蓝图变量名 bp，并直接在这里定义URL前缀
bp = Blueprint('coze', __name__, url_prefix='/api/coze')


@bp.route('/ask', methods=['POST'])
def ask_coze():
    """
    接收前端的用户提问，调用Coze API，并保存双向聊天记录。
    """
    # 1. 获取并校验前端发送的数据
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "请求体为空或非JSON格式"}), 400

    user_id = data.get('user_id')
    message = data.get('message')

    if not user_id or not message:
        return jsonify({"success": False, "message": "缺少 user_id 或 message 参数"}), 400

    # 2. 查询用户信息
    user = User.query.get(user_id)
    if not user:
        return jsonify({"success": False, "message": "用户不存在"}), 404

    try:
        # 3. 保存用户的提问到数据库
        user_history = ChatHistory(user_id=user_id, role='user', content=message)
        db.session.add(user_history)

        # --- 调用Coze API的逻辑 ---
        # 你可以把这部分逻辑整体移动到你的 call_coze_api 函数中

        # 3.1. 构建提问(Prompt)
        # 结合用户的偏好（hobbies）来让提问更具个性化
        prompt = f"请根据以下用户信息和问题，为我生成一个旅游推荐。用户信息：偏好是'{user.hobbies}'。用户当前问题是：'{message}'"

        # 3.2. 准备请求头和载荷
        headers = {
            'Authorization': f"Bearer {current_app.config['COZE_API_KEY']}",
            'Content-Type': 'application/json'
        }
        payload = {
            "bot_id": current_app.config['COZE_BOT_ID'],
            "user": str(user_id),  # Coze API 需要 user 是字符串格式
            "query": prompt,
            "stream": False
        }

        # 3.3. 发送请求
        response = requests.post(current_app.config['COZE_API_URL'], headers=headers, json=payload, timeout=60)
        response.raise_for_status()  # 如果HTTP状态码是4xx或5xx，将抛出异常

        coze_data = response.json()

        # 3.4. 解析Coze的回复 (请根据Coze最新的API文档确认此路径)
        coze_reply = ""
        for msg in coze_data.get('messages', []):
            if msg.get('type') == 'answer':
                coze_reply = msg.get('content')
                break

        if not coze_reply:
            raise Exception("从Coze API返回的数据中未能解析出有效回答")

        # --- API调用结束 ---

        # 4. 保存Coze的回复到数据库
        coze_history = ChatHistory(user_id=user_id, role='coze', content=coze_reply)
        db.session.add(coze_history)

        # 5. 提交数据库事务
        db.session.commit()

        # 6. 向前端返回成功响应
        return jsonify({
            "success": True,
            "reply": coze_reply
        })

    except requests.exceptions.RequestException as e:
        db.session.rollback()  # 如果API调用失败，回滚数据库操作
        print(f"Error calling Coze API: {e}")
        return jsonify({"success": False, "message": "调用外部AI服务失败"}), 503  # 503 Service Unavailable
    except Exception as e:
        db.session.rollback()  # 其他任何异常也需要回滚
        print(f"An unexpected error occurred: {e}")
        return jsonify({"success": False, "message": f"服务器内部错误: {e}"}), 500
# from flask import Blueprint, request, jsonify, current_app
# from ..models import User, ChatHistory, db
# from ..utils.coze_helper import call_coze_api
# import datetime
# import requests
#
# bp = Blueprint('coze', __name__, url_prefix='/api/coze')
#
#
# @bp.route('/ask', methods=['POST'])
# def ask_coze():
#     data = request.get_json()
#     user_id = data.get('user_id')
#     message = data.get('message')
#
#     if not user_id or not message:
#         return jsonify({"success": False, "message": "缺少参数"}), 400
#
#     user = User.query.get(user_id)
#     if not user:
#         return jsonify({"success": False, "message": "用户不存在"}), 404
#
#     # 保存用户消息
#     user_history = ChatHistory(user_id=user_id, role='user', content=message)
#     db.session.add(user_history)
#
#     # 调用Coze API
#     coze_response = call_coze_api(message, user.hobbies)
#
#     if coze_response:
#         # 保存Coze回复
#         coze_history = ChatHistory(
#             user_id=user_id,
#             role='coze',
#             content=coze_response
#         )
#         db.session.add(coze_history)
#         db.session.commit()
#
#         return jsonify({
#             "success": True,
#             "reply": coze_response
#         })
#
#     db.session.rollback()
#     return jsonify({"success": False, "message": "调用Coze API失败"}), 500