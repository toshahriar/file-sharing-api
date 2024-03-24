# File Sharing API

Backend Code Test for MeldCX - Build a File Sharing API Server

## Installation

To get started with the File Sharing API, follow the steps below:

### Docker-based Installation:

#### Step 1:

Clone the repository by running the following command:

```bash
git clone https://github.com/toshahriar/meldcx-file-sharing-api.git
cd meldcx-file-sharing-api
```

#### Step 2:

Copy the environment file then update the env values accordingly:

```bash
cp .env.example .env
```

#### Step 3:

Install the required dependencies:

```bash
docker compose run --rm app npm install
```

#### Step 4:

Start the API server using Docker:

```bash
docker compose up -d
```

Application will be started and available at http://localhost:3000/api/v1/health-check

#### Step 5:

To run unit tests, execute the following command:

```bash
docker compose run --rm app npm run test
```

### Manual Installation:

#### Step 1:

Clone the repository by running the following command:

```bash
git clone https://github.com/toshahriar/meldcx-file-sharing-api.git
cd meldcx-file-sharing-api
```

#### Step 2:

Copy the environment file then update the env values accordingly:

```bash
cp .env.example .env
```

#### Step 3:

Install the required dependencies:

```bash
npm install
```

#### Step 4:

Start the API server using Docker:

```bash
npm run start
```

Application will be started and available at http://localhost:3000/api/v1/health-check

#### Step 5:

To run unit tests, execute the following command:

```bash
npm run test
```

These installation steps provide two options for setting up the File Sharing API: using Docker for a streamlined deployment process or manual installation for finer control and customization. Choose the method that best suits your requirements and environment.

## Folder Structure

```text
.
├── docs
├── src
│   ├── app
│   │   ├── controllers
│   │   ├── dtos
│   │   ├── middlewares
│   │   ├── models
│   │   ├── repositories
│   │   ├── services
│   │   ├── validators
│   │   └── index.ts
│   ├── config
│   ├── core
│   │   ├── abstracts
│   │   ├── enums
│   │   ├── lib
│   │   │   ├── common
│   │   │   ├── config
│   │   │   ├── logger
│   │   │   ├── redis
│   │   │   ├── responder
│   │   │   ├── sequelize
│   │   │   ├── storage
│   │   │   ├── string
│   │   │   └── web
│   │   └── types
│   ├── routes
│   └── index.ts
├── storage
│   ├── files
│   ├── logs
│   └── mock
└── tests
    ├── feature
    └── unit
```

### 1. `docs`

-   This directory typically contains documentation related to the project. e.g. Postman Collection

### 2. `src`

-   This directory holds all the source code of the application.

    #### `app`

    -   This directory contains modules related to the application's logic.
        -   `controllers`: Contains modules responsible for handling incoming HTTP requests.
        -   `dtos`: Data Transfer Objects (DTOs) are used to define the structure of data exchanged between different layers of the application.
        -   `middlewares`: Middlewares are functions executed before the actual route handlers.
        -   `models`: Defines sequelize data models representing the structure of data stored in the database or used within the application.
        -   `repositories`: Contains modules responsible for data access logic, such as querying the database.
        -   `services`: Contains modules implementing the business logic of the application.
        -   `validators`: Contains modules responsible for input validation and data sanitization.
        -   `index.ts`: Entry point for the app module. This module is responsible for starting the express server, loading routes, loading middlewares etc.

    #### `config`

    -   Configuration files for the application. This directory might include environment-specific configurations, database, application, redis, etc.

    #### `core`

    -   Core functionality and utilities.
        -   `abstracts`: Contains abstract classes or interfaces defining common behavior.
        -   `enums`: Enumerations used within the application.
        -   `lib`: Utility libraries providing commonly used functionalities.
        -   `types`: Custom TypeScript types used across the application.

    #### `routes`

    -   Defines the application routes. Each route file may define routes for different versions or modules of the application.

    #### `index.ts`

    -   Entry point of the application, where it's initialized and started.

### 3. `storage`

-   This directory is typically used for storing various kinds of data used by the application.
    -   `files`: Stores uploaded files or any other file-based data.
    -   `logs`: Stores application logs.
    -   `mock`: Stores mock data used for testing or development purposes.

### 4. `tests`

-   Contains test suites for the application.
    -   `feature`: Feature tests, which test entire features or functionalities of the application.
    -   `unit`: Unit tests, which test individual units of code, such as functions or methods, in isolation.

## API Specification

This section outlines the endpoints and usage of the File Sharing API.

---

### Endpoint: Health Check

**Description:**
This endpoint checks the health status of the application.

**Request:**

```bash
curl --location --request GET 'http://localhost:3000/api/v1/health-check'
```

**Response:**

```json
{
    "code": 200,
    "status": "success",
    "message": "Application is running!",
    "data": {
        "app_name": "File Manager",
        "app_version": "1.0.0"
    }
}
```

---

### Endpoint: Upload File

**Description:**
Uploads a file to the server.

**Request:**

```bash
curl --location --request POST 'http://localhost:3000/api/v1/files' \
--form 'file=@"/path/to/file/image.png"'
```

**Response:**

```json
{
    "code": 201,
    "status": "success",
    "message": "Created",
    "data": {
        "createdAt": "2024-03-22T06:26:46.467Z",
        "updatedAt": "2024-03-22T06:26:46.468Z",
        "id": "c26475a2-d0c2-46c7-936e-36df4a6798ad",
        "fileName": "c26475a2-d0c2-46c7-936e-36df4a6798ad.png",
        "path": "/var/www/app/storage/files/c26475a2-d0c2-46c7-936e-36df4a6798ad.png",
        "size": 31717,
        "mimeType": "image/png",
        "publicKey": "<public-key>",
        "privateKey": "<private-key>",
        "signature": "<signature>",
        "ipAddress": "<ip-address>"
    }
}
```

---

### Endpoint: Download File

**Description:**
Downloads a file using its public key.

**Request:**

```bash
curl --location --request GET 'http://localhost:3000/api/v1/files/<public-key>'
```

**Response:**

-   Downloadable file

---

### Endpoint: Delete File

**Description:**
Deletes a file using its private key.

**Request:**

```bash
curl --location --request GET 'http://localhost:3000/api/v1/files/<private-key>'
```

**Response:**

```http
204 No Content
```

---
