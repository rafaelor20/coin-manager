# Local AI Kubernetes Implementation Tasks

## Objective

Implement a simple Kubernetes environment for the project using **Minikube**, with the help of a local AI coding agent.

The Kubernetes configuration must live entirely inside the `k8s/` directory.

The goal is **simplicity and basic functionality**, not production-grade Kubernetes infrastructure. The resulting environment must be sufficient to run:

- Frontend
- Backend/API
- Database

The implementation should be easy to understand, start, update, reset, and remove.

---

# General Requirements

- Use **Minikube** as the Kubernetes environment.
- Use standard Kubernetes manifests (`Deployment`, `Service`, `ConfigMap`, `Secret`, `PersistentVolumeClaim`, etc.) only when actually needed.
- Keep the architecture minimal.
- Do not introduce Helm unless it is strictly necessary.
- Do not introduce an Ingress unless it provides a clear benefit for the basic local setup.
- Keep all Kubernetes-related files inside `k8s/`.
- Do not modify application source code unless it is necessary to make the containers work in Kubernetes.
- Prefer existing Docker images and existing application configuration.
- Use environment variables for configuration instead of hardcoding credentials or connection information into application code.
- The database must persist data while the Kubernetes resources are running.
- The project must remain easy to completely reset.

---

# Task 1 — Inspect the Existing Project

Before creating Kubernetes files:

1. Inspect the repository structure.
2. Identify:
   - Frontend application and Docker image/build process.
   - Backend/API application and Docker image/build process.
   - Database technology.
   - Existing Dockerfiles.
   - Existing Docker Compose configuration, if available.
   - Required environment variables.
   - Frontend-to-backend configuration.
   - Backend-to-database configuration.
3. Identify the ports exposed by each service.
4. Determine whether the frontend currently expects the backend to be accessible through:
   - a browser-visible URL, or
   - an internal container/service URL.
5. Reuse existing configuration whenever possible.

Do not start implementing Kubernetes resources until the existing architecture is understood.

---

# Task 2 — Create the Kubernetes Directory Structure

Create the following basic structure:

```text
k8s/
├── README.md
├── namespace.yaml
├── frontend.yaml
├── backend.yaml
├── database.yaml
├── configmap.yaml
├── secret.yaml
├── update-images.sh
└── .gitignore
```

The exact file structure may be adjusted if the existing project requires it, but keep it simple.

Avoid creating unnecessary files.

---

# Task 3 — Create a Kubernetes Namespace

Create a dedicated namespace for the project.

Requirements:

- Use a project-specific namespace.
- All project resources should be deployed into this namespace.
- Make commands in `README.md` use this namespace explicitly where appropriate.

---

# Task 4 — Configure the Database

Create the database Kubernetes resources.

Requirements:

- Use a `Deployment` for the database unless there is a strong reason to use another controller.
- Create a `Service` for internal access.
- Create a `PersistentVolumeClaim` so database data survives pod restarts.
- Store database credentials using a Kubernetes `Secret`.
- Store non-sensitive configuration using a `ConfigMap` when appropriate.
- The backend must connect to the database using the Kubernetes Service name rather than a pod IP.
- Do not expose the database outside the Minikube cluster unless absolutely necessary.

Keep the database configuration suitable for local development.

---

# Task 5 — Configure the Backend

Create the backend Kubernetes resources.

Requirements:

- Create a backend `Deployment`.
- Create a backend `Service`.
- Configure the backend to connect to the database through the database Service.
- Pass configuration through environment variables.
- Use the Kubernetes Secret for sensitive database credentials.
- Use the ConfigMap for non-sensitive configuration.
- Configure the appropriate container port.
- Add basic readiness/liveness checks if the application already provides a suitable health endpoint.
- Do not add complex autoscaling or production infrastructure.

The backend should be reachable by the frontend through the Kubernetes network.

---

# Task 6 — Configure the Frontend

Create the frontend Kubernetes resources.

Requirements:

- Create a frontend `Deployment`.
- Create a frontend `Service`.
- Configure the appropriate container port.
- Make the frontend accessible from the host machine through Minikube.
- Use the simplest suitable Minikube access method.

Prefer a `NodePort` or another simple Minikube-compatible approach rather than introducing an unnecessary ingress controller.

If the frontend requires a backend URL at build time, document this clearly and configure it appropriately.

---

# Task 7 — Verify Service Communication

Verify that the architecture works as intended:

```text
Browser
   |
   v
Frontend Service
   |
   v
Frontend Pod
   |
   v
Backend Service
   |
   v
Backend Pod
   |
   v
Database Service
   |
   v
Database Pod
```

Check that:

- Frontend starts successfully.
- Backend starts successfully.
- Backend can resolve the database Service.
- Backend can connect to the database.
- Frontend can communicate with the backend.
- Database data survives a pod restart.
- No service depends on hardcoded pod IP addresses.

Fix configuration problems discovered during this task.

---

# Task 8 — Create the Image Update Script

Create:

```text
k8s/update-images.sh
```

The script must provide a simple way to rebuild/update the project's container images and make the updated images available to Minikube.

Requirements:

1. Detect or clearly document the required Docker image names.
2. Build the frontend and backend images using the project's existing Dockerfiles.
3. Make the images available to Minikube.
4. Update/restart the relevant Kubernetes deployments.
5. Ensure Kubernetes does not continue using an old cached image when a locally rebuilt image is intended.
6. Wait for the deployments to become ready.
7. Return a non-zero exit code if an important step fails.
8. Use `set -euo pipefail` or an equivalent robust error-handling approach.
9. Print clear progress messages.

Prefer a simple implementation such as building images directly into the Minikube Docker environment or loading the resulting images into Minikube.

Do not introduce a container registry unless the project already requires one.

The script should be executable.

---

# Task 9 — Create the README

Create:

```text
k8s/README.md
```

The README must be written entirely in **English**.

It must explain, step by step:

## Prerequisites

Explain how to verify/install the required tools:

- Docker
- Minikube
- kubectl

Do not assume that the user knows Kubernetes.

## Start Minikube

Explain the command required to start Minikube.

Include any CPU/memory requirements that are actually necessary for this project.

## Build/Load Images

Explain how the frontend and backend images become available to Minikube.

Explain how to use:

```bash
./update-images.sh
```

## Deploy the Project

Provide the exact commands needed to deploy everything in `k8s/`.

The commands should be copy/paste friendly.

## Check Status

Document useful commands for checking:

- Pods
- Services
- Deployments
- PersistentVolumeClaims
- Logs

## Access the Frontend

Explain exactly how to access the frontend from the host machine.

Prefer a simple command such as:

```bash
minikube service <frontend-service> -n <namespace>
```

or another method actually compatible with the implementation.

Do not document a URL that has not been verified.

## Update Images

Explain how to rebuild the application images and update the running deployment using:

```bash
./update-images.sh
```

## Stop the Environment

Explain how to stop Minikube without deleting project data.

## Delete All Project Data

Provide a clearly labeled section explaining how to completely remove the project's Kubernetes resources and persistent database data.

The reset procedure must remove:

- Deployments
- Services
- ConfigMaps
- Secrets
- Pods
- PersistentVolumeClaims
- Database persistent data

The procedure must NOT accidentally delete unrelated Minikube projects if possible.

For example, prefer deleting the project's namespace instead of using broad cluster-wide deletion commands.

Also explain that deleting the namespace permanently removes the project's persistent database data.

## Troubleshooting

Include basic troubleshooting commands for:

- Pod not starting
- ImagePullBackOff
- CrashLoopBackOff
- Backend unable to connect to database
- Frontend unable to reach backend
- Viewing container logs

Keep troubleshooting concise.

---

# Task 10 — Add Safe Local Configuration Handling

Create `k8s/.gitignore` if needed.

Requirements:

- Do not commit real passwords, API keys, tokens, or other secrets.
- If a Secret manifest contains example credentials, make it obvious that they are development-only values.
- Prefer documenting how developers should provide local secrets rather than committing real credentials.
- Do not add unnecessary secret-management infrastructure for this local Minikube setup.

---

# Task 11 — Validate the Complete Setup

Perform a clean validation.

The AI agent must:

1. Start Minikube.
2. Build/load the required images.
3. Apply all Kubernetes resources.
4. Wait for deployments to become ready.
5. Verify all expected pods are running.
6. Verify Services exist.
7. Verify the backend can communicate with the database.
8. Verify the frontend is accessible.
9. Verify application functionality at the basic level.
10. Restart the database pod and verify that persisted data remains available.
11. Run the image update script.
12. Verify that the updated deployments become ready.
13. Test the complete environment again.

If something fails, diagnose and fix it before considering the implementation complete.

---

# Task 12 — Keep the Implementation Simple

Throughout the implementation, avoid unnecessary Kubernetes complexity.

Do NOT add unless specifically required:

- Helm
- Ingress controllers
- Operators
- Service meshes
- Horizontal Pod Autoscalers
- StatefulSets
- External databases
- Cloud-specific resources
- CI/CD pipelines
- Monitoring stacks
- Prometheus/Grafana
- Complex networking
- Production-grade TLS
- External container registries

The target is a **simple local development Kubernetes environment using Minikube**.

---

# Definition of Done

The implementation is complete only when all of the following are true:

- [ ] `k8s/` contains all Kubernetes-related configuration.
- [ ] Minikube can start the environment.
- [ ] Frontend runs in Kubernetes.
- [ ] Backend runs in Kubernetes.
- [ ] Database runs in Kubernetes.
- [ ] Backend connects to the database through a Kubernetes Service.
- [ ] Frontend can communicate with the backend.
- [ ] Database data is persisted through a PVC.
- [ ] Frontend can be accessed from the host machine.
- [ ] `k8s/update-images.sh` rebuilds/updates the application images.
- [ ] The image update process works with Minikube.
- [ ] `k8s/README.md` is complete and written in English.
- [ ] README explains how to start the environment.
- [ ] README explains how to access the frontend.
- [ ] README explains how to update images.
- [ ] README explains how to stop the environment.
- [ ] README explains how to delete all project data.
- [ ] The complete project can be removed by deleting its namespace.
- [ ] No real credentials are committed.
- [ ] The implementation has been tested from a clean Minikube state.

---

# AI Agent Rules

When implementing these tasks:

1. Inspect the existing project before making assumptions.
2. Reuse existing Dockerfiles and application configuration whenever possible.
3. Make the smallest changes necessary.
4. Do not rewrite application code merely to fit Kubernetes.
5. Keep Kubernetes manifests readable for a developer who is learning Kubernetes.
6. Prefer explicit configuration over clever abstractions.
7. Test each task before moving to the next one when practical.
8. If an existing project decision conflicts with this document, preserve working application behavior and adapt the Kubernetes configuration instead.
9. Do not silently introduce production-oriented infrastructure.
10. At the end, report:
   - Files created.
   - Files modified.
   - Commands used to validate the environment.
   - Any assumptions made.
   - Any remaining limitations.
