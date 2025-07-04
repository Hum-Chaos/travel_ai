import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # 基础配置
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')

    # 数据库配置
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'mysql+pymysql://work:123123@localhost:3306/tourist_users?charset=utf8mb4'
    )

    # 数据库连接池优化
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
        'pool_size': 10,
        'max_overflow': 20
    }

    # 数据库性能优化
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Coze API配置 #姜哥令牌
    COZE_API_KEY = os.environ.get('COZE_API_KEY')
    COZE_API_URL = os.environ.get('COZE_API_URL') or 'https://api.coze.cn/v1/workflow/run'
    COZE_BOT_ID = os.environ.get('COZE_BOT_ID')
    # CORS配置
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000,http://localhost:8080')
    # 日志配置
    LOG_LEVEL = 'INFO'
