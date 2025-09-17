@echo off
echo Starting FoodieHub Servers...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && node index.js"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Servers are starting...
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo Admin Dashboard: http://localhost:3001/admin
echo.
echo Admin Credentials:
echo Email: admin@foodiehub.com
echo Password: admin123
echo.
pause

