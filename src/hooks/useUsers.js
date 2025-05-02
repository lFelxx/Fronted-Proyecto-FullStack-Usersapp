import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAllPages, remove, save, update } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, updateUser, loadingUsers, onUserSelectedForm, onOpenForm, onCloseForm, initialUserForm, loadingError } from "../store/slices/users/usersSlice";
import { useLogin } from "../auth/hooks/useLogin";


export const useUsers = () => {
    const { users, userSelected, visibleForm, errors, isLoading, paginator } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { login, handlerLogut } = useLogin();

    const getUsers = async (page = 0) => {

        try {
            const result = await findAllPages(page);
            dispatch(loadingUsers(result.data));
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogut();
            }
        }
    }

    const handlerAddUser = async (user) => {

        if (!login.isAdmin) return;
        let response;
        try {

            if (user.id === 0) {
                response = await save(user);
                dispatch(addUser(response.data))
            } else {
                response = await update(user);
                dispatch(updateUser(response.data))
            }

            Swal.fire({
                title: (user.id === 0) ?
                    "Usuario Creado" :
                    'Usuario actualizado',
                text: (user.id === 0) ?
                    "El usuario ha sido creado con exito" :
                    "El usuario ha sido actualizado con exito",
                icon: "success"
            });
            handlerCloseForm();
            navigate('/users');
        } catch (error) {
            if (error.response && error.response.status == 400) {
                dispatch(loadingError(error.response.data));
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {

                if (error.response.data?.message?.includes('UK_username')) {
                    dispatch(loadingError({ username: `El username  '${user.username}' ya existe!` }));
                }

                if (error.response.data?.message?.includes('UK_email')) {
                    dispatch(loadingError({ email: `El email  '${user.email}' ya existe!` }));
                }
            } else if (error.response?.status == 401) {
                handlerLogut();
            } else {
                throw error;
            }
        }
    }
    const handlerRemoveUser = (id) => {

        if (!login.isAdmin) return;

        Swal.fire({
            title: "Esta seguro?",
            text: "Cuidado, el usuario será eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await remove(id);

                    dispatch(removeUser(id));
                    Swal.fire({
                        title: "Usuario Eliminado!",
                        text: "El usuario ha sido eliminado con exito.",
                        icon: "success"
                    });
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogut();
                    }
                }
            }
        });
    }

    const handlerUserSelectedForm = (user) => {
        dispatch(onUserSelectedForm({...user}));
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
        dispatch(loadingError({}));
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
    }
}