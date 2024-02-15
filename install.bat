@echo off

echo Starting download for client side...
cd ./client
npm install
cd ..

echo Starting download for server side...
cd ./server
npm install
cd ..

echo Both of them have downloaded their packages.
