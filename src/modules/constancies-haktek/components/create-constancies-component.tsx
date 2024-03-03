import { Dialog } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import DialogContainer from "../../../components/dialog-component";
import useGetCourse from "../../courses/hooks/use-get-courses";
import useFormikCreateConstancy from "../hooks/use-formik-create-constancy";
import { createConstancies } from "../services";

// constants 
const AREA_TEMATICAS = [
    { id: 1, name: "Producción General", number: 1000 },
    { id: 2, name: "Servicios", number: 2000 },
    { id: 3, name: "Administración, contabilidad y economía", number: 3000 },
    { id: 4, name: "Comercialización", number: 4000 },
    { id: 5, name: "Producción", number: 5000 },
    { id: 6, name: "Seguridad", number: 6000 },
    { id: 7, name: "Desarrollo personal y familiar", number: 7000 },
    { id: 9, name: "Uso de tecnologías de la información y comunicación", number: 8000 },
    { id: 10, name: "Participación social", number: 9000 },
];

const CATALOGO_OCUPACIONES = [
    { id: 1, name: "Cultivo, crianza y aprovechamiento", number: 1 },
    { id: 2, name: "Agricultura y silvicultura", number: 1.1 },
    { id: 3, name: "Ganadería", number: 1.2 },
    { id: 4, name: "Pesca y acuacultura", number: 1.3 },
    { id: 5, name: "Extracción y suministro", number: 2 },
    { id: 6, name: "Exploración", number: 2.1 },
    { id: 7, name: "Extracción", number: 2.2 },
    { id: 8, name: "Refinación y beneficio", number: 2.3 },
    { id: 9, name: "Provisión de energía", number: 2.4 },
    { id: 10, name: "Provisión de agua", number: 2.5 },
    { id: 11, name: "Construcción", number: 3 },
    { id: 12, name: "Planeación y dirección de obras", number: 3.1 },
    { id: 13, name: "Edificación y urbanización", number: 3.2 },
    { id: 14, name: "Acabado", number: 3.3 },
    { id: 15, name: "Instalación y mantenimiento", number: 3.4 },
    { id: 16, name: "Tecnología", number: 4 },
    { id: 17, name: "Mecánica", number: 4.1 },
    { id: 18, name: "Electricidad", number: 4.2 },
    { id: 19, name: "Electrónica", number: 4.3 },
    { id: 20, name: "Informática", number: 4.4 },
    { id: 21, name: "Telecomunicaciones", number: 4.5 },
    { id: 22, name: "Procesos industriales", number: 4.6 },
    { id: 23, name: "Procesamiento y fabricación", number: 5 },
    { id: 24, name: "Minerales no metálicos", number: 5.1 },
    { id: 25, name: "Metales", number: 5.2 },
    { id: 26, name: "Alimentos y bebidas", number: 5.3 },
    { id: 27, name: "Textiles y prendas de vestir", number: 5.4 },
    { id: 28, name: "Materia orgánica", number: 5.5 },
    { id: 29, name: "Productos químicos", number: 5.6 },
    { id: 30, name: "Productos metálicos y de hule y plástico", number: 5.7 },
    { id: 31, name: "Productos eléctricos y electrónicos", number: 5.8 },
    { id: 32, name: "Productos impresos", number: 5.9 },
    { id: 33, name: "Transporte", number: 6 },
    { id: 34, name: "Ferroviario", number: 6.1 },
    { id: 35, name: "Autotransporte", number: 6.2 },
    { id: 36, name: "Aéreo", number: 6.3 },
    { id: 37, name: "Marítimo y fluvial", number: 6.4 },
    { id: 38, name: "Servicios de apoyo", number: 6.5 },
    { id: 39, name: "Provisión de bienes y servicios", number: 7 },
    { id: 40, name: "Comercio", number: 7.1 },
    { id: 41, name: "Alimentación y hospedaje", number: 7.2 },
    { id: 42, name: "Turismo", number: 7.3 },
    { id: 43, name: "Deporte y esparcimiento", number: 7.4 },
    { id: 44, name: "Servicios personales", number: 7.5 },
    { id: 45, name: "Reparación de artículos de uso doméstico y personal", number: 7.6 },
    { id: 46, name: "Limpieza", number: 7.7 },
    { id: 47, name: "Gestión y soporte administrativo", number: 8 },
    { id: 48, name: "Bolsa, banca y seguros", number: 8.1 },
    { id: 49, name: "Administración", number: 8.2 },
    { id: 50, name: "Servicios legales", number: 8.3 },
    { id: 51, name: "Salud y protección social", number: 9 },
    { id: 52, name: "Servicios médicos", number: 9.1 },
    { id: 53, name: "Inspección sanitaria y del medio ambiente", number: 9.2 },
    { id: 54, name: "Seguridad social", number: 9.3 },
    { id: 55, name: "Protección de bienes y/o personas", number: 9.4 },
    { id: 56, name: "Comunicación", number: 10 },
    { id: 57, name: "Publicación", number: 10.1 },
    { id: 58, name: "Radio, cine, televisión y teatro", number: 10.2 },
    { id: 59, name: "Interpretación artística", number: 10.3 },
    { id: 60, name: "Traducción e interpretación lingüística", number: 10.4 },
    { id: 61, name: "Publicidad, propaganda y relaciones públicas", number: 10.5 },
    { id: 62, name: "Desarrollo y extensión del conocimiento", number: 11 },
    { id: 63, name: "Investigación", number: 11.1 },
    { id: 64, name: "Enseñanza", number: 11.2 },
    { id: 65, name: "Difusión cultural", number: 11.3 },

];

const createFormData = (values: any) => {
    const formData = new FormData();
    
    formData.append("archivoExcel", values.file);
    formData.append("institucion", values.name_institution);
    formData.append("representante", values.name_representative);
    formData.append("rfc", values.rfc_institution);
    formData.append("curso", values.course);
    formData.append("inicio_curso", values.date_init);
    formData.append("fin_curso", values.date_finish);
    formData.append("area_tematica", values.area_tematica);
    formData.append("catalogo_ocupaciones", values.catalogo_ocupaciones);
    formData.append("agente", values.agente);
    formData.append("curp_agente", values.curp_agente);
    formData.append("duracion_hrs", String(values.duration));

    return formData;
};

const Steps = ({ step }: { step: number }) => {
    if (step === 0) {
        return (
            <div className="w-2/3 mx-auto my-6">
                <div className="bg-gray-200 h-1 flex items-center justify-between">
                    <div className="w-1/4 flex justify-between bg-transparent h-1 items-center relative">
                        <div className="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3 relative">
                            <div className="h-3 w-3 bg-indigo-700 rounded-full"></div>
                        </div>
                    </div>
                    <div className="w-1/4 flex justify-end">
                        <div className="bg-white h-6 w-6 rounded-full shadow"></div>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <div className="bg-white h-6 w-6 rounded-full shadow"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (step === 1) {
        return (
            <div className="w-2/3 mx-auto my-6">
                <div className="bg-gray-200 h-1 flex items-center justify-between">
                    <div className="w-1/4 flex justify-between bg-indigo-700 h-1 items-center relative">
                        <div className="bg-indigo-700 h-6 w-6 rounded-full shadow flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="18"
                                height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M5 12l5 5l10 -10" />
                            </svg>
                        </div>
                    </div>
                    <div className="w-1/4 flex justify-end bg-indigo-700 h-1 items-center relative">
                        <div className="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3 relative">
                            <div className="h-3 w-3 bg-indigo-700 rounded-full"></div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <div className="bg-white h-6 w-6 rounded-full shadow"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-2/3 mx-auto my-6">
            <div className="bg-gray-200 h-1 flex items-center justify-between">
                <div className="w-1/4 flex justify-between bg-indigo-700 h-1 items-center relative">
                    <div className="bg-indigo-700 h-6 w-6 rounded-full shadow flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="18"
                            height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M5 12l5 5l10 -10" />
                        </svg>
                    </div>
                </div>
                <div className="w-1/4 flex justify-end bg-indigo-700 h-1 items-center relative">
                    <div className="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="bg-indigo-700 h-6 w-6 rounded-full shadow flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="18"
                                height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M5 12l5 5l10 -10" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex justify-end h-1 items-center bg-indigo-700">
                    <div className="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="h-3 w-3 bg-indigo-700 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default function CreateConstancy(
    { open, setOpen, setFolio }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, setFolio: React.Dispatch<React.SetStateAction<string | undefined>> }
) {
    const [loadingSubmit, setLoading] = useState(false);
    const { values, errors, handleChange, setFieldValue } = useFormikCreateConstancy();
    const { courses, loading } = useGetCourse();
    const [editManualCourse, setEditManualCourse] = useState<boolean>(false);
    const [step, setStep] = useState(0);
    const cancelButtonRef = useRef(null);
    const handleEditCourseManual = () => setEditManualCourse(!editManualCourse)
    const onSubmit = () => {
        setLoading(true)
        const id = toast.loading("Validando información...");
        if (values.file) {
            const payload = createFormData(values);
            createConstancies(payload)
                .then(r => {
                    if (r.status === 201) {
                        toast.update(id, { render: "Archivo generado con éxito", type: "success", isLoading: false, autoClose: 1500 });
                        setOpen(!open);
                        setFolio(r.data.title);
                        // handleSubmit(r.data.folio)
                    }
                })
                .catch(() => toast.update(id, { render: "Ocurrió un error", type: "error", isLoading: false, autoClose: 1500 }))
                .finally(() => setLoading(false))
        }
    }

    return (
        // @ts-expect-error
        <DialogContainer open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-center">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 sm:mx-0 sm:h-10 sm:w-10">
                            <PlusIcon className="h-6 w-6 text-violet-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                Crear constancias
                            </Dialog.Title>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <Steps step={step} />
                    <div className="sm:flex sm:items-center sm:flex-col">
                        {step === 0 ? (
                            <>
                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Nombre de la Institución
                                    </label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="name_institution"
                                            id="name_institution"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="John Doe"
                                            onChange={handleChange}
                                            value={values.name_institution}
                                        />
                                    </div>
                                    <div className="text-xs text-red-500 ml-1 font-semibold mt-1">{errors.name_institution}</div>
                                </div>
                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Nombre del Representante
                                    </label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="name_representative"
                                            id="name_representative"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="example@gmail.com"
                                            onChange={handleChange}
                                            value={values.name_representative}
                                        />
                                    </div>
                                    <div className="text-xs text-red-500 ml-1 font-semibold mt-1">{errors.name_representative}</div>
                                </div>
                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        RFC de la institución
                                    </label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="rfc_institution"
                                            id="rfc_institution"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="example@gmail.com"
                                            onChange={handleChange}
                                            value={values.rfc_institution}
                                        />
                                    </div>
                                    <div className="text-xs text-red-500 ml-1 font-semibold mt-1">{errors.rfc_institution}</div>
                                </div>
                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Agente Capacitador
                                    </label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="agente"
                                            id="agente"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Agente capacitador"
                                            onChange={handleChange}
                                            value={values.agente}
                                        />
                                    </div>
                                    <div className="text-xs text-red-500 ml-1 font-semibold mt-1">{errors.agente}</div>
                                </div>
                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        CURP del agente capacitador
                                    </label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="curp_agente"
                                            id="curp_agente"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="example@gmail.com"
                                            onChange={handleChange}
                                            value={values.curp_agente}
                                        />
                                    </div>
                                    <div className="text-xs text-red-500 ml-1 font-semibold mt-1">{errors.curp_agente}</div>
                                </div>
                            </>
                        ) : step === 1 ? (
                            <>
                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Curso
                                    </label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        {
                                            !editManualCourse ?
                                                (
                                                    <select
                                                        id="course"
                                                        name="course"
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md border-0 py-2 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option defaultChecked>Seleccionar curso</option>
                                                        {!loading && courses.map(c => (
                                                            <option
                                                                key={c.name}
                                                                value={c.name}
                                                            >
                                                                {c.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        name="course"
                                                        id="course"
                                                        className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Curso"
                                                        onChange={handleChange}
                                                        value={values.course}
                                                    />
                                                )
                                        }
                                        <button onClick={handleEditCourseManual} className="border-none bg-transparent underline text-xs font-semibold">
                                            {
                                                !editManualCourse ?
                                                    "Agregar manualmente" : "Listado de curso"
                                            }
                                        </button>
                                    </div>
                                    <div className="text-xs text-red-500 ml-1 font-semibold mt-1">{errors.course}</div>
                                </div>
                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Duración en horas
                                    </label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="duration"
                                            id="duration"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="example@gmail.com"
                                            onChange={handleChange}
                                            value={values.duration}
                                        />
                                    </div>
                                    <div className="text-xs text-red-500 ml-1 font-semibold mt-1">{errors.duration}</div>
                                </div>
                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="area_tematica" className="block text-sm font-medium leading-6 text-gray-900">
                                        Área temática
                                    </label>
                                    <select
                                        id="area_tematica"
                                        name="area_tematica"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-2 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option defaultChecked>Seleccionar área temática</option>
                                        {AREA_TEMATICAS.map(c => (
                                            <option
                                                key={c.id}
                                                value={c.number}
                                            >
                                                {c.number + " - " + c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="catalogo_ocupaciones" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cátalogo de Ocupaciones
                                    </label>
                                    <select
                                        id="catalogo_ocupaciones"
                                        name="catalogo_ocupaciones"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-2 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option defaultChecked>Seleccionar cátalogo de ocupaciones</option>
                                        {CATALOGO_OCUPACIONES.map(c => (
                                            <option
                                                key={c.id}
                                                value={c.number}
                                            >
                                                {c.number + " - " + c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        ) : step === 2 ? (
                            <>

                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Fecha de Inicio
                                    </label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <input
                                            type="date"
                                            name="date_init"
                                            id="date_init"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="example@gmail.com"
                                            onChange={handleChange}
                                            value={values.date_init}
                                        />
                                    </div>
                                    <div className="text-xs text-red-500 ml-1 font-semibold mt-1">{errors.date_init}</div>
                                </div>
                                <div className="mx-4 my-2 w-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Fecha de Finalización
                                    </label>
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <input
                                            type="date"
                                            name="date_finish"
                                            id="date_finish"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="example@gmail.com"
                                            onChange={handleChange}
                                            value={values.date_finish}
                                        />
                                    </div>
                                    <div className="text-xs text-red-500 ml-1 font-semibold mt-1">{errors.date_finish}</div>
                                </div>
                                <div className="mx-4 my-2 w-full">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        htmlFor="file_input"
                                    >
                                        Listado de usuarios
                                    </label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file"
                                        name="file"
                                        // @ts-expect-error
                                        onChange={(e) => setFieldValue("file", e.target.files[0])}
                                        type="file"
                                        accept=".xlsx"
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Solo archivos con extensión .xlsx</p>
                                    <div className="text-xs text-red-500 ml-1 font-semibold mt-1">{errors.file}</div>
                                </div>
                            </>
                        ) : null}
                    </div>
                    <div className="w-1/3 mx-auto flex items-center justify-around mt-2">
                        <button
                            disabled={step === 0}
                            onClick={() => setStep(step - 1)}
                            className="rounded-full bg-violet-900 text-sm font-medium text-white w-8 h-8 disabled:opacity-[.25]"
                        >
                            {"<"}
                        </button>
                        <button
                            disabled={step === 2}
                            onClick={() => setStep(step + 1)}
                            className="rounded-full bg-violet-900 text-sm font-medium text-white w-8 h-8 disabled:opacity-[.25]"
                        >
                            {">"}
                        </button>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto disabled:opacity-[.25]"
                        disabled={!!Object.values(errors).length || loadingSubmit}
                        onClick={() => { onSubmit() }}
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                    >
                        Cancelar
                    </button>
                </div>
            </Dialog.Panel>
        </DialogContainer>
    )
}