from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_redis import FlaskRedis
from flask_jwt_extended import JWTManager
from flask_caching import Cache
# 集中管理 Flask 扩展的初始化对象
db = SQLAlchemy()
cors = CORS()
redis = FlaskRedis()
jwt = JWTManager()
cache = Cache()