import { useEffect, useState } from "react"
import { getAllCourses } from "../services";
import { Course } from "./use-formik-create-course";

const useGetCourse = (reload?: boolean) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    const getCourses = () => getAllCourses()
        .then(r => setCourses(r.data))
        .catch(() => setCourses([]))
        .finally(() => setLoading(false))


    useEffect(() => {
        getCourses()
    }, [])

    useEffect(() => {
        getCourses()
    }, [reload])

    return {
        loading,
        courses
    }
};

export default useGetCourse;