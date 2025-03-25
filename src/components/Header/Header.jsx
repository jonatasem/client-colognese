import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase'; // Certifique-se de que o caminho está correto
import { signOut } from 'firebase/auth';
import './Header.scss';
import { MdLogout } from "react-icons/md";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Chama a função de logout do Firebase
            console.log("Logout bem-sucedido");
            navigate('/'); // Redireciona para a página de login
        } catch (error) {
            console.error("Erro ao fazer logout:", error.message);
        }
    };

    return (
        <header className='container-header'>
            <h1>Colognese Brigaderia</h1>
            <nav>
                <ul>
                    <li><Link to="/profile">Perfil</Link></li>
                    <li><Link to="/cart">Carrinho</Link></li>
                    <li><button onClick={handleLogout}><MdLogout /></button></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;