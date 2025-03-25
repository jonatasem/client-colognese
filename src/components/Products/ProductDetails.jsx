import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../axiosConfig';
import { useCart } from '../../context/CartContext';
import './ProductDetails.scss';

const ProductDetails = () => {
    const { id } = useParams(); // Obtém o ID do produto da URL
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log('Buscando produto com ID:', id); // Verifica o ID
                const response = await axios.get(`/products/${id}`);
                console.log('Resposta da API:', response); // Verifica a resposta
                setProduct(response.data);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setNotification('Produto adicionado ao carrinho!'); // Exibe notificação
        setTimeout(() => {
            setNotification(''); // Limpa a notificação após 3 segundos
        }, 3000);
    };

    if (!product) return <p className='loading'>Carregando...</p>; // Exibe mensagem enquanto carrega

    return (
        <section className='product-details'>
            <article className="product-details-header">
                <h2>{product.name}</h2>
                <img src={product.imageUrl} alt={product.name} />
                <p>Preço: R$ {product.price.toFixed(2)}</p>
                <p>{product.description}</p>
                <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
                {notification && <p className="notification">{notification}</p>} 
            </article>
        </section>
    );
};

export default ProductDetails;