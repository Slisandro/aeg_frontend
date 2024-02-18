import { useState } from "react";
import NavBar from "../components/nav-component";
import CreateCourse from "../modules/courses/components/create-course-component";
import ListCourse from "../modules/courses/components/list-courses-component";
import { Course } from "../modules/courses/hooks/use-formik-create-course";
import useGetCourses from "../modules/courses/hooks/use-get-courses";
import { deleteCourse } from "../modules/courses/services";

export default function Courses() {
    const [open, setOpen] = useState<boolean>(false);
    const [entity, setEntity] = useState<Course>();
    const [reload, setReload] = useState<boolean>(true);
    const { loading, courses } = useGetCourses(reload);

    const handleClick = () => setOpen(true);

    const handleEdit = (u: Course) => {
        setEntity(u);
        setOpen(true);
    };

    const handleDelete = (id?: string) => {
        if (id) {
            return deleteCourse(id)
                .then(() => setReload(!reload))
                .catch(() => null)
                .finally(() => null)
        }
    }

    const handleClose = () => {
        setEntity(undefined);
        setOpen(false);
        setReload(!reload);
    }

    return (
        <main className="w-full h-full">
            <NavBar />
            {open && <CreateCourse entity={entity} open={open} handleClose={handleClose} />}
            <div className="flex justify-end w-full py-4 px-8">
                <button onClick={handleClick} className="bg-violet-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-violet-800 hover:text-white">+ Crear</button>
            </div>
            <ListCourse handleDelete={handleDelete} setEntity={handleEdit} courses={courses} loading={loading} />
        </main>
    )
}