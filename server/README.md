# Invoice API

A REST API built with Node, Nest.js and TypeScript. It leverages PostgreSQL and Prisma as the database ORM. It implement a JSON Web Token (JWT) based authentication using Passport. The passwords stored on the database are protected by hashing (done using bcrypt).

## Table of Contents

- [Prerequisites](#prerequisites])
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Prerequisites

1. **Have Node.js installed**
2. **Have Docker and Docker Compose installed**

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/raresnicolaide/invoice-app.git
   ```

2. **Navigate to cloned repository:**

   ```bash
   cd invoice-app
   ```

3. **Navigate to server project:**

   ```bash
   cd server
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Start the PostgreSQL database with Docker:**

   ```bash
   docker-compose up
   ```

6. **Apply database migrations:**

   ```bash
   npx prisma migrate dev
   ```

   **Note:**
   This will also generate the prisma client and seed the database

7. **Start the project:**

   ```bash
   npm run start:dev
   ```

## Usage

**User Credentials:**

In order to access the application, users must login with the following credentials:

- **Email:** johndoe@mail.com
- **Password:** password-john

OR

- **Email:** janedoe@mail.com
- **Password:** password-jane

## API Documentation

The API has been documented using Swagger. You can access the API documentation by visiting [http://localhost:3000/api](http://localhost:3000/api).

Most of the routes are protected so you will need to add a token by clicking on the Authorize button in Swagger. Swagger will add the token to your requests so you can query the protected endpoints.

**Note:**
You can generate a token by sending a POST request to /auth/login endpoint with a valid email and password