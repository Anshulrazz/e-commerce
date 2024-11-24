import React, { useEffect } from "react";
import Auth from "./components/auth";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, loadUser } from "./Actions/User";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import AddProduct from "./pages/Addproduct";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  // const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { isAuthenticated , user } = useSelector((state) => state.user);
  const admin = user?.isAdmin;


  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/add/admin" element={admin===true ? <AddProduct /> : <Auth />} />
        {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Auth />} /> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/auth/:type" element={<Auth />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Auth />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
