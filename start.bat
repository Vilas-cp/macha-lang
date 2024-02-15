@echo off

echo Starting client side...
start /B cmd /c "cd ./client && npm run dev"

echo Starting server side...
start /B cmd /c "cd ./server && npm run start"

echo Both processes have started.