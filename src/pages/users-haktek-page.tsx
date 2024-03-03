import { useState } from "react";
import NavBar from "../components/nav-component";
import CreateUser from "../modules/users/components/create-user-component";
import ListUser from "../modules/users/components/list-users-component";
import { User } from "../modules/users/hooks/use-formik-create-user";
import useGetUsers from "../modules/users/hooks/use-get-users";
import { deleteUser } from "../modules/users/services";

export default function Users() {
    const [open, setOpen] = useState<boolean>(false);
    const [entity, setEntity] = useState<User>();
    const [reload, setReload] = useState<boolean>(true);
    const { loading, users } = useGetUsers(reload);

    const handleClick = () => setOpen(true);

    const handleEdit = (u: User) => {
        setEntity(u);
        setOpen(true);
    };

    const handleDelete = (id?: string) => {
        if (id) {
            return deleteUser(id)
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
            {open && <CreateUser entity={entity} open={open} handleClose={handleClose} />}
            <div className="flex justify-end w-full py-4 px-8">
                <button onClick={handleClick} className="bg-violet-900 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-violet-800 hover:text-white">+ Crear</button>
            </div>
            <ListUser handleDelete={handleDelete} setEntity={handleEdit} users={users} loading={loading} />
        </main>
    )
}