# E-Commerce Website (MERN Stack)

Welcome to the E-Commerce Website built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). This full-featured application allows users to seamlessly shop online, while offering an admin portal for managing products and orders. The site integrates a secure payment gateway for transaction processing and includes essential e-commerce functionality.

---

## Features

### User Features
- **Browse Products**: Discover a wide variety of products with rich details.
- **Shopping Cart**: Add products to the cart, remove items, and view the total.
- **Checkout**: Complete your purchase through the Cashfree Payment Gateway.
- **Order History**: Track previous orders for easy reference.

### Admin Features
- **Product Management**: Add, edit, or delete products in the catalog.
- **Order Management**: View and process customer orders.
- **User Management**: Access a list of registered users and manage their accounts.

---

## Technologies Used

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Redux Toolkit**: State management for efficient data flow.

### Backend
- **Node.js with Express.js**: JavaScript runtime and web framework for handling API requests.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **JWT Authentication**: JSON Web Tokens for user authentication and session management.

### Payment Gateway
- **Cashfree**: Integrated for secure and reliable online payments.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** and **npm**
- **MongoDB** (running locally or via a cloud provider like Atlas)
- Cashfree Payment Gateway credentials (APP ID and Secret Key)
- **Git**

---

## Installation and Setup

### 1. Clone the Repository
Start by cloning the repository to your local machine:
```bash
git clone https://github.com/Anshulrazz/e-commerce.git
```
Navigate to the project folder:
```bash
cd ecommerce-mern
```

---

### 2. Backend Setup
1. Go to the backend folder:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following content:
   ```
   CLIENT_ID=TEST
   CLIENT_SECRET=cfsk_ma_test_
   MONGO_URI=mongodb://localhost:27017/
   JWT_SECRET=asdfqwerzxcvasdfqwer
   C_N= {Cloud name for cloudnary}
   C_K={APi key for cloudnary}
   C_S={API Secrate for cloudnary]
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

---

### 3. Frontend Setup
1. Go to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```

---

## Access the Application

Once both the backend and frontend servers are running, you can access the application on your local machine:

- **User Interface**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Folder Structure
Here is an overview of the project's structure:

```
ecommerce-mern/
├── frontend/             # React.js frontend
│   ├── public/           # Static files (images, icons, etc.)
│   ├── src/              # React components and hooks
│   └── package.json      # Frontend dependencies and scripts
├── backend/              # Node.js backend
│   ├── controllers/      # API controllers for handling business logic
|   ├── mid/              # for auth middleware
│   ├── models/           # MongoDB models (Products, Orders, Users)
│   ├── routes/           # API route definitions
│   ├── .env              # Environment variables (Mongo URI, Cashfree keys, etc.)
│   └── package.json      # Backend dependencies and scripts
├── README.md             # Project documentation
└── .gitignore            # Git ignore file
```

---

## Payment Gateway Integration

The application integrates **Cashfree** for payment processing. To enable payment functionality, make sure to add your **Cashfree App ID** and **Secret Key** in the `.env` file:

You can use **Cashfree's sandbox environment** for testing before going live.

---

## Contributing

We welcome contributions from the community! If you would like to contribute to this project, please follow these steps:

1. **Fork** the repository.
2. **Create a new branch** for your feature or bug fix.
3. **Commit** your changes and **push** the branch.
4. Open a **Pull Request** describing the changes.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.

---

## Contact

For any questions or inquiries, feel free to open an issue on GitHub or contact us directly at [braj70901@gmail.com](mailto:braj70901@gmail.com).

---

This revised README should provide a clear and professional guide for anyone looking to understand, install, or contribute to your E-Commerce application.
