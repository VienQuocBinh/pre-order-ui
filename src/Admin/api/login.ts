import api from "./api";
import { User } from "../types/user";
import { PostResponse } from "../types/response";
import { Auth } from "../types/auth";

const authorize = (formEmail: string, formPassword: string) => {
    const auth = {
      email: formEmail,
      password: formPassword
    };
    return api.post(`/account/casualLogin`, auth);
  };
  
  const getUserInfo = (accessToken: string) => {
    const config = {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    };
    return api.get<User>("/account/authorization", config).then((res) => res.data);
  };
  
  const updateUserInfo = (accessToken: string, userInfo: User) => {
    const config = {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    };
    return api.put<PostResponse<Auth>>(`/api/users/user/me`, userInfo, config);
  };
  
  const loginApi = {
    authorize,
    getUserInfo,
    updateUserInfo,
  };
  
  export default loginApi;