# SIT737 Task 7P – MongoDB Integration with Node.js Microservice

## 📚 Appendix: Project Setup & Deployment Guide

This appendix provides a step-by-step breakdown of integrating a MongoDB database into a containerized Node.js microservice using Kubernetes. All required YAML files, Dockerfiles, and test instructions are included for reproducibility.

---

## 📁 Project Structure

```
sit737-2025-prac7p/
├── app/
│   ├── server.js
│   ├── db.js
│   ├── Dockerfile
│   └── package.json
├── k8s/
│   ├── mongo-secret.yaml
│   ├── mongo-pv.yaml
│   ├── mongo-deployment.yaml
│   ├── app-deployment.yaml
│   └── app-service.yaml
└── README.md
```

---

## 🧰 Tools & Environment

* Node.js
* Express.js
* Mongoose (MongoDB ODM)
* MongoDB (via Kubernetes)
* Docker + Docker Desktop with Kubernetes enabled
* Kubectl (Kubernetes CLI)
* GitHub (for code hosting)
* Git Bash / Postman (for testing)

---

## ⚙️ Step-by-Step Deployment Instructions

### 1⃣ Node.js App Setup

A basic Express.js app with two endpoints:

* `POST /items` – create a new item
* `GET /items` – retrieve all items

MongoDB connection is handled in `db.js` via `mongoose`.

### 2⃣ Dockerize the App

* Dockerfile in `/app` directory builds the image using Node.js 18
* Image pushed to Docker Hub:
  ➔ `abhishek2806/mongo-app:latest`

### 3⃣ Kubernetes Configuration

All K8s files are located in the `k8s/` directory.

#### a. `mongo-secret.yaml`

Stores base64-encoded MongoDB credentials.

#### b. `mongo-pv.yaml`

Defines PersistentVolumeClaim for MongoDB data.

#### c. `mongo-deployment.yaml`

Deploys MongoDB container and exposes it as a service.

#### d. `app-deployment.yaml`

Deploys the Node.js app container and sets `MONGO_URI` via environment variable.

#### e. `app-service.yaml`

Exposes the app as a `LoadBalancer` (used for testing).

---

## 🥪 Testing the Application

### Option A: **Port Forward (Reliable)**

```bash
kubectl port-forward deployment/mongo-app 3000:3000
```

### Option B: **Check Service Port**

```bash
kubectl get svc mongo-app-service
```

### Example Test – Using `curl`

```bash
# Create item
curl -X POST http://localhost:3000/items \
-H "Content-Type: application/json" \
-d '{"name":"Test Item"}'

# Get items
curl http://localhost:3000/items
```

### Example Test – Using Postman

* **POST** `http://localhost:3000/items`

  ```json
  { "name": "Test Item" }
  ```
* **GET** `http://localhost:3000/items`

---

## 🛠️ Troubleshooting

| Issue                         | Solution                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| `ImagePullBackOff`            | Ensure Docker image is built and pushed correctly            |
| `localhost:32762` not working | Use port forwarding instead                                  |
| PowerShell `curl` errors      | Use Git Bash or Postman                                      |
| No Mongo connection           | Verify `MONGO_URI` in deployment file and Mongo service name |

---

## 📜 Summary

✅ This task demonstrates how to:

* Deploy a Node.js app on Kubernetes
* Integrate MongoDB using secrets, volumes, and service discovery
* Perform CRUD operations using REST endpoints
* Use Docker Hub for image storage
* Use port forwarding for local testing

---

## 📌 GitHub Repo

➔ [https://github.com/Abhishek-S-28/sit737-2025-prac7p](https://github.com/Abhishek-S-28/sit737-2025-prac7p)
