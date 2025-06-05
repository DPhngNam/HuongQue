# Huong Que Microservices Application

This project is a microservices-based application with multiple services communicating via RabbitMQ and REST APIs.

## Services Overview

The application consists of the following services:

| **Service**           | **Port**     | **Description**                                                                 |
|-----------------------|--------------|---------------------------------------------------------------------------------|
| **Postgres**          | 5432         | Relational database used to persist core data (e.g., users, orders, products). |
| **Elasticsearch**     | 9200, 9300   | Full-text search engine used for searching logs, products, shops, etc.         |
| **RabbitMQ**          | 5672, 15672  | Message broker for asynchronous communication between microservices.           |
| **API Gateway**       | 8080         | Central entry point that routes external traffic to internal microservices.    |
| **Auth Service**      | 8081         | Handles user authentication, authorization, token issuing, and validation.     |
| **Log Service**       | 8082         | Collects and stores logs for monitoring and debugging (backed by Elasticsearch).|
| **User Service**      | 8083         | Manages user profiles, roles, and permissions.                                 |
| **Tenant Service**    | 8084         | Manages multi-tenant configurations and tenant-specific data access.           |
| **Product Service**   | 8085         | Handles product CRUD operations, categories, and inventory.                    |
| **Register Service**  | 8086         | Manages user or seller registration, onboarding, and profile setup.            |
| **S3Bucket Service**  | 8087         | Interface to Supabase storage for uploading and retrieving files.   |
| **Checkout Service**  | 8088         | Handles checkout logic, cart finalization, and payment gateway interactions.   |
| **Order Service**     | 8089         | Manages order creation, status tracking, and order history.                    |
| **Eureka Registry**   | 8761         | Service discovery server where microservices register and discover each other. |



## Environment Variables

### RabbitMQ
- RABBITMQ_DEFAULT_USER: admin
- RABBITMQ_DEFAULT_PASS: admin

### Auth Service
- DB_HOST: auth_db
- DB_PORT: 5432
- DB_USERNAME: authservice
- DB_PASSWORD: auth
- DB_NAME: authdb
- PORT: 8081

### User Service
- DB_HOST: user_db
- DB_PORT: 5432
- DB_USERNAME: userservice
- DB_PASSWORD: user
- DB_NAME: userdb
- PORT: 8083

### Tenant Service
- DB_HOST: tenant_db
- DB_PORT: 5432
- DB_USERNAME: tenantservice
- DB_PASSWORD: tenant
- DB_NAME: tenantdb
- PORT: 8084

### Checkout Service
- Requires Stripe API keys for payment processing

## Running the Application

To start all services:

```bash
docker-compose up
```

To start specific services:

```bash
docker-compose up <service-name>
```

## Volumes

The following persistent volumes are configured:
- userdb-data
- authdb-data
- tenantdb-data
- rabbitmq-data

## Networks

All services run on a bridge network.

## Compose
doppler run --project backend --config dev -- docker compose up