@echo off
echo Testing Django API endpoints...
echo.
echo Testing Services API:
curl -X GET http://192.168.15.65:8000/api/services/
echo.
echo.
echo Testing Team API:
curl -X GET http://192.168.15.65:8000/api/team/
echo.
pause
