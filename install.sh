#!/bin/bash


echo "Starting a new shell for to download for client side!!..."
cd ./client && npm i &&
echo "Starting a new shell for to download for server side!!..."
cd ../server && npm i

echo "Both of them have downloaded their packages."