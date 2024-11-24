import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookMarked, Menu, ShoppingCart, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Actions/User';  // Make sure you have the logout action

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    // Access user data and authentication status from Redux
    const { isAuthenticated } = useSelector((state) => state.user);

    // Set up Redux dispatch and navigate
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle user logout
    const handleLogout = () => {
        dispatch(logoutUser());  // Dispatch your logout action to clear user state
        navigate('/auth/signin');  // Navigate to the login page after logout
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <BookMarked className="h-8 w-8 text-indigo-600" />
                            <span className="font-bold text-xl text-gray-900">SWayam</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        <Link to="/shop" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                            Shop
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link to="/cart" className="relative">
                                <ShoppingCart className="h-6 w-6 text-gray-600" />
                                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    ❤️
                                </span>
                            </Link>
                        </div>
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                                >
                                    <img
                                        src={'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'}
                                        alt={'User'}
                                        className="h-8 w-8 rounded-full"
                                    />
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/auth/signin"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            to="/shop"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link to={"/cart"} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                            Cart</Link>
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/auth/signin"
                                className="block px-3 py-2 text-base font-medium text-indigo-600 hover:text-indigo-800"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
