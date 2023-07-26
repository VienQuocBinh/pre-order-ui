import accountApi from "../api/accountApi";

const useAccount = () => {
  const getAllAccounts = async (accessToken) => {
    return await accountApi.getAllAccounts(accessToken);
  };
  const getAccountById = async (id, accessToken) => {
    return await accountApi.getById(id, accessToken);
  };
  return {
    getAllAccounts,
    getAccountById,
  };
};

export default useAccount;
