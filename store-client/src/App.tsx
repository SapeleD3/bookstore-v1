import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import Register from "./pages/register";
import Books from "./pages/books";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/cart";
import Orders from "./pages/orders";

const App = () => {
  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;
