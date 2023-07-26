import api from "./api";

const getAllOrders = (accessToken) =>
  api
    .get("/order/getAll", {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getById = (id, accessToken) =>
  api
    .get(`/order/GetById?orderId=${id}`, {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const getByUserId = (accessToken) =>
  api
    .get("/order/getByUserId", {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

const orderApi = {
  getAllOrders,
  getByUserId,
  getById,
};

export default orderApi;
