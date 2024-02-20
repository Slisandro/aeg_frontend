import instanceAxios from "../../../axios/config-axios";

export const createConstancies = (values: FormData) => instanceAxios.post(
    "/constancies/create",
    values,
    {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }
);

export const getAllFiles = () => instanceAxios.get("/constancies/all")

export const downloadFile = (id: string) =>
    (import.meta.env.REACT_APP_API_URL ?? "http://localhost:3000") + "/constancies/download/" + id;