import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { createUser, editUser } from '../services';

export interface User {
    _id?: string,
    username: string,
    password: string,
    role: string
}

export default function useFormikCreateUser(entity?: User) {
    const formik = useFormik({
        initialValues: {
            username: entity?.username ?? "",
            role: entity?.role ?? "User",
            password: ""
        },
        onSubmit: async (values: User) => {
            if (entity) {
                const id = toast.loading("Actualizando usuario...");
                if (entity?._id) {
                    return editUser(entity._id, {
                        username: values.username,
                        role: values.role
                    })
                        .then(() => toast.update(id, { render: "Usuario actualizado", type: "success", isLoading: false, autoClose: 1500 }))
                        .catch(() => toast.update(id, { render: "Error al actualizar usuario", type: "error", isLoading: false, autoClose: 1500 }))
                }
            } else {
                const id = toast.loading("Creando usuario...");
                return createUser({
                    username: values.username,
                    role: values.role,
                    password: values.password
                })
                    .then(() => toast.update(id, { render: "Usuario creado", type: "success", isLoading: false, autoClose: 1500 }))
                    .catch(() => toast.update(id, { render: "Error al crear usuario", type: "error", isLoading: false, autoClose: 1500 }))
            }
        },
        validate: (values: User) => {
            const errors: { username?: string, role?: string, password?: string } = {};

            if (!values.username) {
                errors.username = "Este campo es obligatorio"
            }

            if (!values.role) {
                errors.role = "Este campo es obligatorio"
            }

            if (!entity) {
                if (!values.password) {
                    errors.password = "Este campo es obligatorio"
                }
            }

            return errors;
        }
    })

    return formik
}