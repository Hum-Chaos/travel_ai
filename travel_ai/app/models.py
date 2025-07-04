from app.extensions import db  # 从你统一的 extensions 文件导入 db 实例
from datetime import datetime


# 你的 User 模型
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    # 按照你的设计，这里有一个hobbies字段
    hobbies = db.Column(db.String(200), nullable=True)  # 存储用户的爱好或偏好

    # 建立与ChatHistory模型的一对多关系
    # 'histories' 是反向引用，让你可以通过 user.histories 访问该用户的所有聊天记录
    histories = db.relationship('ChatHistory', backref='author', lazy='dynamic')

    def __repr__(self):
        return f'<User {self.username}>'


# 你的 ChatHistory 模型
class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    # 区分消息是来自用户还是来自Coze
    role = db.Column(db.String(10), nullable=False)  # 'user' or 'coze'

    # 消息内容
    content = db.Column(db.Text, nullable=False)

    # 消息时间戳
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    # 外键，关联到User模型
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<ChatHistory from {self.role}: {self.content[:30]}>'
# from sqlalchemy import Enum, Text, DECIMAL
# from datetime import datetime, timezone
# from app.extensions import db
#
#
# # 用户表模型
# class User(db.Model):
#     __tablename__ = 'users'
#     __table_args__ = {'schema': 'tourist_users'}  # 指定数据库schema
#
#     user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     username = db.Column(db.String(50), nullable=False, unique=True)
#     password_hash = db.Column(db.String(255), nullable=False)
#     destination = db.Column(db.String(255))
#     age = db.Column(db.Integer)
#     sex = db.Column(Enum('male', 'female', 'other', name='sex_types'))
#     country = db.Column(db.String(100))
#     region = db.Column(db.String(100))
#     budget = db.Column(DECIMAL(10, 2))  # 精度10位，小数2位
#     remarks = db.Column(Text)
#     created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
#     updated_at = db.Column(
#         db.DateTime,
#         default=lambda: datetime.now(timezone.utc),
#         onupdate=lambda: datetime.now(timezone.utc)
#     )
#
#     # 关联对话历史
#     conversations = db.relationship('ChatHistory', backref='user', lazy=True)
#
# # 对话历史表模型
# class ChatHistory(db.Model):
#     __tablename__ = 'conversation_history'
#     __table_args__ = {'schema': 'tourist_users'}  # 指定数据库schema
#
#     record_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('tourist_users.users.user_id'), nullable=False)
#     session_id = db.Column(db.String(36), nullable=False)
#     role = db.Column(Enum('user', 'assistant', 'system', name='role_types'))
#     message = db.Column(Text, nullable=False)
#     tokens = db.Column(db.Integer)
#     timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
#     is_training = db.Column(db.SmallInteger, default=0)  # 使用SmallInteger代替tinyint(1)