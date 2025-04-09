
# Product Management Web App

A full-stack web application for managing products with user authentication, product listing, filtering, and CRUD operations.

## Live Demo

- Frontend: [https://zynetic-product-management-app.vercel.app](https://zynetic-product-management-app.vercel.app)
- Backend API: [https://zynetic-product-management-gqb6ti5ea-raghav-jaiswals-projects.vercel.app](https://zynetic-product-management-app.vercel.app/)


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
MONGODB_URI=Give yours
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




## Screenshots

Product Listing
Product Details



## Contact

Your Name - raghavjaiswal0000@gmail.com


