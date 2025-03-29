import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../../axiosConfig';
import { useCart } from '../../context/CartContext';
import './ProductDetails.scss';
import Waves from '../Waves/Waves';

const ProductDetails = () => {
    const { id } = useParams(); // Obtém o ID do produto da URL
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/products/${id}`);
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
            <Waves />
            <div className="details-head">
                <h2>{product.name}</h2>
                <Link to="/home">Voltar</Link>
            </div>
            <div className="details-center">
                <article className="details-left">
                    <img src={product.imageUrl} alt={product.name} />
                    {notification && <p className="notification">{notification}</p>} 
                </article>
                <article className="details-right">
                    <p><strong>Descrição: </strong>{product.description}</p>
                    <div>
                        <p><strong>Preço: </strong> R$ {product.price.toFixed(2)}</p>
                        <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default ProductDetails;