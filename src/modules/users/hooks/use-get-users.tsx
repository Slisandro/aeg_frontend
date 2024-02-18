import { useEffect, useState } from "react"
import { getAllUsers } from "../services";
import { User } from "./use-formik-create-user";

const useGetUsers = (reload: boolean) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const getUsers = () => getAllUsers()
        .then(r => setUsers(r.data))
        .catch(() => setUsers([]))
        .finally(() => setLoading(false))


    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        getUsers()
    }, [reload])

    return {
        loading,
        users
    }
};

export default useGetUsers;