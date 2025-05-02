import { UserRow } from "./UserRow";
import { useUsers } from "../hooks/useUsers";
import { useLogin } from "../auth/hooks/useLogin";
import './UsersList.css'; // Asegúrate de tener este archivo creado

export const UsersList = () => {
    const { users } = useUsers();
    const { login } = useLogin();

    return (
        <div className="card users-list-card shadow-sm border-0">
            <div className="card-header users-list-header">
                <h4 className="mb-0">
                    <i className="bi bi-people-fill me-2"></i>Lista de Usuarios
                </h4>
            </div>
            <div className="card-body p-0">
                <table className="table users-list-table table-hover table-striped align-middle text-center mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            {login.isAdmin && (
                                <>
                                    <th><i className="bi bi-pencil-square"></i></th>
                                    <th><i className="bi bi-box-arrow-in-up-right"></i></th>
                                    <th><i className="bi bi-trash"></i></th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(({ id, username, email, admin }) => (
                            <UserRow
                                key={id}
                                id={id}
                                username={username}
                                email={email}
                                admin={admin}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
