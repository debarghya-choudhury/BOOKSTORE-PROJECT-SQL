# Setup and Installation Guide

## Overview

This document provides instructions for setting up and running the Bookstore API. The API is built using Node.js, ExpressJS, and Sequelize, with JWT for authentication and MySQL for the database.

## Project Structure

- **Others/POSTMAN Collection**: Contains the Postman collection file for API testing.
- **Others/DB Diagram**: Visual representation of the database schema.
- **Others/SQL Script**: SQL script to create the necessary database tables.
- **BOOKSTORE Server**: Contains the Node.js server code.
- **README.md**: This setup guide.

## Prerequisites

- Node.js (v16.x or later)
- MySQL Server
- MySQL Workbench
- npm (Node Package Manager)

## Setup Instructions

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/debarghya-choudhury/BOOKSTORE-PROJECT-SQL.git
```

### 2. Install Dependencies

Run the following command to install the necessary Node.js packages:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env file in the root directory of the project with the following content:

```bash
JWT_SECRET="your secret"
PORT=3000
```

### 4. Set Up the Database

Import the SQL script from the SQL Script folder (inside Others folder) into your MySQL database to create the required tables.
Ensure that your MySQL server is running and accessible.

### 5. Start the Server

Run the following command to start the server:

```bash
npm start
```

### 6. Test the API

Open Postman and import the Postman collection file from the POSTMAN Collection folder (inside Others folder).
Use the collection to test the various API endpoints.


## Additional Information

The database schema is visualized in the DB Diagram folder (inside Others folder).
For any issues or questions, please refer to the project’s GitHub repository.