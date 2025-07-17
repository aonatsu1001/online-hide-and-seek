# backend/main.py

import sys
import os

# プロジェクトのルートディレクトリをPythonパスに追加（必要に応じて）
# これにより、backend.apiなどのインポートが可能になる
# 例: backendディレクトリの親ディレクトリから実行する場合
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
# backendディレクトリ内で実行する場合、またはPYTHONPATHが正しく設定されている場合は不要なこともあります

# backend/api/game/role_manager.py から FastAPI アプリケーションインスタンス 'app' をインポート
# role_manager.py で 'app = FastAPI()' と定義しているので、これを直接インポートします
from backend.app.game.role_manager import app

# これで、uvicorn main:app --reload コマンドがこの 'app' インスタンスを実行します
