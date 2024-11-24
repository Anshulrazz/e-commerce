import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">SWayam</span>
            </Link>
            <p className="mt-4 text-sm">Making fashion accessible to everyone.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="mt-4 space-y-2">
              <Link to="/" className="block text-sm hover:text-white">About Us</Link>
              <Link to="/" className="block text-sm hover:text-white">Contact</Link>
              <Link to="/" className="block text-sm hover:text-white">FAQs</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <div className="mt-4 space-y-2">
              <Link to="/" className="block text-sm hover:text-white">Men</Link>
              <Link to="/" className="block text-sm hover:text-white">Women</Link>
              <Link to="/" className="block text-sm hover:text-white">Accessories</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="mt-4 space-y-2">
              <a href="#" className="block text-sm hover:text-white">Instagram</a>
              <a href="#" className="block text-sm hover:text-white">Twitter</a>
              <a href="#" className="block text-sm hover:text-white">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2024 SWayam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}