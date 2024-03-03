import React, { useState } from "react"
import { searchConstanciesService } from "../services";

export default function SearchBarComponent({ setResults, setLoading }: { setResults: React.Dispatch<React.SetStateAction<any[]|undefined>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, }) {
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<"CURP" | "FOLIO" | undefined>(undefined);
    const [string, setString] = useState<string>("");
    const handleOpen = () => setOpen(!open);
    const handleType = (s: "CURP" | "FOLIO" | undefined) => {
        setType(s);
        setOpen(!open);
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (type) {
            setLoading(true);
            searchConstanciesService(type, string)
                .then(r => setResults(r.data))
                .catch(() => setResults([]))
                .finally(() => setLoading(false))
        }
    }

    return (
        <div className="relative w-full mx-auto">
            <form className="mx-auto" onSubmit={handleSubmit}>
                <div className="flex w-full">
                    <button
                        id="dropdown-button"
                        data-dropdown-toggle="dropdown"
                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        type="button"
                        onClick={handleOpen}
                    >
                        {type ? type : "Buscar por"}
                        <svg
                            className="w-2.5 h-2.5 ms-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    {open ? (
                        <div id="dropdown" className="absolute top-full z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                <li>
                                    <button
                                        type="button"
                                        onClick={() => handleType("CURP")}
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        CURP
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={() => handleType("FOLIO")}
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        FOLIO
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">CURP</button>
                                </li>
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Folio</button>
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border-gray-50 border-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 outline-none"
                            placeholder="Ingresé su CURP o número de folio"
                            required
                            onChange={(e: any) => setString(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={!string || !type}
                            className="disable:opacity-.25 absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-violet-700 rounded-e-lg border border-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}