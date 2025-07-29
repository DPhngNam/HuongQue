# HuongQue - Multi-Tenant E-Commerce Platform

A modern, microservices-based e-commerce marketplace platform built with Spring Boot, NestJS, and Next.js, featuring multi-tenant architecture for supporting multiple shops and vendors.

## 🏗️ Architecture Overview

HuongQue is built using a microservices architecture with clear separation of concerns and multi-tenant isolation [1](#2-0) . The platform consists of both backend services and a modern React-based frontend.

### Backend Services (be_huongque/)

| **Service**           | **Port** | **Technology** | **Description**                                                                 |
|-----------------------|----------|----------------|---------------------------------------------------------------------------------|
| **API Gateway**       | 8080     | Spring Boot    | Central entry point that routes external traffic to internal microservices     |
| **Auth Service**      | 8081     | NestJS         | Handles user authentication, authorization, token issuing, and validation      |
| **Log Service**       | 8082     | NestJS         | Collects and stores logs for monitoring and debugging (backed by Elasticsearch)|
| **User Service**      | 8083     | NestJS         | Manages user profiles, roles, and permissions                                  |
| **Tenant Service**    | 8084     | NestJS         | Manages multi-tenant configurations and tenant-specific data access            |
| **Product Service**   | 8085     | Spring Boot    | Handles product CRUD operations, categories, and inventory                     |
| **Register Service**  | 8086     | NestJS         | Manages user or seller registration, onboarding, and profile setup             |
| **S3Bucket Service**  | 8087     | NestJS         | Interface to Supabase storage for uploading and retrieving files              |
| **Checkout Service**  | 8088     | NestJS         | Handles checkout logic, cart finalization, and payment gateway interactions    |
| **Order Service**     | 8089     | NestJS         | Manages order creation, status tracking, and order history                     |
| **Eureka Registry**   | 8761     | Spring Boot    | Service discovery server where microservices register and discover each other  |

### Frontend Application (huongque/)

The frontend is built with Next.js and provides a modern, responsive user interface for both customers and vendors [2](#2-1) .

### Infrastructure Services

| **Service**           | **Port**     | **Description**                                                                 |
|-----------------------|--------------|---------------------------------------------------------------------------------|
| **Postgres**          | 5432         | Relational database used to persist core data (users, orders, products)        |
| **Elasticsearch**     | 9200, 9300   | Full-text search engine used for searching logs, products, shops, etc.         |
| **RabbitMQ**          | 5672, 15672  | Message broker for asynchronous communication between microservices            |

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for frontend development)
- Java 17+ (for Spring Boot services)

### Running the Application

1. **Start all services with Docker Compose:**
   ```bash
   docker-compose up
   ```

2. **For development with Doppler (recommended):**
   ```bash
   doppler run --project backend --config dev -- docker compose up
   ```

3. **Start specific services:**
   ```bash
   docker-compose up <service-name>
   ```

### Frontend Development

Navigate to the frontend directory and start the development server [3](#2-2) :

```bash
cd huongque
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏢 Multi-Tenant Architecture

The platform implements a sophisticated multi-tenant architecture where each tenant represents a shop or vendor. Key features include:

- **Owner-based tenant isolation**: Each tenant has an associated owner from the auth service
- **Tenant context propagation**: Services use `X-Tenant-ID` headers for proper data isolation
- **Dedicated databases**: Each service maintains its own database for better scalability

## 🤖 AI-Powered Features

### Chatbot Integration

The platform includes an intelligent chatbot feature for customer support [4](#2-3) :

- **Vietnamese language support**: Uses sentence transformers for Vietnamese text processing
- **Product search assistance**: Helps customers find relevant products
- **Real-time chat interface**: Modern, responsive chat UI with typing indicators
- **Mobile-friendly design**: Optimized for both desktop and mobile devices

To set up the chatbot:

1. Configure the environment variable:
   ```env
   CHATBOT_SERVICE_URL=http://localhost:8000
   ```

2. Start the Python chatbot service:
   ```bash
   cd be_huongque/chatbotservice
   pip install -r requirements.txt
   python main.py
   ```

## 🔧 Development

### Environment Configuration

The application uses environment variables for configuration [5](#2-4) . Key variables include:

- **Database connections** for each service
- **RabbitMQ credentials** (admin/admin)
- **Stripe API keys** for payment processing
- **Service discovery** configuration

### Service Development

Each microservice can be developed independently:

- **NestJS services**: Use standard NestJS development patterns [6](#2-5) 
- **Spring Boot services**: Follow Spring Boot conventions with Eureka service discovery
- **Frontend**: Next.js with TypeScript and Tailwind CSS

## 📊 Monitoring and Logging

- **Centralized logging**: Log service collects and stores logs in Elasticsearch
- **Service discovery**: Eureka registry for service health monitoring
- **Database persistence**: Dedicated volumes for data persistence

## 🔒 Security Features

- **JWT-based authentication**: Secure token-based auth system
- **Multi-tenant data isolation**: Strict tenant boundaries prevent data leakage
- **Role-based access control**: User roles and permissions management

## 📦 Deployment

The application is containerized and ready for deployment:

- **Docker Compose**: For local development and testing
- **Persistent volumes**: Configured for databases and message queues
- **Network isolation**: Services communicate over a dedicated bridge network

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## Notes

This README provides a comprehensive overview of the HuongQue platform's architecture and setup. The platform demonstrates modern microservices patterns with proper multi-tenant isolation, making it suitable for marketplace applications where multiple vendors need secure, isolated environments.
