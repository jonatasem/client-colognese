import axios from 'axios';

// Cria uma instância do axios com a URL base e um tempo limite
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,  // URL base da API
    timeout: 60000, // Tempo limite para requisições em milissegundos
});

// Exporta a instância do axios para uso em outros componentes
export default axiosInstance;