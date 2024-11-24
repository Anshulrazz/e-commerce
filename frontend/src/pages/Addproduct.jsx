import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../Actions/User'; // Assuming you have this action
// You can import an image upload package like 'react-dropzone' if you want to handle image uploads

export default function AddProduct() {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);
            }
        };
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addProduct(name, price, category, description, stock, image));
        alert('Product added successfully');
        window.location.reload();
    };

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Add New Product</h1>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg mt-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg mt-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-gray-700">Description</label>
                        <textarea
                            type="text"
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg mt-2"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-gray-700">Catagory</label>
                        <input
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="4"
                            className="w-full px-4 py-2 border rounded-lg mt-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="stock" className="block text-gray-700">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg mt-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-gray-700">Product Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                            className="w-full mt-2"
                        />

                        <div className="mt-4">
                            {image && (
                                <img
                                    src={image}
                                    alt="Image Preview"
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
