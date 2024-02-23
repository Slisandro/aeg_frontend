import useFormikLogin from "../hooks/use-formik-login";

export default function Login() {
    const { values, errors, handleChange, handleSubmit } = useFormikLogin();
    
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold text-neutral-900">
                Acceso a Clientes Institucionales
            </h2>
            <form
                className="flex flex-col"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2 my-3">
                    <label
                        htmlFor="username"
                        className="font-medium text-neutral-800"
                    >
                        Usuario
                    </label>
                    <input
                        className="border-2 border-solid border-violet-400 rounded-lg py-2 pl-4 pr-12 outline-none shadow-md"
                        type="text"
                        name="username"
                        id="username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    <div className="">{errors.username}</div>
                </div>
                <div className="flex flex-col gap-2 my-3">
                    <label
                        htmlFor="password"
                        className="font-medium text-neutral-800"
                    >
                        Contraseña
                    </label>
                    <input
                        className="border-2 border-solid border-violet-400 rounded-lg py-2 pl-4 pr-12 outline-none shadow-md"
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <div className="">{errors.username}</div>
                </div>
                <button
                    className="border-2 border-solid border-violet-400 w-[max-content] mx-auto px-4 py-1 my-3 rounded-lg shadow-md bg-violet-400 text-white font-semibold"
                    type="submit"
                >
                    Ingresar
                </button>
            </form>
        </div>
    )
}