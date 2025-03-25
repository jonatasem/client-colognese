import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase'; // Importar configuração do Firebase
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import axiosInstance from '../../../axiosConfig'; // Importar instância Axios
import './Login.scss';
import imgLogo from '../../assets/img/logo.png';
import { useUser } from '../../context/UserContext'; // Importar contexto

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { displayName, email } = user;

                // Salva informações do usuário no contexto
                const userData = { id: email, name: displayName, email };
                setUser(userData);

                //console.log("Usuário logado:", userData); // Verifica os dados do usuário logado

                try {
                    // Verifica se o usuário já está cadastrado
                    const response = await axiosInstance.get(`/customers/${email}`);
                    console.log("Resposta da verificação de cadastro:", response); // Verifica a resposta do servidor

                    // Se a resposta for 404, significa que o usuário não está cadastrado
                    if (response.status === 200) {
                        //console.log("Usuário já cadastrado.");
                    }
                } catch (error) {
                    console.error("Erro ao verificar usuário:", error.message); // Mostra mensagem de erro

                    // Se o erro for 404, significa que o usuário não está cadastrado, então vamos cadastrar
                    if (error.response && error.response.status === 404) {
                        // Se não estiver cadastrado, cadastra o novo usuário
                        const newUser = { 
                            id: email, 
                            name: displayName, 
                            email,
                            phone: "",  // Define como string vazia
                            address: "", // Define como string vazia
                            city: "" // Define como string vazia
                        };
                        try {
                            const registrationResponse = await axiosInstance.post('/customers', newUser);
                            console.log("Usuário cadastrado com sucesso!", registrationResponse.data);
                        } catch (registrationError) {
                            console.error("Erro ao cadastrar usuário:", registrationError.response ? registrationError.response.data : registrationError.message);
                        }
                    }
                }

                navigate('/home'); // Redireciona para a lista de produtos se logado
            }
        });

        return () => unsubscribe(); // Limpa o listener ao desmontar
    }, [navigate, setUser]);

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log("Login bem-sucedido");
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
        }
    };

    return (
        <section className='container-login'>
            <article className="login-center">
                <img src={imgLogo} alt="imagem da logo" />
                <h3>Bem Vindo(a)!</h3>
                <h2>Faça login para continuar.</h2>
                <button onClick={handleGoogleLogin}>Entrar com Google</button>
            </article>
        </section>
    );
};

export default Login;
