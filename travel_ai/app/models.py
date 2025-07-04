from app.extensions import db  # 从你统一的 extensions 文件导入 db 实例
from datetime import datetime


# 你的 User 模型
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

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