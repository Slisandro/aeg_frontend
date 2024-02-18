import instanceAxios from "../../../axios/config-axios";
import { Course } from "../hooks/use-formik-create-course";

const headers = {
    "authorization": localStorage.getItem("token_aeg")
}

export const getAllCourses = () => instanceAxios.get("/courses/all", { headers });
export const createCourse = (values: Course) => instanceAxios.post("/courses/create", values, { headers });
export const editCourse = (id: string, values: Partial<Course>) => instanceAxios.put("/courses/" + id, values, { headers });
export const deleteCourse = (id: string) => instanceAxios.delete("/courses/" + id, { headers });
