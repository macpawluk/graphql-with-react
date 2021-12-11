#!/bin/bash
cd server
docker-compose up -d

cd ../client
npm install
npm start
