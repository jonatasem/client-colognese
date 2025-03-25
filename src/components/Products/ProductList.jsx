import React, { useEffect, useState } from 'react';
import axios from '../../../axiosConfig';
import { Link } from 'react-router-dom';
import './ProductList.scss';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className='product-list'>
            <article className="product-list-header">
                <h2>Produtos Disponíveis</h2>
                {products.length === 0 ? (
                    <p className='not-found'>Nenhum produto disponível.</p>
                ) : (
                    <ul className='product-list-center'>
                        {products.map(product => (
                            <li key={product.id}>
                                <Link to={`/details/${product.id}`}>
                                    <img src={product.imageUrl} alt={product.name} />
                                    <h3>{product.name}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </article>
        </section>
    );
};

export default ProductList;