import loginApi from "../../api/login";

const useLogin = () => {
  const login = async (email: string, password:string) => {
    const res = await loginApi.authorize(email, password);
    return res;
  };

  return {
    login,
  };
};
export default useLogin;