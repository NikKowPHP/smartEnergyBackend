
# Smart Grid Energy Backend - Project Documentation

This document outlines the structure, implementation steps, and considerations for building a backend application for a smart grid energy management system using NestJS.

## Project Structure

```
smart-grid-energy-backend/
├── src/
│   ├── app.module.ts                  // Main application module
│   ├── main.ts                        // Application entry point
│   ├── config/                        // Configuration files
│   │   ├── database.config.ts       // Database connection settings
│   │   └── app.config.ts             // Application-specific configuration (e.g., API port)
│   ├── common/                        // Shared components, utilities, and types
│   │   ├── filters/                   // Custom exception filters
│   │   │   └── http-exception.filter.ts  // Filter to handle HTTP exceptions globally
│   │   ├── guards/                    // Guards for route access control
│   │   │   └── api-key.guard.ts        // Example guard for API key-based authentication
│   │   ├── interceptors/              // Interceptors for request/response manipulation
│   │   │   └── logging.interceptor.ts    // Example interceptor to log requests and responses
│   │   ├── pipes/                     // Custom pipes for data validation/transformation
│   │   │   └── validation.pipe.ts       // Global validation pipe for request payloads
│   │   ├── utils/                     // Utility functions
│   │   │   └── helper.ts                // General-purpose helper functions
│   │   ├── types/                     // Shared TypeScript types and interfaces
│   │   │   └── ercot.types.ts          // Types related to ERCOT data
│   │   └── middleware/
│   │       └── logger.middleware.ts   // Custom middleware for logging requests
│   ├── customer/                     // Module for customer-related functionality
│   │   ├── customer.module.ts         // Customer module definition
│   │   ├── customer.controller.ts     // Controller for customer endpoints
│   │   ├── customer.service.ts        // Service for customer business logic
│   │   ├── customer.repository.ts     // Repository for customer data access
│   │   └── dto/                       // Data Transfer Objects for customer data
│   │       └── create-customer.dto.ts // DTO for creating customer records
│   ├── address/                      // Module for address-related functionality
│   │   ├── address.module.ts          // Address module definition
│   │   ├── address.controller.ts      // Controller for address endpoints
│   │   ├── address.service.ts         // Service for address business logic
│   │   ├── address.repository.ts      // Repository for address data access (ERCOTMaster)
│   │   └── dto/                       // Data Transfer Objects for address data
│   │       └── address-query.dto.ts  // DTO for address typeahead query parameters
│   ├── database/                      // Database connection and related files
│       └── database.module.ts         // Module to manage database connection and providers
│       └── database.providers.ts      // Providers for database connection and models
└── test/                          // Unit and E2E tests
    ├── address/
    │   ├── address.controller.spec.ts
    │   └── address.service.spec.ts
    └── customer/
        ├── customer.controller.spec.ts
        └── customer.service.spec.ts
    └── e2e/
        └── app.e2e-spec.ts
```

## Implementation Steps

This project will be developed in phases, starting with setup and progressing through module development, security, testing, and deployment.

### Phase 1: Project Setup and Configuration

1. **Initialize NestJS Project:**

    ```bash
    nest new smart-grid-energy-backend
    ```

    *   Choose a package manager (e.g., npm).

2. **Install Dependencies:**

    ```bash
    npm install --save @nestjs/typeorm typeorm mssql @nestjs/config class-validator class-transformer
    npm install --save-dev @types/node @types/jest jest ts-jest @nestjs/testing
    ```

3. **Configure Environment Variables:**

    *   Create a `.env` file in the project root.
    *   Define environment variables for:
        *   Database connection details (host, port, username, password, database name)
        *   API port
        *   Other sensitive information

4. **Database Configuration:**

    *   `src/config/database.config.ts`
        *   Create a configuration object for TypeORM.
        *   Read connection details from environment variables.
        *   Specify the entities directory: `src/**/*.entity.ts`
        *   Enable logging for development.
        *   **Important:** Set `synchronize: false` for production (to prevent automatic schema changes). Handle migrations manually.

5. **Application Configuration:**

    *   `src/config/app.config.ts`
        *   Define application-specific configurations (e.g., API port, default settings).

### Phase 2: Database and Shared Components

1. **Database Module and Providers:**

    *   `src/database/database.module.ts`
        *   Import `TypeOrmModule.forRootAsync()` to configure the database connection dynamically.
        *   Inject `ConfigService` to access environment variables in `database.config.ts`.

    *   `src/database/database.providers.ts`
        *   Create providers for the database connection (TypeORM `DataSource`) and entity repositories (if using the repository pattern).

2. **Global Pipes, Filters, Interceptors, and Middleware:**

    *   `src/common/pipes/validation.pipe.ts`
        *   Implement a global validation pipe using `class-validator` and `class-transformer`.

    *   `src/common/filters/http-exception.filter.ts`
        *   Create a global exception filter to handle HTTP exceptions and format error responses.

    *   `src/common/interceptors/logging.interceptor.ts`
        *   Implement an interceptor to log incoming requests and outgoing responses.
    *   `src/common/middleware/logger.middleware.ts`
        *   Implement custom middleware for additional request logging.

3. **Shared Types:**

    *   `src/common/types/ercot.types.ts`
        *   Define TypeScript interfaces for data structures, such as those from the ERCOTMaster dataset (e.g., `AddressSuggestion`).

### Phase 3: Address Module

1. **Address Module:**

    *   `src/address/address.module.ts`
        *   Import `TypeOrmModule.forFeature([/* ERCOTMaster entity if needed */])` to register entities related to address data.
        *   Declare `AddressController` and `AddressService`.

2. **Address DTO:**

    *   `src/address/dto/address-query.dto.ts`
        *   Define a DTO class for address typeahead query parameters with validation rules (e.g., minimum length).

3. **Address Repository:**

    *   `src/address/address.repository.ts`
        *   Create a class to interact with the ERCOTMaster dataset (likely a read-only table).
        *   Implement `getAddressSuggestions(query: string)` to query the database for address suggestions, limit results (e.g., to 10), and return them in the desired format.
        *   **Optimization:** Consider adding an index to relevant address columns in the ERCOTMaster table for faster lookups.

4. **Address Service:**

    *   `src/address/address.service.ts`
        *   Inject `AddressRepository`.
        *   Implement `getTypeaheadSuggestions(query: string)` that:
            *   Calls `addressRepository.getAddressSuggestions(query)`.
            *   Transforms the raw database results into the `AddressSuggestion` format.

5. **Address Controller:**

    *   `src/address/address.controller.ts`
        *   Define the `/api/address/typeahead` endpoint (GET).
        *   Inject `AddressService`.
        *   Use `ValidationPipe` for the query parameter.
        *   Handle requests by calling `addressService.getTypeaheadSuggestions(query)` and return the results.

### Phase 4: Customer Module

1. **Customer Module:**

    *   `src/customer/customer.module.ts`
        *   Import `TypeOrmModule.forFeature([Customer])` to register the `Customer` entity.
        *   Declare `CustomerController` and `CustomerService`.

2. **Customer Entity:**
    *   Create `customer.entity.ts` to define the `Customer` entity, matching the `CustomerData` table structure:
        *   `id` (Primary Key)
        *   `phone` (VARCHAR)
        *   `email` (VARCHAR)
        *   `company_name` (VARCHAR)
        *   `address_street` (VARCHAR)
        *   `address_city` (VARCHAR)
        *   `address_state` (VARCHAR)
        *   `address_zip` (VARCHAR)
        *   `contract_end_date` (DATE)
        *   `energy_provider` (VARCHAR)
        *   `monthly_bill` (DECIMAL)

3. **Customer DTO:**

    *   `src/customer/dto/create-customer.dto.ts`
        *   Define a DTO for creating a new customer.
        *   Use `class-validator` decorators for validation (e.g., `@IsString()`, `@IsEmail()`, `@IsOptional()`, `@IsDateString()`, `@IsNumber()`).
        *   Include nested DTOs for the address if necessary.

4. **Customer Repository:**

    *   `src/customer/customer.repository.ts`
        *   Create a custom repository extending `TypeORM's Repository<Customer>`.
        *   Implement `createCustomer(data: CreateCustomerDto)` to insert a new customer record.

5. **Customer Service:**

    *   `src/customer/customer.service.ts`
        *   Inject `CustomerRepository`.
        *   Implement `createCustomer(data: CreateCustomerDto)` that:
            *   Validates the data (in addition to `ValidationPipe`, you might have business logic validation).
            *   Calls `customerRepository.createCustomer(data)` to save the data.
            *   Handles database errors.

6. **Customer Controller:**

    *   `src/customer/customer.controller.ts`
        *   Define the `/api/customer/submit` endpoint (POST).
        *   Inject `CustomerService`.
        *   Use `ValidationPipe` for the request body.
        *   Handle requests by calling `customerService.createCustomer(data)` and return a success or error response.

### Phase 5: Security

1. **Input Sanitization:**

    *   In `CustomerService` and `AddressService`, sanitize user-provided input before using it in database queries.
    *   Use parameterized queries (TypeORM handles this) to prevent SQL injection.

2. **Encryption:**

    *   For sensitive data (e.g., phone, email):
        *   **Application-level:** Encrypt before saving to the database in `CustomerService`. Decrypt when retrieving. Use a library like `crypto` in Node.js.
        *   **Database-level:** Configure SQL Server to use Transparent Data Encryption (TDE) for the entire database or specific columns.

3. **HTTPS:**

    *   Ensure the backend API is served over HTTPS to encrypt communication between the client and server.
    *   Obtain an SSL certificate and configure your server to use it.

### Phase 6: Testing

1. **Unit Tests:**

    *   `test/address/address.service.spec.ts`: Test `AddressService` methods in isolation. Mock `AddressRepository`.
    *   `test/address/address.controller.spec.ts`: Test `AddressController` endpoints. Mock `AddressService`.
    *   `test/customer/customer.service.spec.ts`: Test `CustomerService` methods. Mock `CustomerRepository`.
    *   `test/customer/customer.controller.spec.ts`: Test `CustomerController` endpoints. Mock `CustomerService`.

2. **Integration Tests:**

    *   `test/e2e/app.e2e-spec.ts`: Test the entire application flow, including database interactions. Use `@nestjs/testing`.
    *   Write tests for:
        *   Successful address typeahead lookups.
        *   Successful customer data submission.
        *   Error handling (invalid input, database errors).

### Phase 7: Deployment

1. **Cloud Infrastructure:**

    *   Choose a cloud provider (AWS, Azure, GCP).
    *   Set up a virtual machine or containerized environment (e.g., Docker) for the NestJS application.
    *   Configure a SQL Server database instance.

2. **CI/CD Pipeline:**

    *   Set up a CI/CD pipeline (GitHub Actions, Jenkins, CircleCI, etc.).
    *   The pipeline should:
        *   Install dependencies.
        *   Run unit and integration tests.
        *   Build the NestJS application (`nest build`).
        *   Deploy the built application to the cloud environment.
        *   Run database migrations if needed.

### Phase 8: Future Enhancements (Out of Scope for Now)

*   Integration with third-party energy provider APIs: Create new modules and services to handle these interactions.

## Important Considerations

*   **Error Handling:** Implement comprehensive error handling throughout the application to catch and log errors gracefully.
*   **Logging:** Use a logging library (e.g., the built-in NestJS logger or a more advanced one like Winston) to log important events, errors, and debugging information.
*   **Database Migrations:** Use TypeORM migrations to manage database schema changes in a controlled and versioned manner.
*   **Scalability:** Design the application with scalability in mind. Consider using a load balancer and multiple instances of the application if you expect high traffic.
*   **Monitoring:** Implement monitoring to track application performance, resource usage, and error rates.

This detailed Markdown document provides a comprehensive guide for building the Smart Grid Energy backend. Remember to adapt and refine the plan as you progress through the development process. Good luck!
