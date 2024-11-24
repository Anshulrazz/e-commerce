import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Heart } from 'lucide-react';
export default function Shop() {
    const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
    })
    const addProduct = (id) => async () => {
        try {
            const { data } = await api.post(
                `/api/product/${id}`,
            );
            data.message && alert(data.message);
            // reload cart
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    const { user } = useSelector((state) => state.user);
    const admin = user?.isAdmin;
    const deleteProduct = (id) => async () => {
        try {
            const { data } = await api.get(
                `/api/product/delete/${id}`,
            );
            data.message && alert(data.message);
            // reload cart
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    // Safely extract products with fallback
    const products = useSelector((state) => state.product?.products?.products || []);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="pt-2 pb-16">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Shop All Products</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search products"
                            className="rounded-lg border-2 p-2 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden group"
                            >
                                <div className="relative">
                                    <img
                                        src={product.image.url}
                                        alt={product.name}
                                        className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
                                    />
                                    {(admin === true ? <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100" onClick={deleteProduct(product._id)}><Trash2 className="h-5 w-5" /></button> : <button className="absolute top-4 right-4 p-3 rounded-full shadow-md hover:bg-gray-100"
                                        onClick={(e) => e.currentTarget.classList.toggle('bg-red')}>

                                        <Heart
                                            className="h-6 w-6 text-gray-600 cursor-pointer"
                                            onClick={(e) => e.currentTarget.classList.toggle('text-red-600')}
                                        />
                                    </button>)}
                                </div>
                                <div className="p-6">
                                    <Link to={`/product/${product._id}`}>
                                        <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="mt-2 text-gray-600">Rs.{product.price.toFixed(2)}</p>
                                    <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition" onClick={addProduct(product._id)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-semibold text-gray-900">No products found</h2>
                        <p className="mt-2 text-gray-600">
                            Check back later for more exciting items!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

