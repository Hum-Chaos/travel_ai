from flask import Blueprint, request, jsonify
from ..models import User, db
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email', '')
        hobbies = data.get('hobbies', '')

        # 基本验证
        if not username or not password:
            return jsonify({"success": False, "message": "需要用户名和密码"}), 400

        # 检查用户是否存在
        if User.query.filter_by(username=username).first():
            return jsonify({"success": False, "message": "用户名已被使用"}), 400

        # 创建用户
        new_user = User(username=username, email=email, hobbies=hobbies)
        new_user.password = generate_password_hash(password)  # 简单哈希

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "注册成功!",
            "user_id": new_user.id
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"注册出错: {str(e)}"
        }), 500


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # 简单验证
    if not username or not password:
        return jsonify({"success": False, "message": "需要用户名和密码"}), 400

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        return jsonify({
            "success": True,
            "message": "登录成功!",
            "user_id": user.id,
            "hobbies": user.hobbies
        })

    return jsonify({"success": False, "message": "用户名或密码错误"}), 401
# from flask import Blueprint, request, jsonify
# from ..models import User, db
# from werkzeug.security import generate_password_hash
#
# bp = Blueprint('auth', __name__, url_prefix='/api/auth')
#
#
# @bp.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')
#     email = data.get('email', '')
#     hobbies = data.get('hobbies', '')
#
#     if not username or not password:
#         return jsonify({"success": False, "message": "用户名和密码必填"}), 400
#
#     if User.query.filter_by(username=username).first():
#         return jsonify({"success": False, "message": "用户名已存在"}), 400
#
#     new_user = User(username=username, email=email, hobbies=hobbies)
#     new_user.set_password(password)
#
#     db.session.add(new_user)
#     try:
#         db.session.commit()
#         return jsonify({
#             "success": True,
#             "message": "注册成功",
#             "user_id": new_user.id
#         })
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"success": False, "message": f"注册失败: {str(e)}"}), 500
#
#
# @bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')
#
#     user = User.query.filter_by(username=username).first()
#
#     if user and user.check_password(password):
#         return jsonify({
#             "success": True,
#             "user_id": user.id,
#             "hobbies": user.hobbies,
#             "message": "登录成功"
#         })
#
#     return jsonify({"success": False, "message": "用户名或密码错误"}), 401