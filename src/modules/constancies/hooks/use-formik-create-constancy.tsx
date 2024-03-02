import { useFormik } from 'formik';
// import { toast } from 'react-toastify';

export interface Constancy {
    name_institution: string,
    rfc_institution: string,
    name_representative: string,
    date_init: string,
    date_finish: string,
    course: string,
    duration: number,
    catalogo_ocupaciones: string,
    area_tematica: string,
    file?: File
}

export default function useFormikCreateConstancie() {
    const formik = useFormik({
        initialValues: {
            name_institution: "",
            rfc_institution: "",
            name_representative: "",
            date_init: "",
            date_finish: "",
            course: "",
            catalogo_ocupaciones: "",
            area_tematica: "",
            duration: 0,
            file: undefined
        },
        onSubmit: async (values: Constancy) => {
            console.log(values)
            // const id = toast.loading("Validando información...");
            // return loginService(values)
            //     .then((r) => {
            //         login(r.data.token);
            //         toast.update(id, { render: "Acceso correcto", type: "success", isLoading: false, autoClose: 1500 });
            //         setTimeout(() => {
            //             navigate("/panel")
            //         }, 2000);
            //     })
            //     .catch(() => {
            //         toast.update(id, { render: "Error al ingresar", type: "error", isLoading: false, autoClose: 1500 });
            //     });
        },
        validate: (values: Constancy) => {
            const errors: { 
                name_institution?: string,
                rfc_institution?: string,
                name_representative?: string,
                date_init?: string,
                date_finish?: string,
                course?: string,
                duration?: string,   
                catalogo_ocupaciones?: string,
                area_tematica?: string,
                file?: string
            } = {};

            if (!values.name_institution) {
                errors.name_institution = "Este campo es obligatorio"
            }

            if (!values.rfc_institution) {
                errors.rfc_institution = "Este campo es obligatorio"
            }
            
            if (!values.name_representative) {
                errors.name_representative = "Este campo es obligatorio"
            }
            
            if (!values.date_init) {
                errors.date_init = "Este campo es obligatorio"
            }
            
            if (!values.date_finish) {
                errors.date_finish = "Este campo es obligatorio"
            }
            
            if (!values.catalogo_ocupaciones) {
                errors.catalogo_ocupaciones = "Este campo es obligatorio"
            }

            if (!values.area_tematica) {
                errors.area_tematica = "Este campo es obligatorio"
            }

            if (!values.course) {
                errors.course = "Este campo es obligatorio"
            }
            
            if (!values.duration) {
                errors.duration = "Este campo es obligatorio"
            }

            if (!values.file) {
                errors.file = "Este campo es obligatorio"
            }

            return errors;
        }
    })

    return formik
}