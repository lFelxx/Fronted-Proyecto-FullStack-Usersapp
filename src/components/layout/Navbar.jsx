import { NavLink } from "react-router-dom";
import { useLogin } from "../../auth/hooks/useLogin";

export const Navbar = () => {

    const { login, handlerLogut } = useLogin();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <NavLink className="navbar-brand fw-bold text-dark" to="/users">
                    <i className="bi bi-people-fill me-2"></i>UsersApp
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link text-dark" to="/users">
                                <i className="bi bi-list-ul me-1"></i>Usuarios
                            </NavLink>
                        </li>

                        {login.isAdmin && (
                            <li className="nav-item">
                                <NavLink className="nav-link text-dark" to="/users/register">
                                    <i className="bi bi-person-plus-fill me-1"></i>Registrar Usuario
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center">
                        <span className="navbar-text text-dark me-3">
                            <i className="bi bi-person-circle me-1"></i>
                            {login.user?.username}
                        </span>
                        <button
                            onClick={handlerLogut}
                            className="btn btn-outline-danger btn-sm"
                        >
                            <i className="bi bi-box-arrow-right me-1"></i>Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};