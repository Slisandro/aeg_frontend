import { useEffect, useState } from "react"
import { getAllFiles } from "../services";
import { File } from "../components/list-courses-component";

const useGetConstancies = (reload?: boolean) => {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(true);

    const getCourses = () => getAllFiles()
        .then(r => setFiles(r.data.files))
        .catch(() => setFiles([]))
        .finally(() => setLoading(false))


    useEffect(() => {
        getCourses()
    }, [])

    useEffect(() => {
        getCourses()
    }, [reload])

    return {
        loading,
        files
    }
};

export default useGetConstancies;