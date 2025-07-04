from app import create_app
from app.extensions import cors, db

# 调用create_app()创建Flask应用实例
app = create_app()

# 初始化CORS扩展，配置跨域访问规则)
cors.init_app(app, resources={r"/api/*": {"origins": "*"}})


if __name__ == '__main__':
    print("🚀 Travel AI 项目启动中...")
    app.run(host='0.0.0.0', port=5000, debug=True)



