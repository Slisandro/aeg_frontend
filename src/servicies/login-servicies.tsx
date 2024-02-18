import instanceAxios from "../axios/config-axios";
import { Login } from "../hooks/use-formik-login";

const loginService = (values: Login) => instanceAxios.post("/auth/login", values);

export default loginService;