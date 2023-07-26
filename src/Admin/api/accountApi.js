import api from "./api";

const getAllAccounts = (accessToken) =>
  api
    .get("/admin-account-mananger/getAllUsers?pageSize=999", {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getById = (id, accessToken) =>
  api
    .get(`/admin-account-mananger/getUserById?accountId=${id}`, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const accountApi = {
  getAllAccounts,
  getById,
};
export default accountApi;
