from flask import Flask
from config import Config
from app.extensions import db, redis, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    redis.init_app(app)
    jwt.init_app(app)

    # 注册蓝图
    from chat.routes import chat_bp
    from checklist.routes import checklist_bp
    from home.routes import home_bp
    from info.routes import info_bp
    from itinerary.routes import itinerary_bp
    from phrase.routes import phrase_bp

    app.register_blueprint(chat_bp)
    app.register_blueprint(checklist_bp)
    app.register_blueprint(home_bp)
    app.register_blueprint(info_bp)
    app.register_blueprint(itinerary_bp)
    app.register_blueprint(phrase_bp)

    return app