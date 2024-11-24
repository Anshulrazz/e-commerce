import React from 'react';
import { ChevronRight, TrendingUp, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Home() {

  return (
    <div>
      {/* Hero Section */}
      <header className="relative h-[90vh] bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto h-full flex items-center px-8">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Discover Your Perfect Style
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-lg">
              Explore our curated collection of premium fashion items. Quality meets style in every piece.
            </p>
            <div className="mt-8 flex space-x-4">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition flex items-center">
                <Link to="/shop" >
                  Shop Collection
                </Link>
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full hover:bg-gray-900 hover:text-white transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="hidden md:block w-1/2">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80"
              alt="Fashion Model"
              className="object-cover h-[70vh] w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Truck className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Free Shipping</h3>
                <p className="mt-2 text-gray-600">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Secure Payment</h3>
                <p className="mt-2 text-gray-600">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Premium Quality</h3>
                <p className="mt-2 text-gray-600">Handpicked products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Join Our Newsletter</h2>
          <p className="mt-4 text-indigo-100 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="mt-8 max-w-xl mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full hover:bg-gray-100 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}