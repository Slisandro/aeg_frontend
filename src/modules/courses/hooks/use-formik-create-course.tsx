import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { createCourse, editCourse } from '../services';

export interface Course {
    _id?: string,
    name: string,
    duration: string
}

export default function useFormikCreateUser(entity?: Course) {
    const formik = useFormik({
        initialValues: {
            name: entity?.name ?? "",
            duration: entity?.duration ?? "",
        },
        onSubmit: async (values: Course) => {
            if (entity) {
                const id = toast.loading("Actualizando curso...");
                if (entity?._id) {
                    return editCourse(entity._id, {
                        name: values.name,
                        duration: values.duration
                    })
                        .then(() => toast.update(id, { render: "Curso actualizado", type: "success", isLoading: false, autoClose: 1500 }))
                        .catch(() => toast.update(id, { render: "Error al actualizar curso", type: "error", isLoading: false, autoClose: 1500 }))
                }
            } else {
                const id = toast.loading("Creando curso...");
                return createCourse({
                    name: values.name,
                    duration: values.duration
                })
                    .then(() => toast.update(id, { render: "Curso creado", type: "success", isLoading: false, autoClose: 1500 }))
                    .catch(() => toast.update(id, { render: "Error al crear curso", type: "error", isLoading: false, autoClose: 1500 }))
            }
        },
        validate: (values: Course) => {
            const errors: { username?: string, role?: string, password?: string } = {};

            if (!values.name) {
                errors.username = "Este campo es obligatorio"
            }

            if (!values.duration) {
                errors.role = "Este campo es obligatorio"
            }

            return errors;
        }
    })

    return formik
}