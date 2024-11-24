const express = require('express');
const cors = require('cors');
const { Cashfree } = require('cashfree-pg');
const crypto = require('crypto');
require('dotenv').config();
const cloudinary = require('cloudinary');
const cookieParser = require('cookie-parser');

cloudinary.config({
    cloud_name: process.env.C_N,
    api_key: process.env.C_K,
    api_secret: process.env.C_S,
});
console.log(cloudinary.config());

//connect to mongodb
const mongoose = require('mongoose');
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Initialize Cashfree
Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX; // Change to PRODUCTION for live

// Initialize Express app
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // You can explicitly list methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Optional: Allow specific headers
    withCredentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); // Adjust limit if necessary
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

//add routes
app.use('/api/auth', require('./routes/user'));
app.use('/api/product', require('./routes/product'));


// Generate a unique order ID
function generateOrderId() {
    const uniqueID = crypto.randomBytes(16).toString('hex');
    return `CF_${uniqueID.substr(0, 12)}`;
}

app.get('/', (req, res) => {
    res.send("Cashfree Payment Gateway Backend");
});

// Route to create a payment order

// Route to verify payment status
app.post('/verify', async (req, res) => {
    try {
        const { orderId } = req.body;

        // Verify payment signature
        const params = {
            order_id: orderId,
        };

        const verificationResponse = await Cashfree.PGOrderFetchPayment("2023-08-01", params);
        console.log('Verification Response:', verificationResponse.data);

        if (verificationResponse.data && verificationResponse.data.txStatus === 'SUCCESS') {
            res.status(200).json({
                success: true,
                message: "Payment verified successfully.",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Payment verification failed.",
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error.message);
        res.status(500).json({
            success: false,
            message: "Payment verification failed.",
            error: error.message,
        });
    }
});

// Start the Express server
app.listen(8000, () => {
    console.log("Server is running on port 8000...");
});
