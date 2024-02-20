import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"

export interface File {
    id: string
    name: string,
    institution: string,
    date: string
}

export default function ListConstancies(
    { handleDownload, files, loading }:
        { handleDownload: (id: string | undefined) => void, files: File[], loading: boolean }
) {
    if (loading) {
        return (
            <div className="flex items-center justify-center">Cargando...</div>
        )
    }

    if (!files.length) {
        return (
            <div className="flex items-center justify-center">No hay constancias</div>
        )
    }

    return (
        <ul role="list" className="divide-y divide-gray-100 px-8">
            {files.map((file) => (
                <li key={file.id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto w-1/2 max-w-3/4">
                            <p className="text-sm w-full font-semibold uppercase leading-6 text-gray-900">{file.name}</p>
                            <p className="mt-1 truncate text-xs uppercase leading-5 text-gray-500">{file.institution}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Fecha {file.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-1/4 justify-end">
                        <button onClick={() => handleDownload(file.id)} className="rounded-full bg-violet-500 p-2 hover:bg-violet-400">
                            <ArrowDownTrayIcon className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}
