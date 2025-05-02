import axios from "axios";

const usersApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/users`
});

// usersApi.interceptors.request.use(config => {
//     config.headers = {
//         ...config.headers,
//         'Authorization': sessionStorage.getItem('token'),
//     }
//     return config;
// })
usersApi.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token');
    console.log("Token en la cabecera:", token); // Verifica que el token sea correcto
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
    }
    return config;
})



export default usersApi;