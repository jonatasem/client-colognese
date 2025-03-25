import React, { createContext, useContext, useState } from 'react';

// Criação do contexto do carrinho
const CartContext = createContext();

// Hook para acessar o contexto do carrinho
export const useCart = () => {
    return useContext(CartContext);
};

// Provedor do contexto do carrinho
export const CartProvider = ({ children }) => {
    // Inicializa o carrinho como um array vazio
    const [cart, setCart] = useState([]);

    // Função para adicionar um produto ao carrinho
    const addToCart = (product) => {
        if (!product || !product.id || !product.price) {
            console.error('Produto inválido:', product);
            return; // Não adiciona produtos inválidos
        }

        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
            if (existingProductIndex >= 0) {
                // Se o produto já está no carrinho, aumenta a quantidade
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            } else {
                // Se o produto não está no carrinho, adiciona um novo item
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Função para remover um produto do carrinho
    const removeFromCart = (productToRemove) => {
        setCart(prevCart => prevCart.filter(product => product.id !== productToRemove.id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
