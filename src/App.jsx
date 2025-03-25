import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './styles/App.scss';
import { CartProvider } from './context/CartContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { UserProvider } from './context/UserContext';
import Home from './Pages/Home/Home';
import Profile from './components/Profile/Profile';
import ProductDetails from './components/Products/ProductDetails';
import ProductList from './components/Products/ProductList';

const App = () => {
    return (
        <UserProvider>
            <CartProvider>
                <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "BRL" }}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/home" element={<Home />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/details/:id" element={<ProductDetails />} />
                                <Route path="/products" element={<ProductList />} />
                            </Route>
                        </Routes>
                    </Router>
                </PayPalScriptProvider>
            </CartProvider>
        </UserProvider>
    );
};

export default App;