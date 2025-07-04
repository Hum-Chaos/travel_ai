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
    from .routes.coze import bp as coze_bp
    from .routes.history import bp as history_bp
    from .routes.auth import bp as auth_bp  # 引入 auth 蓝图
    # 注册蓝图
    app.register_blueprint(coze.bp)
    app.register_blueprint(history.bp)
    app.register_blueprint(auth.bp)

    return app
