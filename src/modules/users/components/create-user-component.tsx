import { Dialog } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import DialogContainer from "../../../components/dialog-component";
import useFormikCreateUser, { User } from "../hooks/use-formik-create-user";

export default function CreateUser(
    { open, handleClose, entity }: { open: boolean, handleClose: () => void, entity: User | undefined }
) {
    const { values, errors, handleChange, handleSubmit } = useFormikCreateUser(entity);
    const [showPassword, setShowPassword] = useState(false);
    const cancelButtonRef = useRef(null);
    const handleChangePassword = () => setShowPassword(!showPassword);
    const handleSubmitForm = () => {
        handleSubmit();
        setTimeout(() => {
            handleClose();
        }, 1500);
    }

    return (
        <DialogContainer open={open} setOpen={handleClose} cancelButtonRef={cancelButtonRef}>
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-center">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 sm:mx-0 sm:h-10 sm:w-10">
                            <PlusIcon className="h-6 w-6 text-violet-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                {entity ? "Editar usuario" : "Crear usuario"}
                            </Dialog.Title>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="sm:flex sm:items-center sm:flex-col">
                        <div className="mx-4 my-2 w-full">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Usuario
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="John Doe"
                                    onChange={handleChange}
                                    value={values.username}
                                />
                            </div>
                            <div className="">{errors.username}</div>
                        </div>
                        <div className="mx-4 my-2 w-full">
                            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                Rol
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    type="string"
                                    name="role"
                                    id="role"
                                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Admin o User"
                                    readOnly={true}
                                    defaultValue={values.role}
                                />
                            </div>
                            <div className="">{errors.role}</div>
                        </div>
                        {!entity && (
                            <div className="mx-4 my-2 w-full">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="********"
                                            onChange={handleChange}
                                            value={values.password}
                                        />
                                        <button onClick={handleChangePassword} className="bg-transparent border-none absolute top-2 right-6">
                                            {
                                                showPassword ?
                                                    <EyeSlashIcon className="h-5 w-5 text-violet-600" /> :
                                                    <EyeIcon className="h-5 w-5 text-violet-600" />
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className="">{errors.password}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto"
                        onClick={handleSubmitForm}
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => handleClose()}
                        ref={cancelButtonRef}
                    >
                        Cancelar
                    </button>
                </div>
            </Dialog.Panel>
        </DialogContainer>
    )
}