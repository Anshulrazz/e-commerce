const User = require('../model/User');
const { Cashfree } = require('cashfree-pg');
const crypto = require('crypto');
require('dotenv').config();

function generateOrderId() {
  const uniqueID = crypto.randomBytes(16).toString('hex');
  return `CF_${uniqueID.substr(0, 12)}`;
}

// Initialize Cashfree
Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


// Route to create a payment order
exports.payment = async (req, res) => {
  try {
    //get toral ammount of cart 
    const user = await User.findById(req.user._id);
    const totalAmount = user.cart.reduce((acc, product) => acc + product.price, 0);
    const total = (totalAmount > 500 ? totalAmount + 10 : totalAmount);
    const orderId = generateOrderId();
    const request = {
      order_amount: total,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: "12345",
        customer_name: "Test User",
        customer_email: "test@example.com",
        customer_phone: "9999499999",
      },
    };
    // Create order with Cashfree
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);

    if (response.data && response.data.payment_session_id) {
      res.status(200).json({
        success: true,
        order_id: orderId,
        payment_session_id: response.data.payment_session_id,
      });
    } else {
      throw new Error("Invalid response from Cashfree");
    }
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create order.",
      error: error.message,
    });
  }
};

// const Cashfree = require('cashfree-sdk'); // Assuming Cashfree SDK is imported

exports.verify = async (req, res) => {
  try {
    // Extract the orderId from the request body
    const { orderId } = req.body;

    // Prepare the parameters to fetch payment status
    const params = {
      order_id: orderId,
      cf_payment_id: req.body.cf_payment_id,
    };

    // Call Cashfree API to verify the payment
    const verificationResponse = await Cashfree.PGOrderFetchPayment("2023-08-01", params); // Assuming this is the correct API call

    console.log('Verification Response:', verificationResponse.data);

    // Check if payment status is 'SUCCESS'
    if (verificationResponse.data && verificationResponse.data.txStatus === 'SUCCESS') {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed.",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    // Return error message if something goes wrong
    return res.status(500).json({
      success: false,
      message: "Failed to verify payment.",
      error: error.message,
    });
  }
};


exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    user = await User.create({
      name,
      email,
      phone,
      password
    });
    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getmyprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};