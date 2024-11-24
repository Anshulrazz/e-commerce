import React, { useEffect, useState } from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { load } from "@cashfreepayments/cashfree-js";
// Assuming you have a `clearCart` action
export default function Cart() {
    const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
    });

    const [orderId, setOrderId] = useState("");
    const [cashfree, setCashfree] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // State to handle success popup

    const dispatch = useDispatch();

    // Initialize the Cashfree SDK
    useEffect(() => {
        const initializeSDK = async () => {
            try {
                const cashfreeInstance = await load({
                    mode: "sandbox", // Change to "production" for live
                });
                setCashfree(cashfreeInstance);
                console.log("Cashfree SDK initialized successfully");
            } catch (error) {
                console.error("Error initializing Cashfree SDK", error);
            }
        };
        initializeSDK();
    }, []);

    // Fetch session ID and order ID from backend
    const getSessionId = async () => {
        try {
            const res = await api.get("api/auth/payment");
            if (res.data && res.data.payment_session_id) {
                console.log("Session Data:", res.data);
                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            } else {
                console.error("Invalid session ID response from server", res.data);
            }
        } catch (error) {
            console.error("Error fetching session ID", error);
        }
    };

    // Handle payment button click/ Verify payment on the backend
    const verifyPayment = async (orderId,cf_payment_id) => {
        try {
            const res = await api.post("/api/auth/verify", {
                orderId,cf_payment_id
            });
            console.log("Verification response:", res.data);
            if (res.data.success) {
                alert("Payment successful!");
            } else {
                // alert("Payment verification failed.");
            }
        } catch (error) {
            console.error("Error during payment verification", error);
            //   alert("An error occurred while verifying the payment.");
        }
    };

    // Handle payment button click
    const handleclick = async (e) => {
        e.preventDefault();

        if (!cashfree) {
            console.error("Cashfree SDK not loaded");
            return;
        }

        try {
            const sessionId = await getSessionId();
            if (!sessionId) {
                console.error("No session ID returned");
                return;
            }

            const checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_modal",
            };

            cashfree
                .checkout(checkoutOptions)
                .then((response) => {
                    console.log("Payment response:", response);
                    verifyPayment(orderId,response.cf_payment_id);
                    setShowPopup(true);
                })
                .catch((error) => {
                    console.error("Error during payment initiation", error);
                    //   alert("Payment initiation failed. Please try again.");
                });
        } catch (error) {
            console.error("Error during payment process", error);
            //   alert("An unexpected error occurred. Please try again.");
        }
    };


    const user = useSelector((state) => state.user?.user || {});
    const cart = user.cart || [];

    // Calculate subtotal, shipping, and total
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const shipping = 10; // Static shipping cost
    const total = subtotal + shipping;

    // Dispatch actions for cart updates
    const removeFromCart = (id) => async () => {
        try {
            const { data } = await api.post(`/api/product/remove/${id}`);
            data.message && alert(data.message);
            // reload cart
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="pt-2 pb-16">
            <div className="max-w-7xl mx-auto px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            {cart.map((item, index) => (
                                <div
                                    key={`${item._id}-${index}`} // Use index to handle duplicates safely
                                    className="flex items-center space-x-4 border-b border-gray-200 py-4"
                                >
                                    <img
                                        src={item.image?.url || ''}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                                        <p className="text-gray-600">Rs.{item.price}</p>
                                    </div>
                                    <button
                                        onClick={removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg h-fit">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>Rs.{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Rs.{total.toFixed(2) > 500 ? 0 : shipping.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <div className="flex justify-between font-semibold text-gray-900">
                                        <span>Total</span>
                                        <span>Rs.{total.toFixed(2) < 500 ? total.toFixed(2) : subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition" onClick={handleclick}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto" />
                        <h2 className="mt-4 text-xl font-semibold text-gray-900">Your cart is empty</h2>
                        <p className="mt-2 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
                        <Link
                            to="/shop"
                            className="mt-6 inline-block bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>

            {/* Order Success Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <h2 className="text-xl font-semibold text-gray-900">Order Successful</h2>
                        <p className="mt-4 text-gray-600">Your payment was successful. Thank you for your purchase!</p>
                        <button
                            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                            onClick={() => setShowPopup(false)}
                        >
                            <Link to={'/shop'}>
                            Go To Home
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
