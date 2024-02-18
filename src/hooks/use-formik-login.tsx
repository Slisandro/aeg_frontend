import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginService from '../servicies/login-servicies';
import useAuth from './use-auth';

export interface Login {
    username: string,
    password: string
}

export default function useFormikLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values: Login) => {
            const id = toast.loading("Validando información...");
            return loginService(values)
                .then((r) => {
                    login(r.data.token);
                    toast.update(id, { render: "Acceso correcto", type: "success", isLoading: false, autoClose: 1500 });
                    setTimeout(() => {
                        navigate("/panel/constancies")
                    }, 2000);
                })
                .catch(() => {
                    toast.update(id, { render: "Error al ingresar", type: "error", isLoading: false, autoClose: 1500 });
                });
        },
        validate: (values: Login) => {
            const errors: { username?: string, password?: string } = {};

            if (!values.username) {
                errors.username = "Este campo es obligatorio"
            }

            if (!values.password) {
                errors.password = "Este campo es obligatorio"
            }

            return errors;
        }
    })

    return formik
}