#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Set Docker Hub username (defaults to 'rafaelor20' if no argument is provided)
DOCKERHUB_USERNAME=${1:-rafaelor20}

# Define image names
BACKEND_IMAGE="$DOCKERHUB_USERNAME/coin_manager_node"
REACT_IMAGE="$DOCKERHUB_USERNAME/coin_manager_react"
NGINX_IMAGE="$DOCKERHUB_USERNAME/coin_manager_nginx"
DB_IMAGE="$DOCKERHUB_USERNAME/coin_manager_db"
TAG="latest"
DB_TAG="v3"

echo "Please log in to your Docker Hub account if you haven't already."
docker login

echo "==> Building backend (node) image..."
docker build -t $BACKEND_IMAGE:$TAG ./back-end

echo "==> Building react image..."
docker build -t $REACT_IMAGE:$TAG ./front-end

echo "==> Building nginx image..."
docker build -t $NGINX_IMAGE:$TAG ./nginx

# Note: Your docker-compose.yml doesn't specify a build directory for the database.
# If you have a custom Dockerfile for it (e.g., in a ./database folder), uncomment the lines below:
#echo "==> Building database image..."
#docker build -t $DB_IMAGE:$DB_TAG ./database

echo "==> Pushing backend image to Docker Hub..."
docker push $BACKEND_IMAGE:$TAG

echo "==> Pushing react image to Docker Hub..."
docker push $REACT_IMAGE:$TAG

echo "==> Pushing nginx image to Docker Hub..."
docker push $NGINX_IMAGE:$TAG

#echo "==> Pushing database image to Docker Hub..."
#docker push $DB_IMAGE:$DB_TAG

echo "==> Successfully built and pushed images to Docker Hub!"
