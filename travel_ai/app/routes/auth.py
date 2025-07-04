from flask import Blueprint, request, jsonify
from ..models import User, db
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/register', methods=['POST'])
def register():
    """用户注册接口"""
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
        new_user = User(
            username=username,
            password_hash=generate_password_hash(password),
            email=email,
            hobbies=hobbies
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "注册成功!",
            "user": {
                "id": new_user.id,
                "username": new_user.username
            }
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
    # 从数据库查找用户
    user = User.query.filter_by(username=username).first()

    # 使用 check_password_hash 检查密码
    # 第一个参数是数据库中存储的哈希值 (user.password_hash)
    # 第二个参数是用户本次输入的明文密码 (password)
    if user and check_password_hash(user.password_hash, password):
        # 登录成功
        return jsonify({
            "success": True,
            "message": "登录成功!",
            "user": {
                "id": user.id,
                "username": user.username,
                "hobbies": user.hobbies
            }
        })

    # 用户名不存在或密码错误
    return jsonify({"success": False, "message": "用户名或密码错误"}), 401  # 401 Unauthorized




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