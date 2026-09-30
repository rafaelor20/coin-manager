# Coin Manager - Kubernetes Local Environment

This directory contains the Kubernetes manifests and automation scripts to run the Coin Manager application locally using [Minikube](https://minikube.sigs.k8s.io/).

---

## Architecture Overview

The local Kubernetes environment consists of three core components running inside a dedicated namespace (`coin-manager`):

1. **Database (`database.yaml`)**:
   - PostgreSQL container (`rafaelor20/coin_manager_db:v2`) managed by a `Deployment`.
   - Data is persisted via a `PersistentVolumeClaim` (`postgres-pvc`) so information survives pod restarts.
   - Internal `ClusterIP` Service exposing port `5432`.
2. **Backend API (`backend.yaml`)**:
   - Express/Node.js application container (`coin-manager-backend:latest`).
   - Exposes port `5000` via an internal `ClusterIP` Service.
   - Connects to the database service at `database:5432`.
   - Includes liveness and readiness health checks pointing to `/health`.
3. **Frontend (`frontend.yaml`)**:
   - Nginx web server (`nginx:mainline-alpine`) serving the pre-built React application and acting as a reverse proxy for `/api/` calls.
   - Initialized via an init container that extracts static files from `coin-manager-frontend:latest`.
   - Exposes port `80` to the host machine via a `NodePort` Service (`30080`).

---

## Directory Structure

```text
k8s/
├── README.md            # This documentation guide
├── namespace.yaml       # Namespace definition (coin-manager)
├── secret.yaml          # Sensitive credentials (passwords, JWT secret)
├── configmap.yaml       # Non-sensitive configuration and Nginx proxy rules
├── database.yaml        # Database PVC, Deployment, and Service
├── backend.yaml         # Backend Deployment and Service
├── frontend.yaml        # Frontend Deployment and NodePort Service
├── update-images.sh     # Automation script to rebuild and reload images
└── .gitignore           # Git ignore rules for local secret overrides
```

---

## 1. Prerequisites

Before starting, ensure that the following tools are installed on your workstation:

### Docker
Docker is required to build the container images and run the Minikube virtual environment.
- Verify installation:
  ```bash
  docker --version
  ```
- If not installed, follow the official guide: [Docker Desktop / Engine Installation](https://docs.docker.com/get-docker/).

### Minikube
Minikube runs a single-node Kubernetes cluster inside a local container or VM.
- Verify installation:
  ```bash
  minikube version
  ```
- If not installed, install Minikube:
  ```bash
  # Linux (amd64)
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  sudo install minikube-linux-amd64 /usr/local/bin/minikube
  ```
  *(For macOS / Windows, see [Minikube Start Guide](https://minikube.sigs.k8s.io/docs/start/)).*

### kubectl
`kubectl` is the standard Kubernetes command-line interface.
- Verify installation:
  ```bash
  kubectl version --client
  ```
- If not installed:
  ```bash
  # Linux (amd64)
  curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
  sudo install kubectl /usr/local/bin/kubectl
  ```

---

## 2. Start Minikube

Start your local Minikube cluster. A minimum of 2 CPUs and 4 GB (4096 MB) of memory is recommended:

```bash
minikube start --cpus=2 --memory=4096 --driver=docker
```

Verify that the cluster is healthy:

```bash
minikube status
```

---

## 3. Build and Load Application Images

The backend and frontend container images must be built and loaded into Minikube before deploying the manifests.

You can automatically build both images and load them into Minikube using the provided script:

```bash
./k8s/update-images.sh
```

Or perform the steps manually:

1. Build backend image:
   ```bash
   docker build -t coin-manager-backend:latest ./back-end
   minikube image load coin-manager-backend:latest
   ```

2. Build frontend image:
   ```bash
   docker build -t coin-manager-frontend:latest ./front-end
   minikube image load coin-manager-frontend:latest
   ```

3. Ensure the pre-seeded PostgreSQL database image is available in Minikube:
   ```bash
   minikube image load rafaelor20/coin_manager_db:v2
   ```

---

## 4. Deploy the Project

Deploy the Kubernetes manifests into your cluster in order:

```bash
# 1. Create the dedicated namespace
kubectl apply -f k8s/namespace.yaml

# 2. Apply configuration and secrets
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/configmap.yaml

# 3. Deploy the database (PVC, Deployment, Service)
kubectl apply -f k8s/database.yaml

# 4. Deploy the backend API
kubectl apply -f k8s/backend.yaml

# 5. Deploy the frontend application
kubectl apply -f k8s/frontend.yaml
```

Alternatively, apply all files at once:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/
```

Wait for all deployments to roll out and become ready:

```bash
kubectl rollout status deployment/database -n coin-manager --timeout=120s
kubectl rollout status deployment/backend -n coin-manager --timeout=120s
kubectl rollout status deployment/frontend -n coin-manager --timeout=120s
```

---

## 5. Check Deployment Status

Use the following commands to monitor and verify your deployment:

- **Check Pods**:
  ```bash
  kubectl get pods -n coin-manager
  ```
  All pods (`database`, `backend`, `frontend`) should display `STATUS: Running` with `READY: 1/1`.

- **Check Services**:
  ```bash
  kubectl get svc -n coin-manager
  ```

- **Check Deployments**:
  ```bash
  kubectl get deployments -n coin-manager
  ```

- **Check PersistentVolumeClaims**:
  ```bash
  kubectl get pvc -n coin-manager
  ```
  `postgres-pvc` should be in `Bound` status.

- **Check Container Logs**:
  ```bash
  # Backend logs
  kubectl logs -n coin-manager -l app=backend --tail=100 -f

  # Database logs
  kubectl logs -n coin-manager -l app=database --tail=100 -f

  # Frontend logs
  kubectl logs -n coin-manager -l app=frontend -c nginx --tail=100 -f
  ```

---

## 6. Access the Application

### Option A: Via Minikube Service URL (Recommended)
Run the following command to get the browser-accessible URL for the frontend:

```bash
minikube service frontend -n coin-manager
```

This will automatically open your default browser to the assigned NodePort URL (e.g., `http://192.168.49.2:30080` or tunnel URL).

To print only the URL without opening the browser:
```bash
minikube service frontend -n coin-manager --url
```

### Option B: Via Port Forwarding
Alternatively, forward the service directly to `localhost:8080`:

```bash
kubectl port-forward -n coin-manager svc/frontend 8080:80
```

Then visit:
```text
http://localhost:8080
```

### Testing Credentials
To sign into the application:
- **Email**: `user@test.com`
- **Password**: `qwerasdf`

---

## 7. Update Application Images

Whenever you make changes to either the `front-end/` or `back-end/` source code:

1. Run the update script:
   ```bash
   ./k8s/update-images.sh
   ```
2. The script will:
   - Build the updated Docker images.
   - Load them into the Minikube cluster.
   - Perform a rolling restart (`kubectl rollout restart`) on the affected deployments.
   - Wait for the new pods to become healthy and ready.

---

## 8. Stop the Environment

To stop Minikube and pause resource usage without losing database data:

```bash
minikube stop
```

When you are ready to continue working, simply run:
```bash
minikube start
```
Your persistent database data and configurations will still be intact.

---

## 9. Delete All Project Data (Complete Reset)

To completely remove all Kubernetes resources, deployments, services, secrets, and **permanently delete the persistent database data**:

```bash
<<<<<<< HEAD
kubectl delete namespace coin-manager
=======
kubectl apply -R -f .
>>>>>>> main
```

> [!CAUTION]
> Deleting the `coin-manager` namespace permanently removes the `PersistentVolumeClaim` (`postgres-pvc`) and all stored database records. Unrelated Minikube projects in other namespaces will not be affected.

To restart the project from scratch after deleting the namespace, repeat **Section 4 (Deploy the Project)**.

---

## 10. Troubleshooting

### 1. Pod in `CrashLoopBackOff`
Inspect the pod events and container logs:
```bash
kubectl describe pod -n coin-manager -l app=<backend|frontend|database>
kubectl logs -n coin-manager -l app=<backend|frontend|database> --previous
```

### 2. Pod in `ImagePullBackOff` or `ErrImageNeverPull`
The local image is missing from Minikube's local cache:
```bash
# Check images loaded in Minikube
minikube image ls | grep coin-manager

# Reload the missing image
minikube image load coin-manager-backend:latest
minikube image load coin-manager-frontend:latest
```

### 3. Backend unable to connect to database
- Verify the database service is running:
  ```bash
  kubectl get svc database -n coin-manager
  ```
- Test connectivity from the backend pod:
  ```bash
  kubectl exec -n coin-manager deployment/backend -- nc -zv database 5432
  ```
- Verify the `DATABASE_URL` secret:
  ```bash
  kubectl get secret coin-manager-secrets -n coin-manager -o yaml
  ```

### 4. Frontend unable to reach backend
- The frontend reverse proxy forwards all `/api/*` requests to `http://backend:5000/*`.
- Verify the backend service endpoints:
  ```bash
  kubectl get endpoints backend -n coin-manager
  ```
- Check Nginx access and error logs:
  ```bash
  kubectl logs -n coin-manager deployment/frontend -c nginx
  ```
