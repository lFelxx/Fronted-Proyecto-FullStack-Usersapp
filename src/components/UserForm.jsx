import { useEffect, useState } from "react"
import { useUsers } from "../hooks/useUsers";

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUser, errors } = useUsers();
    const [userForm, setUserForm] = useState(initialUserForm);
    const [checked, setChecked] = useState(userForm.admin);
    const { id, username, password, email, admin } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: '',
        });
    }, [userSelected])
    const onInputChange = ({ target }) => {
        //console.log(target.value)
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        })
    }

    const onCheckboxChange = () => {
        setChecked(!checked);
        setUserForm({
            ...userForm,
            admin: checked,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        // if (!username || (!password && id === 0) || !email) {
        //     Swal.fire({
        //         title: "Error de validación",
        //         text: "Debe rellenar todos los campos del formulario",
        //         icon: "error"
        //     });
        //     return;
        // }
        // if (!email.includes('@')) {
        //     Swal.fire({
        //         title: "Error de validación en el email",
        //         text: "El email debe ser valido",
        //         icon: "error"
        //     });
        //     return;
        // }

        // guardar el user form en el listado de usuarios
        handlerAddUser(userForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }
    return (
        <form 
            onSubmit={onSubmit} 
            className="p-4 shadow-lg rounded bg-light border mx-auto mt-4" 
            style={{ maxWidth: "500px", fontFamily: "'Poppins', sans-serif" }}
        >
            <h4 className="text-center mb-4">
                {id > 0 ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
            </h4>

            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onInputChange}
                />
                <label htmlFor="username">Username</label>
                {errors?.username && <div className="form-text text-danger">{errors.username}</div>}
            </div>

            {id > 0 ? null : (
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <label htmlFor="password">Password</label>
                    {errors?.password && <div className="form-text text-danger">{errors.password}</div>}
                </div>
            )}

            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                />
                <label htmlFor="email">Email</label>
                {errors?.email && <div className="form-text text-danger">{errors.email}</div>}
            </div>

            <div className="form-check form-switch mb-4">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="adminCheck"
                    name="admin"
                    checked={admin}
                    onChange={onCheckboxChange}
                />
                <label className="form-check-label" htmlFor="adminCheck">
                    ¿Es administrador?
                </label>
            </div>

            <input type="hidden" name="id" value={id} />

            <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-success px-4" type="submit">
                    {id > 0 ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
                {handlerCloseForm && (
                    <button className="btn btn-outline-secondary px-4" type="button" onClick={onCloseForm}>
                        Cerrar
                    </button>
                )}
            </div>
        </form>
    );
};