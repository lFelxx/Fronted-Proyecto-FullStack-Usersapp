import { UserForm } from "./UserForm";
import { useUsers } from "../hooks/useUsers";

export const UserModalForm = () => {

    const { userSelected, handlerCloseForm } = useUsers();
    return (
        <div className="modal show fade" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-lg rounded-4 border-0">
                    <div className="modal-header bg-secondary text-white">
                        <h5 className="modal-title">
                            {userSelected.id > 0 ? 'Editar Usuario' : 'Crear Usuario'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={handlerCloseForm}
                        ></button>
                    </div>
                    <div className="modal-body bg-light">
                        <UserForm
                            handlerCloseForm={handlerCloseForm}
                            userSelected={userSelected}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};