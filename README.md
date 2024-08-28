# Node.js MongoDB Subscribers App

A simple Node.js application using MongoDB to replicate ajio backend api.

## Features
  ### Authentication
    - Login/Logout
    - Sign Up
  ### Products
    - Add Product
    - Get all the products
    - Fliter Products by category
    - Get single product's details
    - Search products
  ### Cart
      - Add Product to the cart
      - Update Product's quantity in the cart

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance

### Installation

1. Clone the repository:
   git clone https://github.com/Shivam-Singh0/ajio-api.git
   cd ajio-api
2. Install the dependencies:
    npm install

3. Create a .env file in the root directory and add your MongoDB URI:
    MONGO_URI= mongo db connection string
   JWT_SECRET  = jwt secret key



### Running the Application

    ## Start the server:
       npm run start
            or
        npm run dev
     

### API Documentaion
  base url: http://localhost:3000/api

  #### Authentication
      -Login :- /POST  /auth/login
      -Logout :- /POST /auth/logout
      -Sign up :- /POST /auth/signup
      
  #### Products
      -  Products List :- /GET /product
      - Search:- /GET  /product?query='query'
      - Single Product:- /GET product/:id
      - Get product in category :- /GET product/category/:category
  #### Cart
      - Get user's cart :- /GET /cart
      - Add product to cart :- /POST /cart/add
      - Update Quantity :- /POST /cart/update_quantity

## Postman API documentation
https://documenter.getpostman.com/view/34266045/2sAXjGbtRN
