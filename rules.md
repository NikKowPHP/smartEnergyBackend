## Smart Grid Energy Backend - Strict Development Rules

These rules are designed to ensure code quality, maintainability, and scalability. Deviations are **strongly discouraged** and require thorough justification and review.

**I. General Coding Standards:**

1. **TypeScript:** Use TypeScript for the entire project. Enforce strict typing (`strict: true` in `tsconfig.json`).
2. **Linting:**
    *   Use ESLint with a strict configuration (e.g., based on Airbnb's style guide or a similarly rigorous standard).
    *   Integrate linting into your IDE and CI/CD pipeline. Run the linter before every commit.
    *   **Zero Tolerance:** No linting errors or warnings are allowed in the codebase.
3. **Formatting:**
    *   Use Prettier for consistent code formatting.
    *   Integrate Prettier into your IDE and run it automatically on save.
    *   **Zero Tolerance:** All code must be consistently formatted according to Prettier's rules.
4. **Comments:**
    *   Use JSDoc-style comments for all classes, methods, and functions to document their purpose, parameters, and return values.
    *   Add explanatory comments for complex logic or non-obvious code sections.
    *   Keep comments up-to-date with code changes.
5. **Naming Conventions:**
    *   `PascalCase` for classes, interfaces, and types.
    *   `camelCase` for variables, functions, and methods.
    *   `UPPER_SNAKE_CASE` for constants.
    *   Descriptive names that clearly indicate the purpose of the element.
6. **Error Handling:**
    *   All errors must be handled gracefully. Use `try-catch` blocks where appropriate.
    *   Never leave `catch` blocks empty.
    *   Log errors with sufficient context for debugging.
    *   Throw custom exceptions when necessary to provide specific error information.
    *   Utilize the global exception filter to handle uncaught exceptions and return consistent error responses to the client.
7. **Logging:**
    *   Use a structured logging approach. Log important events, errors, warnings, and debugging information.
    *   Include relevant context in log messages (e.g., request IDs, user IDs, timestamps).
    *   Configure different log levels (e.g., debug, info, warn, error) for different environments.
8. **Immutability:**
    *   Prefer immutability where possible. Use `readonly` for class properties that should not be modified after initialization.
    *   For complex objects or arrays, consider using immutable data structures or libraries that enforce immutability.

**II. NestJS Specific Rules:**

1. **Modular Design:**
    *   Organize the application into modules based on features (e.g., `AddressModule`, `CustomerModule`).
    *   Each module should be self-contained and have a clear responsibility.
    *   Use shared modules (`CommonModule`) for reusable components.
2. **Dependency Injection:**
    *   Use constructor injection for all dependencies.
    *   Declare dependencies as `private readonly` in the constructor when appropriate.
3. **Single Responsibility Principle (SRP):**
    *   Each class and function should have only one specific responsibility.
    *   If a class or function is doing too many things, refactor it into smaller, more focused units.
4. **DTOs (Data Transfer Objects):**
    *   Use DTOs for all data that is passed between layers (e.g., controllers, services, repositories).
    *   Define DTOs as classes with validation decorators (`class-validator`).
    *   Enforce validation using the global `ValidationPipe`.
5. **Services:**
    *   Services should contain the business logic of the application.
    *   Keep services lean and focused on a specific domain or task.
6. **Repositories:**
    *   Use repositories for all database interactions.
    *   Repositories should only handle data access and not contain any business logic.
7. **Configuration:**
    *   Use the `@nestjs/config` module to manage configuration.
    *   Load configuration from environment variables.
    *   Define configuration interfaces to strongly type configuration data.
8. **Guards:**
    *   Use guards for authorization and access control.
    *   Implement custom guards when needed for specific authorization logic.
9. **Interceptors:**
    *   Use interceptors for cross-cutting concerns like logging, request/response transformation, and caching.
    *   Keep interceptors focused and avoid adding business logic to them.
10. **Exception Filters:**
    *   Use a global exception filter to handle all unhandled exceptions.
    *   Return consistent and well-formatted error responses to the client.

**III. Design Patterns:**

1. **Repository Pattern:**
    *   Abstract database interactions behind repositories. This promotes separation of concerns and makes it easier to change the database implementation in the future.
2. **Service Layer Pattern:**
    *   Encapsulate business logic within services. This separates business logic from controllers and other parts of the application.
3. **Dependency Injection:**
    *   Use NestJS's built-in dependency injection to manage dependencies. This improves testability and makes the code more modular.
4. **Factory Pattern:**
    *   Consider using factories to create instances of complex objects or objects that require specific configuration.
5. **Strategy Pattern:**
    *   Use the strategy pattern when you have multiple algorithms or approaches to solving a particular problem and you want to be able to switch between them easily. (Example: different encryption methods for sensitive data).
6. **Observer Pattern:**
    *   Consider the observer pattern (or events/publish-subscribe) for situations where you need to notify multiple objects about changes in the system (e.g., if integrating with a real-time energy monitoring feature).
7. **Decorator Pattern:**
    *   Leverage NestJS decorators effectively to enhance classes and methods with metadata and functionality (e.g., `@Controller()`, `@Get()`, `@Post()`, `@Injectable()`).

**IV. Database and Data Access:**

1. **TypeORM:**
    *   Use TypeORM as the ORM.
    *   Define entities using classes and decorators.
    *   Use repositories for database interactions.
2. **Database Migrations:**
    *   Use TypeORM migrations to manage database schema changes.
    *   Write migrations for all schema changes.
    *   Never modify the database schema manually.
3. **SQL Injection Prevention:**
    *   Always use parameterized queries or prepared statements to prevent SQL injection.
    *   Never construct SQL queries by concatenating strings with user-provided input.
4. **Data Validation:**
    *   Validate all data that comes from external sources (e.g., user input, external APIs).
    *   Use DTOs with `class-validator` decorators for input validation.
5. **Transactions:**
    *   Use transactions for operations that involve multiple database updates.
    *   Ensure that transactions are either committed or rolled back completely to maintain data consistency.
6. **Indexing:**
    *   Add appropriate indexes to database tables to improve query performance.
    *   Analyze query execution plans to identify performance bottlenecks.
    *   Specifically, ensure indexes on frequently queried columns in the ERCOTMaster table for the address typeahead feature.

**V. Security:**

1. **Authentication:**
    *   Implement a secure authentication mechanism (e.g., JWT, OAuth 2.0) if user authentication is required.
2. **Authorization:**
    *   Use guards to enforce authorization rules and restrict access to resources based on user roles or permissions.
3. **Input Sanitization:**
    *   Sanitize all user-provided input to prevent cross-site scripting (XSS) and other injection attacks.
4. **Data Encryption:**
    *   Encrypt sensitive data (e.g., phone numbers, email addresses) at rest and in transit.
    *   Use strong encryption algorithms and securely manage encryption keys.
5. **HTTPS:**
    *   Serve the API over HTTPS to encrypt communication between the client and server.
6. **OWASP Top 10:**
    *   Be aware of the OWASP Top 10 web application security risks and take steps to mitigate them.
7. **Regular Security Audits:**
    *   Conduct regular security audits to identify and address potential vulnerabilities.

**VI. Testing:**

1. **Test Coverage:**
    *   Aim for high test coverage (at least 80% or higher).
    *   Write unit tests for all services, repositories, and other components.
    *   Write integration tests to test the interactions between different parts of the application.
    *   Write end-to-end (E2E) tests to test the entire application flow.
2. **Test-Driven Development (TDD):**
    *   Strongly consider following TDD principles. Write tests before writing the code they are testing.
3. **Mocking:**
    *   Use mocking to isolate units of code during testing.
    *   Mock external dependencies (e.g., databases, external APIs) to make tests more reliable and predictable.
4. **Test Pyramid:**
    *   Follow the test pyramid principle: Write more unit tests than integration tests, and more integration tests than E2E tests.
5. **CI/CD Integration:**
    *   Run tests automatically as part of your CI/CD pipeline.
    *   Fail the build if any tests fail.

**VII. Documentation:**

1. **Code Comments:**
    *   As stated above, use JSDoc-style comments for all public methods and classes.
2. **API Documentation:**
    *   Generate API documentation using a tool like Swagger/OpenAPI.
    *   Keep API documentation up-to-date with code changes.
3. **README:**
    *   Maintain a comprehensive README file that describes the project, its architecture, how to build and run it, and any other important information for developers.

**VIII. Code Reviews:**

1. **Mandatory Code Reviews:**
    *   All code changes must be reviewed by at least one other senior developer before being merged into the main branch.
2. **Focus on:**
    *   Code quality
    *   Adherence to standards
    *   Design patterns
    *   Security
    *   Performance
    *   Test coverage
3. **Constructive Feedback:**
    *   Provide clear, concise, and constructive feedback during code reviews.

**IX. Version Control (Git):**

1. **Branching Strategy:**
    *   Use a consistent branching strategy (e.g., Gitflow).
    *   Create feature branches for new features and bug fixes.
    *   Use pull requests to merge code changes into the main branch.
2. **Commit Messages:**
    *   Write clear and descriptive commit messages that explain the purpose of the changes.
    *   Use imperative mood in commit messages (e.g., "Fix: Handle database connection errors").
3. **Atomic Commits:**
    *   Make small, focused commits that address a single issue or feature.

**X. Continuous Integration/Continuous Deployment (CI/CD):**

1. **Automated Pipeline:**
    *   Set up a CI/CD pipeline to automate the build, test, and deployment process.
2. **Automated Testing:**
    *   Run all tests automatically as part of the pipeline.
3. **Automated Deployment:**
    *   Automate the deployment of the application to different environments (e.g., development, staging, production).
