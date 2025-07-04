from app import create_app
from app.extensions import cors, db

app = create_app()
cors.init_app(app, resources={r"/api/*": {"origins": "*"}})


if __name__ == '__main__':
    print("🚀 Travel AI 项目启动中...")
    app.run(host='0.0.0.0', port=5000, debug=True)



