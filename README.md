# E-Commerce Application with Angular, NgRx, and .NET Core Microservices

## Project Overview
This project is a full-stack e-commerce application that integrates Angular with NgRx state management and a microservices-based backend using .NET Core. The application allows users to manage products and orders efficiently while leveraging modern development practices.

## Features
- **Frontend (Angular with NgRx):**
  - Product and Order management using NgRx (Store, Actions, Reducers, Selectors, Effects)
  - Display, add, and remove products
  - Place orders and view order history
  - Error handling and loading indicators
- **Backend (.NET Core Microservices):**
  - Product Microservice for product management
  - Order Microservice for order processing
  - CRUD operations for products and orders
  - REST API integration


## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- Angular CLI
- .NET SDK
- SQL Server
- Swagger (for API testing)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend/ProductService
   ```
2. Restore dependencies and run the service:
   ```sh
   dotnet restore
   dotnet run
   ```
3. Repeat the process for `OrderService`.

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Angular application:
   ```sh
   ng serve
   ```
4. Open your browser at `http://localhost:4200`.

---

## API Endpoints
### Product Microservice
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/product` | Fetch all products |
| POST | `/api/product` | Add a new product |
| PUT | `/api/product/{id}` | Update a product |
| DELETE | `/api/product/{id}` | Delete a product |

### Order Microservice
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/order` | Fetch all orders |
| POST | `/api/order` | Place a new order |
| GET | `/api/order/{id}` | Get order details |
| DELETE | `/api/order/{id}` | Cancel an order |

---

## State Management with NgRx
The project implements NgRx for managing state efficiently:
- **Store:** Centralized state for products and orders
- **Actions:** Define how state changes
- **Reducers:** Update state based on actions
- **Selectors:** Retrieve specific parts of the state
- **Effects:** Handle asynchronous operations (API calls)
