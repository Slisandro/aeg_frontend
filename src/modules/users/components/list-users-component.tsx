import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { User } from "../hooks/use-formik-create-user";

export default function ListUser(
    { handleDelete, setEntity, users, loading }:
        { handleDelete: (id: string | undefined) => void, setEntity: (u: User) => void; users: User[], loading: boolean }
) {

    const handleEdit = (u: User) => setEntity(u);

    if (loading) {
        return (
            <div>Loading</div>
        )
    }

    if (!users.length) {
        return (
            <div>No hay usuarios</div>
        )
    }

    return (
        <ul role="list" className="divide-y divide-gray-100 px-8">
            {users.map((person) => (
                <li key={person.username} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.username}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Rol {person.role}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start">
                        <p className="text-xs leading-6 text-gray-900">Creado</p>
                        <p className="truncate text-xs leading-5 text-gray-500">
                            <time dateTime={new Date().toDateString()}>
                                {new Date().toDateString()}
                            </time>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(person)} className="rounded-full bg-violet-500 p-2 hover:bg-violet-400">
                            <PencilIcon className="w-4 h-4 text-white" />
                        </button>
                        {person.role === "User" && (
                            <button onClick={() => handleDelete(person?._id)} className="rounded-full bg-red-500 p-2 hover:bg-red-400">
                                <TrashIcon className="w-4 h-4 text-white" />
                            </button>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}
