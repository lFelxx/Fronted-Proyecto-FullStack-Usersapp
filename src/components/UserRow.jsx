import { NavLink } from "react-router-dom"
import { useUsers } from "../hooks/useUsers";
import { useLogin } from "../auth/hooks/useLogin";

export const UserRow = ({ id, username, email, admin }) => {

    const { handlerUserSelectedForm, handlerRemoveUser } = useUsers();
    const { login } = useLogin();
    return (
        <tr className="align-middle table-hover">
            <td className="fw-bold text-primary">{id}</td>
            <td className="text-capitalize">{username}</td>
            <td className="text-muted">{email}</td>

            {!login.isAdmin || (
                <>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                            onClick={() => handlerUserSelectedForm({ id, username, email, admin })}
                        >
                            <i className="bi bi-pencil-square me-1"></i>Edit
                        </button>
                    </td>
                    <td>
                        <NavLink
                            className="btn btn-outline-info btn-sm rounded-pill px-3"
                            to={`/users/edit/${id}`}
                        >
                            <i className="bi bi-box-arrow-in-up-right me-1"></i>Route
                        </NavLink>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                            onClick={() => handlerRemoveUser(id)}
                        >
                            <i className="bi bi-trash me-1"></i>Delete
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
};