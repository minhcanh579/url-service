# URL Service Project

## Summary

This project is a URL service that checks the availability of URLs and retrieves them based on priority. It is built with TypeScript and includes an Express server, which provides RESTful endpoints to interact with the URL data.

### Key Features:
- **URL Availability Checking**: Determines if URLs are reachable.
- **Priority-Based URL Retrieval**: Fetches URLs based on their priority.
- **Swagger API Documentation**: Provides interactive API documentation.

## Installation

To get started with the URL Service Project, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Build the Project**:
    ```bash
    npm run build
    ```

4. **Run the Production Server**:
    ```bash
    npm start
    ```
5. **Run the Development Server**:
    ```bash
    npm run dev
    ```
## API Endpoints

### 1. **Get All Reachable URLs**

- **Endpoint**: `/api/servers`
- **Method**: `GET`
- **Description**: Returns a list of all reachable URLs sorted by priority.
- **Responses**:
  - `200 OK`: List of reachable URLs with their priority.

### 2. **Get Reachable URLs by Priority**

- **Endpoint**: `/api/servers/:priority`
- **Method**: `GET`
- **Description**: Returns a list of reachable URLs with the specified priority.
- **Parameters**:
  - `priority` (path parameter): The priority level to filter URLs.
- **Responses**:
  - `200 OK`: List of reachable URLs with the specified priority.
  - `400 Bad Request`: Invalid priority parameter.
  - `500 Internal Server Error`: Error retrieving URLs.

## Swagger API Documentation

Swagger provides interactive API documentation for this project. To access it:

1. **Run the Server** (make sure the server is running):
    ```bash
    npm start
    ```

2. **Open Swagger UI**:
   - Navigate to `http://localhost:{PORT|3000}/api-docs` in your web browser.

   Swagger UI will display the interactive API documentation where you can explore the available endpoints and test them.

## Testing

To run tests for the URL Service Project:

1. **Run Unit Tests**:
    ```bash
    npm test
    ```

2. **Run Tests with Coverage**:
    ```bash
    npm run test:coverage
    ```

## Configuration

Configuration for the server and Swagger API is done via environment variables. Ensure you have a `.env` file in the root directory with the required configuration values.
