import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onInitLogin, onLogin, onLogout } from "../../store/slices/auth/authSlice";


export const useLogin = () => {

    const dispatch = useDispatch();
    const {user, isAdmin, isAuth} = useSelector(state => state.auth);
    //const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async ({ username, password }) => {

        try {
            dispatch(onInitLogin());
            const response = await loginUser({ username, password });
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            console.log(claims);
            const user = { username: claims.sub }
            //const user = { username: 'admin' }
            dispatch(onLogin({ user, isAdmin: claims.isAdmin }));

            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));
            sessionStorage.setItem('token', `Bearer ${token}`)
            navigate('/users')
        } catch (error) {
            dispatch(onLogout());
            if (error.response?.status == 401) {
                Swal.fire('Error en el login', 'Username o password invalidos', 'error')
            } else if (error.response?.status == 403) {
                Swal.fire('Error en el login', 'No tiene acceso al recurso o permisos!', 'error')
            } else {
                throw error;
            }
            Swal.fire('Error en el login', 'Username o password invalidos', 'error')
        }
    }

    const handlerLogut = () => {
        dispatch(onLogout());
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
    }
    return {
        login: {
            user,
            isAdmin,
            isAuth
        },
        handlerLogin,
        handlerLogut
    }
}