import instanceAxios from "../../../axios/config-axios";
import { User } from "../hooks/use-formik-create-user";

const headers = {
    "authorization": localStorage.getItem("token_aeg")
}

export const getAllUsers = () => instanceAxios.get("/users/all", { headers });

export const createUser = (values: User) => instanceAxios.post("/users/create", values, { headers });

export const editUser = (id: string, values: Partial<User>) => instanceAxios.put("/users/" + id, values, { headers });

export const deleteUser = (id: string) => instanceAxios.delete("/users/" + id, { headers });
