import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Course } from "../hooks/use-formik-create-course";

export default function ListCourse(
    { handleDelete, setEntity, courses, loading }:
        { handleDelete: (id: string | undefined) => void, setEntity: (u: Course) => void; courses: Course[], loading: boolean }
) {

    const handleEdit = (u: Course) => setEntity(u);

    if (loading) {
        return (
            <div className="flex items-center justify-center">Cargando...</div>
        )
    }

    if (!courses.length) {
        return (
            <div className="flex items-center justify-center">No hay cursos</div>
        )
    }

    return (
        <ul role="list" className="divide-y divide-gray-100 px-8">
            {courses.map((course) => (
                <li key={course.name} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto w-1/2 max-w-3/4">
                            <p className="text-sm w-full font-semibold leading-6 text-gray-900">{course.name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Duración {course.duration}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 w-1/4">
                        <button onClick={() => handleEdit(course)} className="rounded-full bg-violet-500 p-2 hover:bg-violet-400">
                            <PencilIcon className="w-4 h-4 text-white" />
                        </button>
                        <button onClick={() => handleDelete(course?._id)} className="rounded-full bg-red-500 p-2 hover:bg-red-400">
                            <TrashIcon className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}
