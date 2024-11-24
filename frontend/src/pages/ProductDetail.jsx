import React from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Shield, Truck } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function ProductDetail() {
    const { id } = useParams();
    const products = useSelector((state) => state.product?.products?.products || []);
    const product = products.find((product) => product._id === id);

    const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
    });

    const addProduct = (id) => async () => {
        try {
            const { data } = await api.post(`/api/product/${id}`);
            data.message && alert(data.message);
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    const items = {
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Black", "Blue"]
    };

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="relative">
                        <img
                            src={product?.image?.url || 'placeholder.jpg'}
                            alt={product?.name || 'No Name'}
                            className="w-full rounded-lg shadow-lg"
                        />
                        <button className="absolute top-4 right-4 bg-red p-3 rounded-full shadow-md hover:bg-gray-100"
                        onClick={(e) => e.currentTarget.classList.toggle('bg-red')}>

                            <Heart 
                                className="h-6 w-6 text-gray-600 cursor-pointer" 
                                onClick={(e) => e.currentTarget.classList.toggle('text-red-600')} 
                            />
                        </button>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="mt-4 text-2xl text-indigo-600">Rs.{product.price}</p>
                        <p className="mt-6 text-gray-600"><b>{product.description}</b></p>
                        <p className="mt-6 text-gray-600">{product.category}</p>
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900">Size</h3>
                            <div className="mt-3 flex space-x-3">
                                {items.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className="px-4 py-2 border-2 border-gray-300 rounded-md hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition flex items-center justify-center" onClick={addProduct(product._id)}>
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                        </button>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                                <Truck className="h-5 w-5 text-indigo-600" />
                                <span className="text-sm text-gray-600">Free shipping over Rs. 500</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Shield className="h-5 w-5 text-indigo-600" />
                                <span className="text-sm text-gray-600">Secure checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
