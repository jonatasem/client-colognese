import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PayPalButtons } from '@paypal/react-paypal-js';
import './Cart.scss';
import { Link } from 'react-router-dom';
import axios from '../../../axiosConfig';
import { useUser } from '../../context/UserContext';

const Cart = () => {
    const { cart, removeFromCart } = useCart();
    const { user } = useUser();
    const [isProcessing, setIsProcessing] = useState(false); // Estado para controlar o processamento do pagamento

    const handleRemoveFromCart = (item) => {
        removeFromCart(item);
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const handlePurchase = async (orderID) => {
        if (!user || !user.email) {
            alert('Você precisa estar logado para fazer uma compra.');
            return;
        }

        const saleData = {
            customerEmail: user.email,
            transactionId: orderID,
            productIds: cart.map(item => item.id),
            quantities: cart.map(item => item.quantity),
            totalAmount,
        };

        try {
            await axios.post('/sales', saleData);
            alert('Venda registrada com sucesso!');
        } catch (error) {
            console.error('Erro ao registrar a venda:', error);
            alert('Ocorreu um erro ao registrar a venda.');
        }
    };

    return (
        <section className='container-cart'>
            <article className="cart-header">
                <h2>Carrinho de Compras</h2>
                <Link to="/home">Voltar</Link>
            </article>
            <article className="cart-center">
                {cart.length === 0 ? (
                    <p className='not-found'>Carrinho vazio :/</p>
                ) : (
                    <>
                        <ul>
                            {cart.map(item => (
                                <li key={item.id}>
                                    <h3>{item.name}</h3>
                                    <p>Quantidade: {item.quantity}</p>
                                    <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
                                    <button onClick={() => handleRemoveFromCart(item)} disabled={isProcessing}>Remover</button>
                                </li>
                            ))}
                        </ul>
                        <h3 className='total-amount'>Total: R$ {totalAmount}</h3>
                        <PayPalButtons
                            createOrder={async (data, actions) => {
                                const response = await axios.post('/payment', { amount: totalAmount });
                                return response.data.data.id; // Retorna o ID do pedido gerado no PayPal
                            }}
                            onApprove={async (data, actions) => {
                                setIsProcessing(true); // Ativa o processamento
                                try {
                                    const order = await actions.order.capture();
                                    alert('Compra realizada com sucesso!');
                                    handlePurchase(order.id);
                                } catch (error) {
                                    console.error('Erro ao capturar o pagamento:', error);
                                    alert('Erro ao processar o pagamento. Tente novamente.');
                                } finally {
                                    setIsProcessing(false); // Desativa o processamento
                                }
                            }}
                            onError={(error) => {
                                console.error('Erro no PayPal:', error);
                                alert('Erro ao processar o pagamento. Tente novamente.');
                            }}
                        />
                    </>
                )}
            </article>
        </section>
    );
};

export default Cart;