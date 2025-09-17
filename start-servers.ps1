Write-Host "Starting FoodieHub Servers..." -ForegroundColor Green
Write-Host ""

Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd '$PWD\backend'; node index.js" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd '$PWD\frontend'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "Servers are starting..." -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Admin Dashboard: http://localhost:3001/admin" -ForegroundColor Cyan
Write-Host ""
Write-Host "Admin Credentials:" -ForegroundColor Magenta
Write-Host "Email: admin@foodiehub.com" -ForegroundColor White
Write-Host "Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

