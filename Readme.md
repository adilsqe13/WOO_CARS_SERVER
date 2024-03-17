# Car Buy and Sell Backend

This is the backend server for the Car Buy and Sell website, developed using Node.js. It provides APIs for managing cars, users, and authentication.

## Features

- RESTful APIs for managing cars (CRUD operations)
- User authentication and authorization
- MongoDB database integration
- Express.js framework for routing and middleware
- JWT (JSON Web Tokens) for secure authentication
- Error handling and validation

## Installation

1. Clone the repository:


2. Navigate into the project directory:


3. Install dependencies:


4. Configure environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/carbuyandsell
     JWT_SECRET=your_secret_key_here
     ```

## Usage

1. Start the server:


2. The server will start running on the port specified in the `.env` file (default is 3000).

## API Documentation

The API documentation can be found in the `docs` directory.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose (ODM for MongoDB)
- JWT (JSON Web Tokens) for authentication
- Express-validator for input validation
- bcryptjs for password hashing
- Morgan for request logging


