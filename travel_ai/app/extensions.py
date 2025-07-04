from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# 集中管理 Flask 扩展的初始化对象
db = SQLAlchemy()
cors = CORS()