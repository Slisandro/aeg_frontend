const useAuth = () => {
    const token = localStorage.getItem("token_aeg");

    const login = (token: string) => localStorage.setItem("token_aeg", token);
    const logout = () => localStorage.removeItem("token_aeg");

    return {
        token,
        login,
        logout
    }
}

export default useAuth;