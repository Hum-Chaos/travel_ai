from flask import Flask, jsonify
from .extensions import db, cors
from .routes import auth, coze, history
from .models import User, ChatHistory

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # 直接设置数据库配置
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://work:123123@localhost:3306/tourist_users'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # CORS配置
    app.config['CORS_ORIGINS'] = "http://localhost:3000"

    # 初始化扩展
    db.init_app(app)
    cors.init_app(app)  # 使用默认配置

    # 添加根路由（防止404错误）
    @app.route('/')
    def home():
        return jsonify({
            "status": "success",
            "message": "Travel AI 后端运行中！",
            "database": app.config['SQLALCHEMY_DATABASE_URI']
        })

    with app.app_context():
        db.create_all()

    # 注册蓝图
    app.register_blueprint(auth.bp)
    app.register_blueprint(coze.bp)
    app.register_blueprint(history.bp)

    return app
# from flask import Flask
# from .extensions import db, cors
# from .routes import auth, coze, history
# from config import Config  # 引入配置类
#
#
# def create_app():
#     app = Flask(__name__)
#
#     # 使用类配置而非文件加载
#     app.config.from_object(Config)
#
#     # 初始化扩展
#     db.init_app(app)
#
#     # 正确配置CORS
#     cors.init_app(app, resources={
#         r"/*": {
#             "origins": app.config['CORS_ORIGINS'].split(',')
#             if app.config.get('CORS_ORIGINS') else []
#         }
#     })
#
#     # 添加根路由
#     @app.route('/')
#     def home():
#         return {"status": "success", "message": "Travel AI API 运行中"}, 200
#
#     # 注册蓝图
#     app.register_blueprint(auth.bp, url_prefix='/auth')
#     app.register_blueprint(coze.bp, url_prefix='/api')
#     app.register_blueprint(history.bp, url_prefix='/history')
#
#     # 在应用上下文中创建数据库
#     with app.app_context():
#         db.create_all()
#
#     return app