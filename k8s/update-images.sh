#!/usr/bin/env bash
set -euo pipefail

# Image names used by the Kubernetes manifests
FRONTEND_IMAGE="coin-manager-frontend:latest"
BACKEND_IMAGE="coin-manager-backend:latest"
NAMESPACE="coin-manager"

# Directory resolution
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "=========================================================="
echo " Starting Coin Manager Kubernetes Image Update Process"
echo "=========================================================="

# Step 0: Check Minikube status
echo "[1/4] Verifying Minikube status..."
if ! minikube status >/dev/null 2>&1; then
  echo "Error: Minikube is not running. Please start it with 'minikube start'." >&2
  exit 1
fi
echo "Minikube is running."

# Step 1: Build Docker images locally
echo "[2/4] Building container images using project Dockerfiles..."
echo "  -> Building frontend image (${FRONTEND_IMAGE})..."
docker build --network host -t "${FRONTEND_IMAGE}" "${ROOT_DIR}/front-end"

echo "  -> Building backend image (${BACKEND_IMAGE})..."
docker build --network host -t "${BACKEND_IMAGE}" "${ROOT_DIR}/back-end"

# Step 2: Make images available to Minikube
echo "[3/4] Loading images into Minikube cluster..."
minikube ssh -- "docker rmi -f ${FRONTEND_IMAGE} ${BACKEND_IMAGE} 2>/dev/null || true" >/dev/null 2>&1 || true

echo "  -> Loading ${FRONTEND_IMAGE}..."
minikube image load --overwrite=true "${FRONTEND_IMAGE}"

echo "  -> Loading ${BACKEND_IMAGE}..."
minikube image load --overwrite=true "${BACKEND_IMAGE}"

# Step 3: Trigger rolling restart to apply new images
echo "[4/4] Updating Kubernetes deployments in namespace '${NAMESPACE}'..."
if kubectl get deployment frontend -n "${NAMESPACE}" >/dev/null 2>&1; then
  echo "  -> Restarting deployment/frontend..."
  kubectl rollout restart deployment/frontend -n "${NAMESPACE}"
  echo "  -> Waiting for deployment/frontend to be ready..."
  kubectl rollout status deployment/frontend -n "${NAMESPACE}" --timeout=120s
else
  echo "  -> deployment/frontend not found in namespace '${NAMESPACE}', skipping rollout."
fi

if kubectl get deployment backend -n "${NAMESPACE}" >/dev/null 2>&1; then
  echo "  -> Restarting deployment/backend..."
  kubectl rollout restart deployment/backend -n "${NAMESPACE}"
  echo "  -> Waiting for deployment/backend to be ready..."
  kubectl rollout status deployment/backend -n "${NAMESPACE}" --timeout=120s
else
  echo "  -> deployment/backend not found in namespace '${NAMESPACE}', skipping rollout."
fi

echo "=========================================================="
echo " Image update completed successfully!"
echo "=========================================================="
