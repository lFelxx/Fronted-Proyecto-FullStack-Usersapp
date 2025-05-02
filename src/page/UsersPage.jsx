
import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";
import { useLogin } from "../auth/hooks/useLogin";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";

export const UsersPage = () => {

    const { page } = useParams();
    const {
        users,
        visibleForm,
        isLoading,
        paginator,
        handlerOpenForm,
        getUsers,
    } = useUsers();

    const { login } = useLogin();

    useEffect(() => {
        getUsers(page);
    }, [, page])

    if (isLoading) {
        return (
            <div className="container my-4 text-center">
                {/* <h4>Cargando...</h4> */}
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <>
            {!visibleForm ||
                <UserModalForm />
            }
            <div className="container my-4">
                <h2>Users App</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || <button
                            className="btn btn-primary my-2"
                            onClick={handlerOpenForm}>
                            Nuevo Usuario
                        </button>}
                        {users && users.length === 0
                            ? <div className="alert alert-warning">No hay usuarios registrados!</div>
                            :
                            <>
                                <UsersList />
                                <Paginator url="/users/page" paginator={paginator}/>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}