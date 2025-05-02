import { useState } from "react";
import Swal from "sweetalert2";
import { useLogin } from "../hooks/useLogin";
import './LoginPage.css';  // Asegúrate de que el CSS esté correctamente enlazado

const initialLoginForm = {
    username: '',
    password: '',
};

export const LoginPage = () => {
    const { handlerLogin } = useLogin();
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({ ...loginForm, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Error de validación', 'Username y password requeridos', 'error');
            return;
        }
        handlerLogin({ username, password });
        setLoginForm(initialLoginForm);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">
                    <i className="bi bi-person-circle me-2"></i>Login
                </h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            className="form-control"
                            placeholder="Enter username"
                            name="username"
                            value={username}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="d-grid mb-3">
                        <button className="btn login-btn btn-lg text-white" type="submit">
                            <i className="bi bi-box-arrow-in-right me-2"></i>Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
