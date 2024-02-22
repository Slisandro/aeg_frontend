import instanceAxios from "../../../axios/config-axios";

export const searchConstanciesService = (type: "CURP" | "FOLIO", value: string) =>
    instanceAxios.post("constancies/search/", { type, value: value.toUpperCase() });
