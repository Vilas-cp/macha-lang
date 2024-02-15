#!/bin/bash


echo "Starting a new shell for client side!!..."
cd ./client && npm run dev &
echo "Starting a new shell for server side!!..."
cd ./server && npm run start

wait

echo "Both of them have executed."
