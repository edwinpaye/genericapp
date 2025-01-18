#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Shutting down Angular project Docker container..."
sudo docker stop angular-app

echo "Deletting Docker container..."
sudo docker rm angular-app

echo "Deletting Docker image..."
sudo docker rmi angular-nginx-app

echo "All current docker containers: "
sudo docker ps -a
echo "All current docker images: "
sudo docker images

echo "Exit successfully..."
