import { Dialog } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import DialogContainer from "../components/dialog-component";
import NavBar from "../components/nav-component";
import CreateConstancy from "../modules/constancies/components/create-constancies-component";
import { downloadFile } from "../modules/constancies/services";

export default function Constancies() {
    const [open, setOpen] = useState<boolean>(false);
    const [folio, setFolio] = useState<string | undefined>();
    const cancelButtonRef = useRef(null);

    const handleClick = () => setOpen(true);

    const handleSubmit = () => {
        if(folio) {
            const url = downloadFile(folio);
            window.open(url, '_blank');
            setFolio(undefined);
        }
    };

    return (
        <main className="w-full h-full">
            <NavBar />
            {folio && (
                // @ts-expect-error
                <DialogContainer open={!!folio} setOpen={setOpen} cancelButtonRef={cancelButtonRef}>
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-center">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <CheckIcon className="h-6 w-6 text-violet-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Archivo creado con éxito
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            El archivo de constancias para el folio N° {folio} fue generado exitosamente. Puede descargar su archivo haciendo click en el botón de abajo
                                        </p>
                                    </div>
                                </div>
                                <hr className="mt-4" />
                            </div>
                            <div className="sm:flex sm:items-center sm:flex-col">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto disabled:opacity-[.25]"
                                    onClick={handleSubmit}
                                >
                                    Descargar
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </DialogContainer>
            )}
            {open && <CreateConstancy open={open} setFolio={setFolio} setOpen={setOpen} />}
            <div className="flex justify-end w-full py-4 px-8">
                <button onClick={handleClick} className="bg-violet-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-violet-800 hover:text-white">+ Crear</button>
            </div>
            {/* <ListUser /> */}
        </main>
    )
}