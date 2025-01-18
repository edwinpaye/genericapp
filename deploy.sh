#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Build Angular project
echo "Building Angular project..."
ng build --configuration production --base-href /
# ng build --prod --base-href /

# Build Docker image
echo "Building Docker image..."
sudo docker build -t angular-nginx-app .

# Run Docker container
echo "Deploying Docker container..."
sudo docker run -d -p 4000:4000 --name angular-app angular-nginx-app

echo "Deployment completed. The app is running on http://localhost:4000"
