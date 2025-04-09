
# Product Management Web App

A full-stack web application for managing products with user authentication, product listing, filtering, and CRUD operations.

## Live Demo

- Frontend: [https://zynetic-product-management-app-k1ns.vercel.app/](https://zynetic-product-management-app-k1ns.vercel.app/)
- Backend API: [https://zynetic-product-management-app.vercel.app](https://zynetic-product-management-app.vercel.app)

## Don’t want to register? 😄 Use the demo credentials:

### Admin
- **Email**: r87094@gmail.com  
- **Password**: R@hgav8709

### User
- **Email**: r87094user1@gmail.com  
- **Password**: R@hgav8709

## Screenshots

  
![Product Listing](https://ik.imagekit.io/b8csj3eex/images/Screenshot%202025-04-09%20184633.png?updatedAt=1744204724895)

 
![Product Details](https://ik.imagekit.io/b8csj3eex/images/Screenshot%202025-04-09%20184729.png?updatedAt=1744204724310)

 
![Create Product](https://ik.imagekit.io/b8csj3eex/images/Screenshot%202025-04-09%20185913.png?updatedAt=1744205420697)


 
![Edit Product](https://ik.imagekit.io/b8csj3eex/images/Screenshot%202025-04-09%20185957.png?updatedAt=1744205419383)

  
![Filter Products](https://ik.imagekit.io/b8csj3eex/images/Screenshot%202025-04-09%20184801.png?updatedAt=1744204723544)

![User View](https://ik.imagekit.io/b8csj3eex/images/Screenshot%202025-04-09%20184641.png?updatedAt=1744204723552)

![Dashboard](https://ik.imagekit.io/b8csj3eex/images/Screenshot%202025-04-09%20190435.png?updatedAt=1744205701825)

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Axios for API communication

### Backend

- NestJS
- TypeScript
- MongoDB (with Mongoose)
- JWT Authentication

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository

```bash
git clone https://github.com/raghavjaiswal709/Zynetic_Product_Management_App.git
cd product-management-app
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup

Create a `.env` file in the backend directory:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d
PORT=3001
```

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:3001
```

4. Run the application

```bash
# Start backend server (from backend directory)
npm run start:dev

# Start frontend server (from frontend directory)
npm start
```

5. Open your browser and navigate to `http://localhost:3000`



## Contact

Raghav Jaiswal - raghavjaiswal0000@gmail.com
