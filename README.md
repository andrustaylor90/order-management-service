# **Order Management Microservice**

## **Overview**

The Order Management is a robust, scalable backend service built using NestJS, TypeScript, PostgreSQL, Redis, and Kafka. It is designed to handle order management for various storefronts globally, managing millions of customers, products, and orders efficiently. The microservice architecture and AWS deployment strategies ensure scalability, high availability, and security.

## **Features**

- **Order Management**: Create, update, and delete orders, including order statuses and shipping information.

## **Technology Stack**

- **Backend**: NestJS, TypeScript
- **Database**: PostgreSQL

## **Getting Started**

### **Prerequisites**

- **Node.js** v22 or higher

### **Running the Project Locally**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/andrustaylor90/order-management-service.git
   cd order-management-service
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```
3. **Run the Application Locally**

   ```bash
   npm run build
   npm run start:dev
   ```

The service will be available at http://localhost:3000.

### Examples
#### **Post Order**
- POST : http://localhost:3000/orders
- Request 
  ```
  {
      "customerId": "12345",
      "products": [
          {
              "productId": "product-1",
              "quantity": 2
          },
          {
              "productId": "product-2",
              "quantity": 1
          }
      ]
  }
  ```
- Response
  ```
  {
    "customerId": "12345",
    "products": [
        {
            "productId": "product-1",
            "quantity": 2
        },
        {
            "productId": "product-2",
            "quantity": 1
        }
    ],
    "trackingCompany": null,
    "trackingNumber": null,
    "id": "d92eabd2-e167-4bba-b272-09a86b9519dd",
    "status": "processing",
    "createdAt": "2024-09-17T03:21:38.892Z",
    "updatedAt": "2024-09-17T03:21:38.892Z"
  }
  ```

#### **Update Order Status**
- PATCH : http://localhost:3000/orders/{id}/status
- Request 
  ```
  {
    "status": "delivered"
  }
  ```
- Response
  ```
  {
    "id": "d92eabd2-e167-4bba-b272-09a86b9519dd",
    "customerId": "12345",
    "products": [
        {
            "productId": "product-1",
            "quantity": 2
        },
        {
            "productId": "product-2",
            "quantity": 1
        }
    ],
    "status": "delivered",
    "trackingCompany": null,
    "trackingNumber": null,
    "createdAt": "2024-09-17T03:21:38.892Z",
    "updatedAt": "2024-09-17T03:21:48.402Z"
  }
  ```

#### **Update Order Shipping Info**
- PATCH : http://localhost:3000/orders/{id}/shipping
- Request 
  ```
  {
    "trackingCompany": "FedEx",
    "trackingNumber": "1234567890"
  }
  ```
- Response
  ```
  {
    "id": "d92eabd2-e167-4bba-b272-09a86b9519dd",
    "customerId": "12345",
    "products": [
        {
            "productId": "product-1",
            "quantity": 2
        },
        {
            "productId": "product-2",
            "quantity": 1
        }
    ],
    "status": "delivered",
    "trackingCompany": "FedEx",
    "trackingNumber": "1234567890",
    "createdAt": "2024-09-17T03:21:38.892Z",
    "updatedAt": "2024-09-17T03:21:54.157Z"
  }
  ```

#### **Delete Order**
- DELETE : http://localhost:3000/orders/{id}