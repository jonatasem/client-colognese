import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../../../axiosConfig";
import { useUser } from '../../context/UserContext';
import './Profile.scss';
import imgProfile from '../../assets/img/profile.png';

export default function Profile() {
    const { user } = useUser(); // Obtém o usuário do contexto

    console.log(user); // Verifica o estado do usuário no contexto
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user && user.id) { // Verifica se o usuário está autenticado e tem um ID
                try {
                    const response = await axiosInstance.get(`/customers/${user.id}`); // Usando o ID do usuário na URL
                    if (response.data) {
                        setUserInfo(response.data); // Ajusta para pegar o usuário correto
                    } else {
                        console.error('Usuário não encontrado na base de dados.');
                    }
                } catch (error) {
                    console.error('Erro ao buscar perfil do usuário:', error);
                }
            } else {
                console.log('Usuário não autenticado ou sem ID.');
            }
        };

        fetchUserProfile();
    }, [user]); // Dependência do usuário

    // Condicional para renderização
    if (!user) {
        return <p>Carregando...</p>; // Ou redirecione para a página de login
    }

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/customers/${user.id}`, userInfo); // Atualiza o usuário pelo ID
            console.log('Informações do usuário atualizadas com sucesso!');
            setIsEditing(false); // Para sair do modo de edição
        } catch (error) {
            console.error('Erro ao atualizar informações do usuário:', error);
        }
    };

    return (
        <section className="container-profile">
            <article className="profile-header">
                <h2>Perfil</h2>
                <Link to="/home">Voltar</Link>
            </article>
            <article className="profile-center">
                <div className='profile-info'>
                    <img className='img-profile' src={imgProfile} alt="imagem do perfil" />
                    <h2>{userInfo.name}</h2>
                    <p>Telefone: {userInfo.phone}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Endereço: {userInfo.address}</p>
                    <p>Cidade: {userInfo.city}</p>
                </div>
                <div className="profile-center-footer">
                    <h1>Para que queremos essas informações?</h1>
                    {isEditing ? (
                        <form className='formulario-profile' onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                name="name" 
                                value={userInfo.name} 
                                onChange={handleChange}
                                placeholder="Digite seu nome completo" 
                                required
                            />
                            <input 
                                type="tel" 
                                name="phone" 
                                value={userInfo.phone} 
                                onChange={handleChange} 
                                placeholder='Digite seu telefone'
                                required 
                            />
                            <input 
                                type="text" 
                                name="address" 
                                value={userInfo.address} 
                                onChange={handleChange} 
                                placeholder='Digite seu endereço, número'
                                required 
                            />
                            <input 
                                type="text" 
                                name="city" 
                                value={userInfo.city} 
                                onChange={handleChange} 
                                placeholder='Digite sua cidade'
                                required 
                            />
                            <button type="submit">Salvar</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
                        </form>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Editar Informações</button>
                    )}
                </div>  
            </article>
        </section>
    );
}
