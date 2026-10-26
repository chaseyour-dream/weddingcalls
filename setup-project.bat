@echo off
echo ========================================
echo   Wedding Calls - Project Setup
echo ========================================

echo.
echo [1/4] Installing Python dependencies...
pip install -r requirements.txt

echo.
echo [2/4] Running database migrations...
python manage.py migrate

echo.
echo [3/4] Populating sample data...
python manage.py populate_data

echo.
echo [4/4] Installing Node.js dependencies...
cd frontend
npm install

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Create admin: python manage.py createsuperuser
echo 2. Start backend: start-backend.bat
echo 3. Start frontend: start-frontend.bat
echo.
echo Visit: http://localhost:3000
pause
