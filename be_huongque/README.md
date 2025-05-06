# Huong Que Microservices Application

This project is a microservices-based application with multiple services communicating via RabbitMQ and REST APIs.

## Services Overview

The application consists of the following services:

| Service | Port | Description |
|---------|------|-------------|
| RabbitMQ | 5672, 15672 | Message broker for service communication |
| Auth Service | 8081 | Authentication and authorization service |
| User Service | 8083 | User management service |
| Tenant Service | 8084 | Tenant management service |
| Checkout Service | 8087 | Handles payment processing with Stripe (commented out) |
| Order Service | 9000 | Manages orders (commented out) |

## Database Configuration

| Database | Port | Username | Password | Database Name |
|----------|------|----------|----------|--------------|
| Auth DB (PostgreSQL) | 5432 | authservice | auth | authdb |
| User DB (PostgreSQL) | 5433 (mapped to 5432) | userservice | user | userdb |
| Tenant DB (PostgreSQL) | 5434 (mapped to 5432) | tenantservice | tenant | tenantdb |
| Order DB (MySQL) | - | order | - | mydb |
| Checkout DB (H2) | - | - | - | In-memory |

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
