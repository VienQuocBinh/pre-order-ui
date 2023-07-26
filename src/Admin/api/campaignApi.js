import api from "./api";

const getAllCampaigns = (accessToken) =>
  api
    .get("/campaign/getAll?PageSize=999", {
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

const campaignApi = {
  getAllCampaigns,
  getById,
};
export default campaignApi;
