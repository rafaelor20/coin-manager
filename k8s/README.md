# Coin Manager Kubernetes Setup

This document provides instructions on how to set up and run the Coin Manager application on a local Kubernetes cluster using Minikube.

## Prerequisites

Before you begin, ensure you have the following tools installed:

- [**kubectl**](https://kubernetes.io/docs/tasks/tools/install-kubectl/): The Kubernetes command-line tool.
- [**Minikube**](https://minikube.sigs.k8s.io/docs/start/): A tool that lets you run Kubernetes locally.

## 1. Create the Kubernetes Cluster

Start Minikube to create a local Kubernetes cluster:

```bash
minikube start
```

Enable the ingress addon:
```bash
minikube addons enable ingress
```

## 2. Deploy the Application

Apply all the Kubernetes manifests located in this directory:

```bash
kubectl apply -f .
```

This command will create the deployments, services, secrets, and persistent volume claims required for the application to run.

## 3. Accessing the Application

To access the application, you need to get the IP address of your Minikube cluster:

```bash
minikube ip
```

Once you have the IP address, you need to add the following entries to your `/etc/hosts` file to be able to resolve the hosts defined in the ingress rules:

```
<MINIKUBE_IP> frontend.coin-manager.com
<MINIKUBE_IP> backend.coin-manager.com
```

Replace `<MINIKUBE_IP>` with the actual IP address you got from the `minikube ip` command.

Now you can access:
- **Frontend:** [http://frontend.coin-manager.com](http://frontend.coin-manager.com)
- **Backend:** [http://backend.coin-manager.com](http://backend.coin-manager.com)

## 4. Deleting the Cluster

To stop and delete the local Kubernetes cluster, run the following command:

```bash
minikube delete
```

This will remove all the resources associated with the cluster.
