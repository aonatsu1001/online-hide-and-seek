# backend/main.py

import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# プロジェクトのルートディレクトリをPythonパスに追加（必要に応じて）
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# FastAPIアプリケーションインスタンスをここで生成
app = FastAPI(
    title="Online Hide-and-Seek API",
    description="Main API for the online hide-and-seek game.",
    version="0.1.0",
)

# CORSミドルウェアの設定
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173", # Viteのデフォルトポート
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# room_routerをインポート
from backend.app.api.room_router import router as room_router
# role_managerのルーターをインポート
from backend.app.game.role_manager import router as game_router
# ルーターをアプリケーションに含める
app.include_router(room_router, prefix="/room") # room_routerにプレフィックスを設定
app.include_router(game_router) # game_routerは内部でプレフィックスを設定済み

# ルートパスにアクセスした際のメッセージ (オプション)
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Online Hide-and-Seek API!"}

# これで、uvicorn main:app --reload コマンドがこの 'app' インスタンスを実行します
