export default function ListConstancies({ constancies, loading }: { constancies: any[] | undefined, loading: boolean }) {
    if (loading) {
        return (
            <div className="flex items-center justify-center mt-4">Cargando...</div>
        )
    }

    if (!constancies) {
        return (
            <div className="flex items-center justify-center text-center mt-4 flex-col gap-0 mt-4">
                <p className="p-0">Seleccioné como desea realizar la búsqueda</p>
                <br />
                <p className="p-0"><b>Por CURP:</b> Introduzca su Clave Única de Registro de Población</p>
                <br />
                <p className="p-0"><b>Por número de folio:</b> Ingrese el número de folio de su documento</p>
                <br />
                <p className="p-0">Presioné buscar y obtenga sus resultados al instante.</p>
            </div>
        )
    }

    if (!constancies.length) {
        return (
            <div className="flex items-center justify-center mt-4">No hay constancias</div>
        )
    }

    return (
        <ul role="list" className="divide-y divide-gray-100 mt-4">
            {constancies.map((constancy) => (
                <li key={constancy.id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto w-1/2 max-w-3/4">
                            <p className="text-sm w-full font-semibold uppercase leading-6 text-gray-900">Nombre: {Array.isArray(constancy.name) ? constancy.name[0] : constancy.name}</p>
                            <p className="mt-1 truncate text-xs uppercase leading-5 text-gray-500"> CURP: {Array.isArray(constancy.curp) ? constancy.curp[0] : constancy.curp}</p>
                            <p className="mt-1 truncate text-xs uppercase leading-5 text-gray-500"> Nro. Folio: {Array.isArray(constancy.invoice) ? constancy.invoice[0] : constancy.invoice}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-1/4 justify-end">
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Curso: {Array.isArray(constancy.course) ? constancy.course[0] : constancy.course}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Institucion: {Array.isArray(constancy.institution) ? constancy.institution[0] : constancy.institution}</p>

                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Duración: {Array.isArray(constancy.duration) ? constancy.duration[0] : constancy.duration} hrs.</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}
