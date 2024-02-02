## Project Name

    EpicVariants

## Description:

    The EpicVariants API is a Node.js application built with Express and MongoDB, designed to facilitate the management of products and their variants. Whether you're building an e-commerce platform or a product catalog, this API offers a flexible and scalable solution for handling product-related operations.

## Table of Contents

    Introduction
    Getting Started
        Prerequisites
        Installation
    Usage
    Interacting with the API
    API Documentation
    Testing
    Environment Variables
    Dependencies
    Contributing
    License
    Project Structure

## Introduction

    Welcome to the EpicVariants API, a Node.js application built with Express and MongoDB for managing products and their variants. This API allows you to perform CRUD operations on products, search for products, and more.

## Getting Started

    ## Prerequisites
        Make sure you have the following installed on your system:
            Node.js
            MongoDB
            npm

    ## Installation

        To run this project locally, follow these steps:

        ## Clone the Repository:
            git clone <repository-url>

        ## Install Dependencies:
            cd project-directory
            npm install

        ## Set up Environment Variables:
            Create a .env file in the root directory and add the following content:
                MONGODB_URI=mongodb://localhost:27017/your_production_database
                TEST_MONGODB_URI=mongodb://localhost:27017/your-test-database
                PORT=3000

        ## Run the Application:
            npm start

## Usage

    Once the application is running, you can access the API at http://localhost:3000/api.

# Interacting with the API

    Use tools like Postman to interact with the API.
    Explore the API endpoints documented in API Documentation section.

## API Documentation

    ## Endpoints:
        GET /api/products/search
        Search products by name, description, or variant name.
        Request: GET /api/products/search
        Parameters: { "query": "your_search_query" }

        GET /api/products/:productId
        Get a product by ID.
        Request: GET /api/products/:productId

        POST /api/products
        Create a new product.
        Request: POST /api/products
        Body: { "name": "Product Name", "description": "Product Description", "price": 20, "variants": [...] }

        PUT /api/products/:productId
        Update an existing product.
        Request: PUT /api/products/:productId
        Body: { "name": "Updated Product Name", "description": "Updated Description", "price": 25, "variants": [...] }

        DELETE /api/products/:productId
        Delete a product by ID.
        Request: DELETE /api/products/:productId

## Testing

    This project includes Jest tests to ensure the functionality of the application. To run the tests, use the following command:

        npm test

## Environment Variables

    MONGODB_URI: MongoDB connection URI for production.
    TEST_MONGODB_URI: MongoDB connection URI for testing.

## Dependencies

    Node.js:     JavaScript runtime for executing server-side code.
    MongoDB:     NoSQL database for storing and managing data.
    Dotenv:      Loads environment variables from a .env file.
    Express:     Web framework for Node.js.
    Mongoose:    MongoDB object modeling tool.
    Jest:        JavaScript testing framework.
    Supertest:   HTTP assertions library.

## Contributors

    Vipin Mittal

## Project Structure

    app.js:                                  Entry point of the application.
    db.js:                                   Database connection setup using Mongoose.
    .env:                                    Configuration file for environment variables.
    model/productModel.js:                   Mongoose schema for the product and variant models.
    controllers/productControllers.js:       Controllers handling business logic for product operations.
    routes/productRoutes.js:                 Express routes for product-related endpoints.
    tests/productTests.js:                   Jest test suite for the product model and API endpoints.
    package.json:                            Project configuration and dependencies.
    package-lock.json:                       Lock file for npm dependencies.
    node_modules:                            Folder containing project dependencies.
