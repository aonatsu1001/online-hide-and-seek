:: ディレクトリ作成
md backend\app\api
md backend\app\game
md backend\app\websocket
md backend\app\models
md frontend\public
md frontend\src\assets\images
md frontend\src\components
md frontend\src\pages
md frontend\src\services
md frontend\src\styles

:: ファイル作成
echo. > backend\app\__init__.py
echo. > backend\app\api\room_router.py
echo. > backend\app\game\game_logic.py
echo. > backend\app\game\role_manager.py
echo. > backend\app\websocket\connection_manager.py
echo. > backend\app\models\user_model.py
echo. > backend\main.py
echo. > backend\requirements.txt
echo. > backend\.env
echo. > frontend\public\index.html
echo. > frontend\src\assets\images\stage1.png
echo. > frontend\src\assets\images\stage2.png
echo. > frontend\src\components\GameUI.tsx
echo. > frontend\src\components\RoleSelector.tsx
echo. > frontend\src\pages\GamePage.tsx
echo. > frontend\src\pages\LobbyPage.tsx
echo. > frontend\src\pages\StageSelectPage.tsx
echo. > frontend\src\services\socketService.ts
echo. > frontend\src\styles\main.css
echo. > frontend\src\App.tsx
echo. > frontend\package.json
echo. > frontend\tsconfig.json
echo. > .gitignore
echo. > README.md

:: .gitignoreファイルの内容を書き込み
(
echo # Python
echo venv/
echo __pycache__/
echo *.pyc
echo .env
echo.
echo # Node
echo node_modules/
echo dist/
echo build/
echo .DS_Store
) > .gitignore

echo "セットアップが完了しました！"