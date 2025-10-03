# Inventory Management System

A RESTful API for managing product inventory with real-time stock tracking, low stock alerts, and CRUD operations for products.

## What This Project Does

This inventory management system provides:
- **Product Management**: Create, read, update, and delete products
- **Stock Management**: Increase/decrease stock quantities with transaction safety
- **Low Stock Monitoring**: Track products below threshold levels
- **Data Validation**: Input validation using Zod schemas
- **Error Handling**: Comprehensive error handling and logging
- **API Testing**: Complete test suite with Jest and Supertest

## Tech Stack

| Technology | Version | Use Case |
|------------|---------|----------|
| **Node.js** | Latest | Runtime environment |
| **TypeScript** | ^5.9.2 | Type-safe JavaScript development |
| **Express.js** | ^5.1.0 | Web framework for REST API |
| **Prisma** | ^6.16.2 | Database ORM and migrations |
| **PostgreSQL** | Latest | Primary database |
| **Zod** | ^4.1.11 | Runtime type validation |
| **Winston** | ^3.17.0 | Logging and monitoring |
| **Jest** | ^29.7.0 | Testing framework |
| **Supertest** | ^7.1.4 | HTTP assertion testing |
| **CORS** | ^2.8.5 | Cross-origin resource sharing |
| **Swagger JSDoc** | ^6.2.8 | API documentation generation |
| **Swagger UI Express** | ^5.0.1 | Interactive API documentation |

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## Database Schema

```sql
model Product {
  id                  Int      @id @default(autoincrement())
  name                String
  description         String
  stock_quantity      Int
  low_stock_threshold Int
  created_at          DateTime @default(now())
  updated_at          DateTime @updatedAt
}
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory_management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/inventory"
   PORT=8080
   ```

4. **Database Migration**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate deploy
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

6. **Access Swagger Documentation**
   Once the server is running, visit: `http://localhost:8080/api-docs`

## API Documentation

The project includes comprehensive Swagger/OpenAPI documentation:

- **Swagger UI**: Visit `http://localhost:8080/api-docs` when the server is running
- **Interactive Testing**: Test all endpoints directly from the Swagger UI
- **Schema Validation**: Complete request/response schemas with validation rules
- **Error Codes**: Detailed error response documentation

### Features:
- Complete API endpoint documentation
- Request/response examples
- Schema definitions with validation rules
- Interactive API testing interface
- Organized by tags (Products, Inventory)

## Running Tests

```bash
# Run all tests
npm test
```

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/products` | Create a new product |
| `GET` | `/api/v1/products` | Get all products |
| `GET` | `/api/v1/products/:id` | Get product by ID |
| `PUT` | `/api/v1/products/:id` | Update product |
| `DELETE` | `/api/v1/products/:id` | Delete product |

### Inventory
| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/api/v1/inventory/:id/stock/increase` | Increase stock quantity |
| `PUT` | `/api/v1/inventory/:id/stock/decrease` | Decrease stock quantity |
| `GET` | `/api/v1/inventory/low-stock` | Get low stock products |

### Request/Response Examples

**Create Product**
```bash
POST /api/v1/products
Content-Type: application/json

{
  "name": "Samsung Galaxy S25",
  "description": "Latest smartphone with advanced features",
  "stock_quantity": 100,
  "low_stock_threshold": 10
}
```

**Increase Stock**
```bash
PUT /api/v1/inventory/1/stock/increase
Content-Type: application/json

{
  "amount": 50
}
```

**Get Low Stock Products**
```bash
GET /api/v1/inventory/low-stock
```

## Project Structure

```
src/
├── controllers/     # Business logic handlers
├── middlewares/     # Express middleware
├── routes/         # API route definitions
├── schemas/        # Zod validation schemas
├── utils/          # Utility functions (logging)
├── app.ts          # Express app configuration
└── server.ts       # Server startup
```